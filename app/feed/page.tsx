'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import TopicCard from '@/components/TopicCard'
import { topics } from '@/data/topics'
import { getHotTopics, getUserActivity, HotTopic, UserActivity } from '@/lib/feedQueries'

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'ahora mismo'
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`
  return `hace ${Math.floor(seconds / 86400)}d`
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text
}

function SkeletonBlock({ height = 80 }: { height?: number }) {
  return (
    <div
      style={{
        height: `${height}px`,
        width: '100%',
        borderRadius: '12px',
        backgroundColor: 'var(--border)',
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
      }}
    />
  )
}

const feedStyles = `
.feed-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 640px) {
  .feed-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (min-width: 1024px) {
  .feed-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
}
`

export default function FeedPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [hotTopics, setHotTopics] = useState<HotTopic[] | null>(null)
  const [userActivity, setUserActivity] = useState<UserActivity[] | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  // Redirect to home if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [authLoading, user, router])

  // Load feed data when user is confirmed
  useEffect(() => {
    if (!user) return
    setDataLoading(true)
    Promise.all([getHotTopics(), getUserActivity(user.uid)]).then(([hot, activity]) => {
      setHotTopics(hot)
      setUserActivity(activity)
      setDataLoading(false)
    })
  }, [user?.uid])

  // Show skeleton while auth resolves or redirecting
  if (authLoading || !user) {
    return (
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px' }}>
        <SkeletonBlock height={32} />
        <div style={{ marginTop: '8px', marginBottom: '40px' }}><SkeletonBlock height={20} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </div>
      </main>
    )
  }

  const firstName = user.displayName?.split(' ')[0] ?? 'ahí'

  return (
    <>
      <style>{feedStyles}</style>
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px 80px' }}>

        {/* Feed header — no hero, this is an app */}
        <header style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 800,
              color: 'var(--dark)',
              margin: '0 0 4px 0',
            }}
          >
            Hola, {firstName}.
          </h1>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', color: 'var(--text-mid)', margin: 0 }}>
            ¿Qué aprendemos hoy?
          </p>
        </header>

        {/* ── Section 1: En conversación ahora ── */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 14px 0',
            }}
          >
            En conversación ahora
          </h2>

          {dataLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <SkeletonBlock height={72} />
              <SkeletonBlock height={72} />
              <SkeletonBlock height={72} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(hotTopics ?? []).map((ht) => (
                <div
                  key={ht.topicId}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderTop: '1px solid var(--border)',
                    borderRight: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                    borderLeft: '3px solid #4F46E5',
                    borderRadius: '0 12px 12px 0',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--dark)',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {ht.title}
                    </p>
                    {ht.lastComment ? (
                      <p
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '13px',
                          color: 'var(--text-mid)',
                          margin: 0,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        <strong style={{ fontWeight: 600 }}>{ht.lastComment.userName.split(' ')[0]}</strong>:{' '}
                        {truncate(ht.lastComment.text, 80)} · {timeAgo(ht.lastComment.createdAt)}
                      </p>
                    ) : (
                      <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>
                        Sé el primero en comentar
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/topic/${ht.topicId}`}
                    style={{
                      flexShrink: 0,
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: '13px',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                    }}
                  >
                    Ver conversación
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Section 2: Todos los temas ── */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 14px 0',
            }}
          >
            Todos los temas
          </h2>
          <div className="feed-grid">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </section>

        {/* ── Section 3: Tu actividad ── */}
        <section>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 14px 0',
            }}
          >
            Tu actividad
          </h2>

          {dataLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <SkeletonBlock height={56} />
              <SkeletonBlock height={56} />
              <SkeletonBlock height={56} />
            </div>
          ) : userActivity && userActivity.length > 0 ? (
            <div>
              {userActivity.map((activity, i) => (
                <div
                  key={activity.topicId + i}
                  style={{
                    padding: '14px 0',
                    borderBottom: i < userActivity.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <Link
                      href={`/topic/${activity.topicId}`}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        textDecoration: 'none',
                      }}
                    >
                      {activity.topicTitle}
                    </Link>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {timeAgo(activity.createdAt)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '13px',
                      color: 'var(--text-mid)',
                      margin: 0,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {activity.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '15px',
                color: 'var(--text-mid)',
                lineHeight: 1.7,
              }}
            >
              Aún no has comentado.{' '}
              <Link
                href={`/topic/${topics[0].id}`}
                style={{ color: 'var(--primary)', fontWeight: 600 }}
              >
                El primer comentario es el más difícil.
              </Link>
            </p>
          )}
        </section>
      </main>
    </>
  )
}
