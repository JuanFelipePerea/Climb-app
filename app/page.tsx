'use client'

import { topics } from '@/data/topics'
import TopicCard from '@/components/TopicCard'

const pillars = [
  { letter: 'C', word: 'Conversation', description: 'Diálogos reales que puedes usar hoy mismo',             color: '#4F46E5', bg: 'rgba(79,70,229,0.1)'  },
  { letter: 'L', word: 'Listening',    description: 'Comprensión auditiva con video y audio nativo',         color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
  { letter: 'I', word: 'Interaction',  description: 'Aprende comentando y respondiendo a otros',             color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { letter: 'M', word: 'Mastery',      description: 'De principiante a fluido, paso a paso',                 color: '#F97316', bg: 'rgba(249,115,22,0.1)'  },
  { letter: 'B', word: 'Building',     description: 'Vocabulario y gramática que se quedan',                 color: '#EC4899', bg: 'rgba(236,72,153,0.1)'  },
]

const pageStyles = `
/* ── Hero ── */
.pg-hero  { padding: 48px 16px 64px; text-align: center; position: relative; overflow: hidden; background: linear-gradient(160deg, #0F172A 0%, #1E1B4B 55%, #0F172A 100%); }
.pg-h1    { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 900; color: #FFFFFF; line-height: 1.1; letter-spacing: -0.02em; max-width: 720px; margin: 0 auto 20px; font-size: 28px; }
.pg-sub   { font-family: Inter, system-ui, sans-serif; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 540px; margin: 0 auto 40px; font-size: 15px; }
.pg-cta   { display: flex; width: 100%; }
.pg-cta a { flex: 1; justify-content: center; }

/* ── Topics grid ── */
.pg-topics-wrap { padding: 0 16px 80px; background-color: var(--bg); }
.pg-topics-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

/* ── Pillars ── */
.pg-pillars-wrap { padding: 56px 16px; background-color: var(--bg); }
.pg-pillars-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.pg-pillar-card  { padding: 16px 12px; }
.pg-pillar-word  { font-size: 13px; }
.pg-pillar-desc  { font-size: 12px; }

@media (min-width: 640px) {
  .pg-hero  { padding: 60px 24px 80px; }
  .pg-h1    { font-size: 34px; }
  .pg-sub   { font-size: 17px; }
  .pg-cta   { display: block; width: auto; }
  .pg-cta a { flex: none; justify-content: initial; }
  .pg-topics-wrap { padding: 0 24px 80px; }
  .pg-topics-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .pg-pillars-wrap { padding: 64px 24px; }
  .pg-pillars-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .pg-pillar-card  { padding: 20px 16px; }
  .pg-pillar-word  { font-size: 14px; }
  .pg-pillar-desc  { font-size: 13px; }
}

@media (min-width: 1024px) {
  .pg-hero  { padding: 72px 24px 96px; }
  .pg-h1    { font-size: 40px; }
  .pg-sub   { font-size: 18px; }
  .pg-topics-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .pg-pillars-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; }
  .pg-pillar-card  { padding: 24px 20px; }
  .pg-pillar-word  { font-size: 15px; }
  .pg-pillar-desc  { font-size: 13px; }
}
`

export default function Home() {
  return (
    <main>
      <style>{pageStyles}</style>

      {/* ── Hero ── */}
      <section className="pg-hero">
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(79,70,229,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '10%', width: '300px', height: '200px', background: 'radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
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
            El 49.1% de estudiantes reprobaría Speaking hoy
          </span>
        </div>

        <h1 className="pg-h1">
          Tu inglés.{' '}
          <span style={{ background: 'linear-gradient(90deg, #818CF8, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Sin filtros.
          </span>{' '}
          Sin excusas.
        </h1>

        <p className="pg-sub">
          La plataforma hecha para estudiantes de 10° y 11° que quieren hablar
          inglés de verdad — no memorizar reglas que olvidan al otro día.
        </p>

        <div className="pg-cta">
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
        </div>

        <p style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
          Únete a estudiantes que ya están practicando · Sin tarjeta de crédito
        </p>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)', padding: '40px 16px' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            textAlign: 'center',
          }}
        >
          {[
            { value: '49.1%',    label: 'reprueban Speaking en bachillerato', color: '#EF4444', bg: 'rgba(239,68,68,0.06)'   },
            { value: '5 pilares', label: 'del método C.L.I.M.B.',             color: '#4F46E5', bg: 'rgba(79,70,229,0.06)'   },
            { value: '100% gratis', label: 'sin suscripción ni anuncios',     color: '#10B981', bg: 'rgba(16,185,129,0.06)'  },
          ].map((stat) => (
            <div key={stat.value} style={{ padding: '24px 16px', borderRight: '1px solid var(--border)', backgroundColor: stat.bg }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '28px', fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── C.L.I.M.B. Pillars ── */}
      <section className="pg-pillars-wrap">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              El método
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: 'var(--dark)', marginBottom: '16px' }}>
              Así funciona C.L.I.M.B.
            </h2>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', color: 'var(--text-mid)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Cinco pilares diseñados para que aprendas como lo hacen los nativos: con contexto real, no con traducciones.
            </p>
          </div>

          <div className="pg-pillars-grid">
            {pillars.map((p) => (
              <div
                key={p.letter}
                className="pg-pillar-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
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
                <div style={{ width: '44px', height: '44px', borderRadius: '13px', backgroundColor: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '22px', fontWeight: 900, color: p.color }}>{p.letter}</span>
                </div>
                <div className="pg-pillar-word" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 700, color: 'var(--dark)', marginBottom: '6px' }}>
                  {p.word}
                </div>
                <div className="pg-pillar-desc" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--text-mid)', lineHeight: 1.5 }}>
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics Grid ── */}
      <section id="topics" className="pg-topics-wrap">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--dark)' }}>
              Empieza por aquí
            </h2>
            <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--text-light)' }}>
              {topics.length} temas disponibles
            </span>
          </div>

          <div className="pg-topics-grid">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
