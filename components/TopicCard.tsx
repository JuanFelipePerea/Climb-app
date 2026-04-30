'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Topic } from '@/types'

interface TopicCardProps {
  topic: Topic
}

const difficultyLabel: Record<Topic['difficulty'], string> = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
}

const difficultyColor: Record<Topic['difficulty'], { text: string; bg: string }> = {
  beginner:     { text: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  intermediate: { text: '#F97316', bg: 'rgba(249,115,22,0.1)' },
  advanced:     { text: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
}

function commentCopy(n: number): string {
  if (n > 30) return `💬 ${n} estudiantes comentaron`
  if (n > 10) return `💬 ${n} en conversación`
  if (n > 0)  return `💬 ${n} comentarios · ¿Y tú?`
  return '💬 Sé el primero en comentar'
}

const pulseKeyframes = `
@keyframes climb-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
}
`

export default function TopicCard({ topic }: TopicCardProps) {
  const router = useRouter()
  const diff = difficultyColor[topic.difficulty]
  const isActive = topic.commentCount > 20
  const [hovered, setHovered] = useState(false)

  const firstComment = topic.examples[0] ?? null

  return (
    <>
      <style>{pulseKeyframes}</style>
      <article
        role="button"
        tabIndex={0}
        aria-label={`Abrir tema: ${topic.title}`}
        onClick={() => router.push(`/topic/${topic.id}`)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(`/topic/${topic.id}`) }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = '0 12px 32px rgba(79,70,229,0.12)'
          el.style.borderColor = 'rgba(79,70,229,0.3)'
          setHovered(true)
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          el.style.borderColor = 'var(--border)'
          setHovered(false)
        }}
        onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.25)' }}
        onBlur={(e) => { e.currentTarget.style.boxShadow = 'none' }}
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '0',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
          outline: 'none',
          position: 'relative',
        }}
      >
        {/* Card header with emoji and progress */}
        <div
          style={{
            padding: '20px 20px 0',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Emoji icon — with optional active indicator */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '13px',
                backgroundColor: 'rgba(79,70,229,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              {topic.emoji}
            </div>

            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '-4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  borderRadius: '999px',
                  padding: '2px 6px 2px 4px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    flexShrink: 0,
                    animation: 'climb-pulse 2s infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    color: '#10B981',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Activo hoy
                </span>
              </div>
            )}
          </div>

          {/* Difficulty badge */}
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: diff.text,
              backgroundColor: diff.bg,
              borderRadius: '999px',
              padding: '4px 10px',
              fontFamily: 'Inter, system-ui, sans-serif',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {difficultyLabel[topic.difficulty]}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 20px', flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '17px',
              fontWeight: 700,
              color: 'var(--dark)',
              margin: '0 0 8px 0',
              lineHeight: 1.3,
            }}
          >
            {topic.title}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              color: 'var(--text-mid)',
              lineHeight: 1.6,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {topic.description}
          </p>

          {/* Hover comment preview */}
          {firstComment && (
            <div
              style={{
                marginTop: '12px',
                background: '#F5F3FF',
                borderLeft: '2px solid #4F46E5',
                padding: '8px 12px',
                borderRadius: '0 8px 8px 0',
                fontSize: '12px',
                color: '#6B7280',
                fontStyle: 'italic',
                fontFamily: 'Inter, system-ui, sans-serif',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 200ms ease',
                pointerEvents: 'none',
              }}
            >
              {firstComment}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 20px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(226,232,240,0.7)',
            marginTop: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '14px' }}>
            {/* Duration */}
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                color: 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {topic.duration}
            </span>

            {/* Comments — dynamic copy */}
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                color: 'var(--text-light)',
              }}
            >
              {commentCopy(topic.commentCount)}
            </span>
          </div>

          {/* Arrow CTA */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: 'rgba(79,70,229,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </article>
    </>
  )
}
