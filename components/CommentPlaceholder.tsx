'use client'

import { signInWithGoogle } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'

interface Comment {
  initials: string
  name: string
  time: string
  text: string
}

const commentsByTopic: Record<string, Comment[]> = {
  'past-simple': [
    {
      initials: 'LP',
      name: 'Laura P.',
      time: 'hace 1 hora',
      text: "Siempre me confundía con 'didn't go' vs 'went not' — por fin entiendo que la negación va con did, no con el verbo principal.",
    },
    {
      initials: 'AR',
      name: 'Andrés R.',
      time: 'hace 3 horas',
      text: "Lo que me ayudó fue memorizar los irregulares de a poquitos: go→went, come→came, see→saw. Sin lista larga.",
    },
  ],
  'false-friends': [
    {
      initials: 'MR',
      name: 'María R.',
      time: 'hace 2 horas',
      text: "'Embarrassed' realmente no significa embarazada? Siempre lo confundí jaja. Me salvaste de una situación incómoda.",
    },
    {
      initials: 'JC',
      name: 'Juan C.',
      time: 'hace 5 horas',
      text: "En México decimos 'actualmente' queriendo decir 'currently' — ese me quemó fuerte en una reunión de trabajo.",
    },
  ],
  fillers: [
    {
      initials: 'SV',
      name: 'Sofía V.',
      time: 'hace 30 minutos',
      text: "Yo abusaba del 'basically' en cada frase. Mis colegas americanos me lo señalaron con cariño jaja. Ahora lo uso con moderación.",
    },
    {
      initials: 'DM',
      name: 'Diego M.',
      time: 'hace 4 horas',
      text: "El 'you know' al final de frase me costó meses entender. Pensaba que me estaban preguntando algo. Es solo relleno.",
    },
  ],
  'present-perfect': [
    {
      initials: 'CR',
      name: 'Camila R.',
      time: 'hace 2 horas',
      text: "Esto me explotó la cabeza en el colegio. La clave que me funcionó: si dices 'yesterday', usa past simple. Si no hay tiempo específico, present perfect.",
    },
    {
      initials: 'FT',
      name: 'Felipe T.',
      time: 'hace 6 horas',
      text: "'Have you ever tried' vs 'Did you try' — la diferencia es enorme en contexto real. El primero abre conversación, el segundo la cierra.",
    },
  ],
  'small-talk': [
    {
      initials: 'VG',
      name: 'Valentina G.',
      time: 'hace 1 hora',
      text: "Lo más difícil no es entender el small talk sino saber cuándo terminar la conversación con gracia. 'Anyway, I'll let you go' me salvó mil veces.",
    },
    {
      initials: 'RM',
      name: 'Ricardo M.',
      time: 'hace 8 horas',
      text: "En mi trabajo con clientes de USA aprendí que preguntar '¿cómo está su familia?' es demasiado personal de entrada. El clima y el trabajo son seguros siempre.",
    },
  ],
}

/* Avatar con iniciales */
function Avatar({ initials, size = 38 }: { initials: string; size?: number }) {
  const colors = ['#4F46E5', '#0EA5E9', '#10B981', '#F97316', '#EC4899']
  const color = colors[initials.charCodeAt(0) % colors.length]

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
        color: color,
        flexShrink: 0,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {initials}
    </div>
  )
}

interface CommentPlaceholderProps {
  topicId: string
}

export default function CommentPlaceholder({ topicId }: CommentPlaceholderProps) {
  const { user, loading } = useAuth()
  const comments = commentsByTopic[topicId] ?? []

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
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-light)',
          }}
        >
          {comments.length} respuestas
        </span>
      </h2>

      {/* Compose area — Nielsen: prevención de errores con guía clara */}
      {loading ? (
        /* Skeleton — Doherty: nada roto mientras carga */
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
        /* Logged in — compose box (placeholder funcional) */
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
          <Avatar initials={(user.displayName ?? user.email ?? '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()} />
          <div style={{ flex: 1 }}>
            <textarea
              placeholder="Comparte tu experiencia con este tema..."
              style={{
                width: '100%',
                height: '80px',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: '14px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'var(--text)',
                backgroundColor: 'transparent',
                lineHeight: 1.6,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: '10px',
                  padding: '8px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                  transition: 'transform 120ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Logged out — CTA amigable, no hostil. Ley de Hick: una sola acción. */
        <div
          style={{
            backgroundColor: 'rgba(79,70,229,0.04)',
            border: '1.5px dashed rgba(79,70,229,0.25)',
            borderRadius: '16px',
            padding: '28px 24px',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '17px',
              fontWeight: 700,
              color: 'var(--dark)',
              marginBottom: '8px',
            }}
          >
            ¿Tienes una duda o experiencia con esto?
          </p>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              color: 'var(--text-mid)',
              lineHeight: 1.6,
              marginBottom: '20px',
              maxWidth: '400px',
              margin: '0 auto 20px',
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
      )}

      {/* Comments list */}
      {comments.length === 0 ? (
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            color: 'var(--text-light)',
            textAlign: 'center',
            padding: '32px 0',
          }}
        >
          Sé el primero en comentar este tema.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {comments.map((comment, i) => (
            <div
              key={comment.initials + i}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '20px 0',
                borderBottom: i < comments.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <Avatar initials={comment.initials} />
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
                    {comment.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '12px',
                      color: 'var(--text-light)',
                    }}
                  >
                    {comment.time}
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
