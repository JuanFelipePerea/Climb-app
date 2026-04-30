import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { app } from '@/lib/firebase'
import { Comment } from '@/types'

export const db = getFirestore(app)

export function subscribeToComments(
  topicId: string,
  callback: (comments: Comment[]) => void
): () => void {
  const entriesRef = collection(db, 'comments', topicId, 'entries')
  const q = query(entriesRef, orderBy('createdAt', 'desc'), limit(20))

  return onSnapshot(q, (snapshot) => {
    const comments: Comment[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        userPhoto: data.userPhoto ?? null,
        text: data.text,
        createdAt: (data.createdAt as Timestamp).toDate(),
        topicId: data.topicId,
      }
    })
    callback(comments)
  })
}

export async function addComment(
  topicId: string,
  user: User,
  text: string
): Promise<void> {
  const entriesRef = collection(db, 'comments', topicId, 'entries')
  await addDoc(entriesRef, {
    userId: user.uid,
    userName: user.displayName ?? user.email ?? 'Anónimo',
    userPhoto: user.photoURL ?? null,
    text,
    createdAt: Timestamp.now(),
    topicId,
  })
}
