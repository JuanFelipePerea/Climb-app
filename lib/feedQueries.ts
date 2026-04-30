import {
  collection,
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firestore'
import { topics } from '@/data/topics'

export interface HotTopic {
  topicId: string
  title: string
  lastComment: { text: string; userName: string; createdAt: Date } | null
}

export interface UserActivity {
  topicId: string
  topicTitle: string
  text: string
  createdAt: Date
}

export async function getHotTopics(): Promise<HotTopic[]> {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const q = query(
      collectionGroup(db, 'entries'),
      where('createdAt', '>=', Timestamp.fromDate(cutoff)),
      orderBy('createdAt', 'desc'),
      limit(50)
    )
    const snapshot = await getDocs(q)

    const counts: Record<string, number> = {}
    const lastComments: Record<string, { text: string; userName: string; createdAt: Date }> = {}

    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      const topicId = data.topicId as string
      if (!topicId) return
      counts[topicId] = (counts[topicId] ?? 0) + 1
      if (!lastComments[topicId]) {
        lastComments[topicId] = {
          text: data.text,
          userName: data.userName,
          createdAt: (data.createdAt as Timestamp).toDate(),
        }
      }
    })

    const ranked = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topicId]) => topicId)

    // Fill up to 3 with fallback topics if not enough recent activity
    const result = [...ranked]
    for (const t of topics) {
      if (result.length >= 3) break
      if (!result.includes(t.id)) result.push(t.id)
    }

    return result.slice(0, 3).map((topicId) => {
      const topic = topics.find((t) => t.id === topicId)
      return {
        topicId,
        title: topic?.title ?? topicId,
        lastComment: lastComments[topicId] ?? null,
      }
    })
  } catch {
    return topics.slice(0, 3).map((t) => ({
      topicId: t.id,
      title: t.title,
      lastComment: null,
    }))
  }
}

export async function getUserActivity(userId: string): Promise<UserActivity[]> {
  try {
    const q = query(
      collectionGroup(db, 'entries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(3)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      const topicId = data.topicId as string
      const topic = topics.find((t) => t.id === topicId)
      return {
        topicId,
        topicTitle: topic?.title ?? topicId,
        text: data.text as string,
        createdAt: (data.createdAt as Timestamp).toDate(),
      }
    })
  } catch {
    return []
  }
}

// Fetch collection directly (no collectionGroup index needed) for a single topic's latest comment
export async function getLatestComment(
  topicId: string
): Promise<{ text: string; userName: string; createdAt: Date } | null> {
  try {
    const entriesRef = collection(db, 'comments', topicId, 'entries')
    const q = query(entriesRef, orderBy('createdAt', 'desc'), limit(1))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    const data = snapshot.docs[0].data()
    return {
      text: data.text,
      userName: data.userName,
      createdAt: (data.createdAt as Timestamp).toDate(),
    }
  } catch {
    return null
  }
}
