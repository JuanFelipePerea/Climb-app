import Link from 'next/link'
import { Topic } from '@/types'
import CommentSection from './CommentSection'

interface TopicPageProps {
  topic: Topic
  prevTopic?: Topic
  nextTopic?: Topic
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

export default function TopicPage({ topic, nextTopic }: TopicPageProps) {
  const diff = difficultyColor[topic.difficulty]

  return (
    <main
      style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '40px 24px 80px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Breadcrumb — Nielsen: siempre saber dónde estás */}
      <nav style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--primary)',
            fontWeight: 500,
            transition: 'opacity 150ms',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Todos los temas
        </Link>
        <span style={{ color: 'var(--border)', fontSize: '14px' }}>/</span>
        <span style={{ fontSize: '14px', color: 'var(--text-mid)' }}>{topic.title}</span>
      </nav>

      {/* Header row */}
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {/* Emoji */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '15px',
              backgroundColor: 'rgba(79,70,229,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              flexShrink: 0,
            }}
          >
            {topic.emoji}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Difficulty */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: diff.text,
                backgroundColor: diff.bg,
                borderRadius: '999px',
                padding: '4px 12px',
              }}
            >
              {difficultyLabel[topic.difficulty]}
            </span>

            {/* Tags */}
            {topic.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: 'rgba(79,70,229,0.08)',
                  color: 'var(--primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  borderRadius: '999px',
                  padding: '4px 12px',
                }}
              >
                {tag}
              </span>
            ))}

            {/* Duration */}
            <span
              style={{
                fontSize: '12px',
                color: 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {topic.duration}
            </span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(28px, 5vw, 38px)',
            fontWeight: 800,
            color: 'var(--dark)',
            margin: '0 0 14px 0',
            lineHeight: 1.15,
          }}
        >
          {topic.title}
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-mid)',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {topic.description}
        </p>
      </header>

      {/* Examples section */}
      <section style={{ marginBottom: '40px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 14px 0',
          }}
        >
          Ejemplos reales
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topic.examples.map((example, i) => (
            <div
              key={i}
              style={{
                borderLeft: '3px solid var(--primary)',
                padding: '14px 18px',
                background: 'rgba(79,70,229,0.04)',
                fontSize: '15px',
                fontStyle: 'italic',
                color: 'var(--dark)',
                lineHeight: 1.65,
                borderRadius: '0 10px 10px 0',
              }}
            >
              {example}
            </div>
          ))}
        </div>
      </section>

      {/* Video */}
      <section style={{ marginBottom: '52px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 14px 0',
          }}
        >
          Video del tema
        </p>
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(15,23,42,0.12)',
            border: '1px solid var(--border)',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${topic.videoId}`}
            title={topic.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>
      </section>

      {/* Comments */}
      <CommentSection topicId={topic.id} />

      {/* Next topic CTA — Efecto Zeigarnik: siempre hay algo más */}
      {nextTopic && (
        <section
          style={{
            marginTop: '60px',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(129,140,248,0.04))',
            border: '1px solid rgba(79,70,229,0.15)',
            borderRadius: '20px',
            padding: '28px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '6px',
              }}
            >
              Siguiente tema
            </p>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--dark)',
              }}
            >
              {nextTopic.emoji} {nextTopic.title}
            </p>
          </div>
          <Link
            href={`/topic/${nextTopic.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '12px',
              padding: '12px 22px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
              transition: 'transform 150ms ease, box-shadow 150ms ease',
            }}
          >
            Continuar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </section>
      )}
    </main>
  )
}
