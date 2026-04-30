'use client'

import { topics } from '@/data/topics'
import TopicCard from '@/components/TopicCard'

/* C.L.I.M.B. acronym pillars */
const pillars = [
  {
    letter: 'C',
    word: 'Conversation',
    description: 'Diálogos reales que puedes usar hoy mismo',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.1)',
  },
  {
    letter: 'L',
    word: 'Listening',
    description: 'Comprensión auditiva con video y audio nativo',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.1)',
  },
  {
    letter: 'I',
    word: 'Interaction',
    description: 'Aprende comentando y respondiendo a otros',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    letter: 'M',
    word: 'Mastery',
    description: 'De principiante a fluido, paso a paso',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.1)',
  },
  {
    letter: 'B',
    word: 'Building',
    description: 'Vocabulario y gramática que se quedan',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.1)',
  },
]

export default function Home() {
  return (
    <main>
      {/* ─────────────────────────────────────────────
          HERO — Ley de Hick: una acción clara.
          Fondo oscuro con gradiente para Premium EdTech.
      ───────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(160deg, #0F172A 0%, #1E1B4B 55%, #0F172A 100%)',
          padding: '80px 24px 96px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow orbs — profundidad visual */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '10%',
            width: '300px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge social proof — Hook inmediato */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(79,70,229,0.18)',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '28px',
          }}
        >
          <span style={{ fontSize: '14px', color: '#818CF8', fontWeight: 600 }}>
            🎯 El 49.1% de estudiantes reprobaría Speaking hoy
          </span>
        </div>

        {/* H1 — Ley de Fitts: el texto más grande domina la atención */}
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '720px',
            margin: '0 auto 20px',
          }}
        >
          Tu inglés.{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #818CF8, #4F46E5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sin filtros.
          </span>{' '}
          Sin excusas.
        </h1>

        {/* H2 */}
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            maxWidth: '540px',
            margin: '0 auto 40px',
          }}
        >
          La plataforma hecha para estudiantes de 10° y 11° que quieren hablar
          inglés de verdad — no memorizar reglas que olvidan al otro día.
        </p>

        {/* CTA principal — Ley de Fitts: grande, centrado, naranja */}
        <a
          href="#topics"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #F97316, #EA6C0A)',
            color: '#FFFFFF',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: '17px',
            borderRadius: '14px',
            padding: '16px 36px',
            boxShadow: '0 0 0 1px rgba(249,115,22,0.4), 0 8px 24px rgba(249,115,22,0.4)',
            textDecoration: 'none',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = 'translateY(-2px)'
            el.style.boxShadow = '0 0 0 1px rgba(249,115,22,0.5), 0 12px 32px rgba(249,115,22,0.5)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 0 0 1px rgba(249,115,22,0.4), 0 8px 24px rgba(249,115,22,0.4)'
          }}
        >
          Empieza ahora — es gratis
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        {/* Social proof mini — Nielsen: visibilidad del estado */}
        <p style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
          Únete a estudiantes que ya están practicando · Sin tarjeta de crédito
        </p>
      </section>

      {/* ─────────────────────────────────────────────
          STAT VISUAL — Social proof con datos reales.
          Ley de Miller: 3 números, no más.
      ───────────────────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0',
            textAlign: 'center',
          }}
        >
          {[
            { value: '49.1%', label: 'reprueban Speaking en bachillerato', color: '#EF4444', bg: 'rgba(239,68,68,0.06)' },
            { value: '5 pilares', label: 'del método C.L.I.M.B.', color: '#4F46E5', bg: 'rgba(79,70,229,0.06)' },
            { value: '100% gratis', label: 'sin suscripción ni anuncios', color: '#10B981', bg: 'rgba(16,185,129,0.06)' },
          ].map((stat) => (
            <div
              key={stat.value}
              style={{
                padding: '28px 20px',
                borderRight: '1px solid var(--border)',
                backgroundColor: stat.bg,
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '32px',
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  color: 'var(--text-mid)',
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          C.L.I.M.B. PILLARS — Ley de Miller: 5 chunks.
          Muestra el método, genera confianza.
      ───────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', backgroundColor: 'var(--bg)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--primary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              El método
            </p>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(26px, 4vw, 38px)',
                fontWeight: 800,
                color: 'var(--dark)',
                marginBottom: '16px',
              }}
            >
              Así funciona C.L.I.M.B.
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '16px',
                color: 'var(--text-mid)',
                maxWidth: '520px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Cinco pilares diseñados para que aprendas como lo hacen los nativos: con contexto real, no con traducciones.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
            }}
          >
            {pillars.map((p) => (
              <div
                key={p.letter}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '24px 20px',
                  textAlign: 'center',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = `0 12px 32px ${p.bg.replace('0.1', '0.2')}`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: p.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '24px',
                      fontWeight: 900,
                      color: p.color,
                    }}
                  >
                    {p.letter}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--dark)',
                    marginBottom: '8px',
                  }}
                >
                  {p.word}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: 'var(--text-mid)',
                    lineHeight: 1.5,
                  }}
                >
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          TOPICS GRID — Efecto Zeigarnik activado.
          Las tarjetas con progreso retienen al usuario.
      ───────────────────────────────────────────── */}
      <section id="topics" style={{ padding: '0 24px 80px', backgroundColor: 'var(--bg)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--dark)',
              }}
            >
              Empieza por aquí
            </h2>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                color: 'var(--text-light)',
              }}
            >
              {topics.length} temas disponibles
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
