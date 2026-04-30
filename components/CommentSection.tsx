'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { subscribeToComments, addComment } from '@/lib/firestore'
import { signInWithGoogle } from '@/lib/auth'
import { Comment } from '@/types'

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'ahora mismo'
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`
  return `hace ${Math.floor(seconds / 86400)}d`
}

function Avatar({ name, photoURL, size = 36 }: { name: string; photoURL?: string | null; size?: number }) {
  const colors = ['#4F46E5', '#0EA5E9', '#10B981', '#F97316', '#EC4899']
  const color = colors[name.charCodeAt(0) % colors.length]
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

  if (photoURL) {
    return (
      <Image
        src={photoURL}
        alt={name}
        width={size}
        height={size}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          alignSelf: 'flex-start',
          marginTop: '4px',
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: `${color}20`,
        border: `1.5px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${Math.round(size * 0.35)}px`,
        fontWeight: 700,
        color,
        flexShrink: 0,
        alignSelf: 'flex-start',
        marginTop: '4px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {initials}
    </div>
  )
}

function SkeletonComment() {
  return (
    <div style={{ display: 'flex', gap: '14px', padding: '20px 0' }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: 'var(--border)', flexShrink: 0, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ width: '120px', height: '12px', borderRadius: '6px', backgroundColor: 'var(--border)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: '100%', height: '12px', borderRadius: '6px', backgroundColor: 'var(--border)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: '70%', height: '12px', borderRadius: '6px', backgroundColor: 'var(--border)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
      </div>
    </div>
  )
}

interface CommentSectionProps {
  topicId: string
}

export default function CommentSection({ topicId }: CommentSectionProps) {
  const { user, loading: authLoading } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const unsubscribe = subscribeToComments(topicId, (incoming) => {
      setComments(incoming)
      setLoadingComments(false)
    })
    return unsubscribe
  }, [topicId])

  async function handleSubmit() {
    if (!user || !text.trim()) return
    setSending(true)
    setSendError(false)
    try {
      await addComment(topicId, user, text.trim())
      setText('')
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
  }

  return (
    <section>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '20px',
          fontWeight: 800,
          color: 'var(--dark)',
          margin: '0 0 20px 0',
        }}
      >
        Conversación{' '}
        <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-light)' }}>
          {loadingComments ? '' : `${comments.length} respuestas`}
        </span>
      </h2>

      {/* Compose area */}
      {authLoading ? (
        <div
          style={{
            height: '100px',
            borderRadius: '14px',
            backgroundColor: 'var(--border)',
            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
            marginBottom: '32px',
          }}
        />
      ) : user ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid var(--border)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '32px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <Avatar name={user.displayName ?? user.email ?? 'U'} photoURL={user.photoURL} />
          <div style={{ flex: 1 }}>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Comparte tu experiencia con este tema..."
              style={{
                width: '100%',
                height: '90px',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                outline: 'none',
                resize: 'none',
                fontSize: '14px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'var(--text)',
                backgroundColor: 'transparent',
                lineHeight: 1.6,
                padding: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 150ms',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#4F46E5' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB' }}
            />
            {sendError && (
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#EF4444', margin: '4px 0 0 2px' }}>
                No se pudo enviar. Intenta de nuevo.
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={handleSubmit}
                disabled={sending || !text.trim()}
                style={{
                  backgroundColor: sending || !text.trim() ? 'rgba(79,70,229,0.5)' : 'var(--primary)',
                  color: '#FFFFFF',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: '10px',
                  padding: '8px 20px',
                  border: 'none',
                  cursor: sending || !text.trim() ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                  transition: 'transform 120ms ease',
                }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {sending ? 'Enviando...' : 'Comentar'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'rgba(79,70,229,0.04)',
            border: '1.5px dashed rgba(79,70,229,0.25)',
            borderRadius: '16px',
            padding: '28px 24px',
            marginBottom: '32px',
          }}
        >
          <textarea
            disabled
            placeholder="Inicia sesión para unirte a la conversación"
            style={{
              width: '100%',
              height: '90px',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              outline: 'none',
              resize: 'none',
              fontSize: '14px',
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#9CA3AF',
              backgroundColor: '#F9FAFB',
              lineHeight: 1.6,
              padding: '14px',
              boxSizing: 'border-box',
              cursor: 'not-allowed',
              display: 'block',
              marginBottom: '16px',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                color: 'var(--text-mid)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              Inicia sesión y únete a la conversación. Tus dudas también ayudan a otros estudiantes.
            </p>
            <button
              onClick={signInWithGoogle}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #F97316, #EA6C0A)',
                color: '#FFFFFF',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '12px',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.35)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="white" fillOpacity="0.9" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="white" fillOpacity="0.9" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="white" fillOpacity="0.9" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="white" fillOpacity="0.9" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar con Google para comentar
            </button>
          </div>
        </div>
      )}

      {/* Comments list */}
      {loadingComments ? (
        <div>
          <SkeletonComment />
          <SkeletonComment />
        </div>
      ) : comments.length === 0 ? (
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            color: 'var(--text-light)',
            textAlign: 'center',
            padding: '32px 0',
            lineHeight: 1.6,
          }}
        >
          Sé el primero en comentar este tema. Tu pregunta puede ayudar a otros.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {comments.map((comment, i) => (
            <div
              key={comment.id}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '20px 0',
                borderBottom: i < comments.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <Avatar name={comment.userName} photoURL={comment.userPhoto} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--dark)',
                    }}
                  >
                    {comment.userName}
                  </span>
                  <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'var(--text-light)' }}>
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'var(--text-mid)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
