'use client'

import { topics } from '@/data/topics'
import TopicCard from '@/components/TopicCard'

const pillars = [
  { letter: 'C', word: 'Conversation',  description: 'Diálogos reales — porque el 56% nos pidió hablar más, no memorizar más reglas',    color: '#4F46E5', bg: 'rgba(79,70,229,0.1)'  },
  { letter: 'L', word: 'Listening',     description: 'Audio e inglés nativo — para el 47% que lucha entendiendo cuando le hablan',          color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
  { letter: 'I', word: 'Interaction',   description: 'Aprende comentando y respondiendo — el idioma se queda cuando lo usas con otros',      color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { letter: 'M', word: 'Mastery',       description: 'Avance paso a paso con actividades dinámicas — nada de módulos impresos',             color: '#F97316', bg: 'rgba(249,115,22,0.1)'  },
  { letter: 'B', word: 'Building',      description: 'Vocabulario en contexto real: películas, música y vida cotidiana — no listas de palabras', color: '#EC4899', bg: 'rgba(236,72,153,0.1)'  },
]

const findings = [
  {
    stat: '6 de cada 10',
    label: 'estudiantes no practica inglés fuera del colegio',
    insight: 'No es desidia — es falta de una herramienta que encaje en su vida. CLIMB está diseñada para usarse en cualquier momento, sin preparación previa.',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.08)',
    border: 'rgba(79,70,229,0.2)',
  },
  {
    stat: '49%',
    label: 'lucha con Speaking — la habilidad más temida',
    insight: 'Casi la mitad de los estudiantes siente que no podría mantener una conversación en inglés hoy. Cada tema de CLIMB empieza con diálogo real para cambiar eso.',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
  },
  {
    stat: '56.7%',
    label: 'quiere más práctica de conversación, menos teoría',
    insight: 'Los estudiantes ya saben lo que necesitan. Nosotros solo lo construimos: contenido conversacional que puedes usar ese mismo día.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    stat: '42%',
    label: 'cree que los juegos y herramientas digitales los ayudarían',
    insight: 'El formato importa. Por eso CLIMB no se parece a un libro de texto: es interactiva, visual y construida para que aprender no se sienta como tarea.',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
  },
]

const pageStyles = `
/* ── Hero ── */
.pg-hero  { padding: 56px 16px 72px; text-align: center; position: relative; overflow: hidden; background: linear-gradient(160deg, #0F172A 0%, #1E1B4B 55%, #0F172A 100%); }
.pg-h1    { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 900; color: #FFFFFF; line-height: 1.1; letter-spacing: -0.02em; max-width: 760px; margin: 0 auto 20px; font-size: 28px; }
.pg-sub   { font-family: Inter, system-ui, sans-serif; color: rgba(255,255,255,0.65); line-height: 1.75; max-width: 560px; margin: 0 auto 40px; font-size: 15px; }
.pg-cta   { display: flex; width: 100%; flex-direction: column; align-items: center; gap: 14px; }

/* ── Research section ── */
.pg-research-wrap  { padding: 72px 16px; background: #F8F7FF; }
.pg-research-intro { text-align: center; margin-bottom: 48px; }
.pg-findings-grid  { display: grid; grid-template-columns: 1fr; gap: 16px; max-width: 960px; margin: 0 auto; }
.pg-finding-card   { padding: 24px 20px; border-radius: 18px; }

/* ── Stats strip ── */
.pg-stats-wrap { background: #FFFFFF; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 40px 16px; }
.pg-stats-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); text-align: center; }

/* ── Pillars ── */
.pg-pillars-wrap { padding: 56px 16px; background-color: var(--bg); }
.pg-pillars-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.pg-pillar-card  { padding: 16px 12px; }
.pg-pillar-word  { font-size: 13px; }
.pg-pillar-desc  { font-size: 12px; }

/* ── Topics grid ── */
.pg-topics-wrap { padding: 0 16px 80px; background-color: var(--bg); }
.pg-topics-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

@media (min-width: 640px) {
  .pg-hero  { padding: 72px 24px 88px; }
  .pg-h1    { font-size: 36px; }
  .pg-sub   { font-size: 17px; }
  .pg-cta   { flex-direction: row; justify-content: center; width: auto; }
  .pg-research-wrap  { padding: 80px 24px; }
  .pg-findings-grid  { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .pg-finding-card   { padding: 28px 24px; }
  .pg-topics-wrap { padding: 0 24px 80px; }
  .pg-topics-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .pg-pillars-wrap { padding: 64px 24px; }
  .pg-pillars-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .pg-pillar-card  { padding: 20px 16px; }
  .pg-pillar-word  { font-size: 14px; }
  .pg-pillar-desc  { font-size: 13px; }
}

@media (min-width: 1024px) {
  .pg-hero  { padding: 88px 24px 104px; }
  .pg-h1    { font-size: 44px; }
  .pg-sub   { font-size: 18px; }
  .pg-research-wrap  { padding: 96px 24px; }
  .pg-findings-grid  { grid-template-columns: repeat(4, 1fr); }
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
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '320px', background: 'radial-gradient(ellipse, rgba(79,70,229,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
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
            padding: '6px 18px',
            marginBottom: '32px',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <span style={{ fontSize: '13px', color: '#818CF8', fontWeight: 600, letterSpacing: '0.01em' }}>
            Basado en investigación real con estudiantes de 10° y 11°
          </span>
        </div>

        <h1 className="pg-h1">
          Investigamos por qué el inglés{' '}
          <span style={{ background: 'linear-gradient(90deg, #818CF8, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            se siente tan difícil.
          </span>{' '}
          Luego construimos CLIMB.
        </h1>

        <p className="pg-sub">
          Antes de escribir una sola línea de código, encuestamos a más de 60 estudiantes como tú.
          Sus respuestas nos mostraron exactamente qué estaba fallando — y cómo arreglarlo.
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

          <a
            href="#investigacion"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
          >
            Ver la investigacion
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>
        </div>

        <p style={{ marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, system-ui, sans-serif' }}>
          Sin tarjeta de crédito · Sin anuncios · Hecho para bachillerato colombiano
        </p>
      </section>

      {/* ── Research Findings ── */}
      <section id="investigacion" className="pg-research-wrap">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          <div className="pg-research-intro">
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, color: '#4F46E5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Lo que encontramos
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: 'var(--dark)', marginBottom: '18px', lineHeight: 1.2 }}>
              Hicimos la investigacion primero.
            </h2>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '17px', color: 'var(--text-mid)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
              Encuestamos a estudiantes de 10° y 11° sobre sus dificultades reales con el ingles.
              Los patrones que aparecieron nos dejaron claro: el problema no es el estudiante.
              Es la forma en que se ha ensenado el idioma.
            </p>
          </div>

          <div className="pg-findings-grid">
            {findings.map((f) => (
              <div
                key={f.stat}
                className="pg-finding-card"
                style={{
                  backgroundColor: f.bg,
                  border: `1px solid ${f.border}`,
                }}
              >
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 900, color: f.color, lineHeight: 1, marginBottom: '8px' }}>
                  {f.stat}
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '14px', fontWeight: 700, color: 'var(--dark)', marginBottom: '12px', lineHeight: 1.4 }}>
                  {f.label}
                </div>
                <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                  {f.insight}
                </div>
              </div>
            ))}
          </div>

          {/* Bridge quote */}
          <div style={{
            marginTop: '56px',
            padding: '32px 28px',
            backgroundColor: '#1E1B4B',
            borderRadius: '20px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '200px', background: 'radial-gradient(ellipse, rgba(79,70,229,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 'clamp(17px, 3vw, 22px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto',
              position: 'relative',
            }}>
              "Los estudiantes no necesitan mas teoria. Necesitan un espacio donde
              practicar ingles de forma real, dinamica y sin miedo a equivocarse."
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '16px', letterSpacing: '0.04em', position: 'relative' }}>
              CONCLUSION DE LA ENCUESTA · 60+ ESTUDIANTES · GRADOS 10° Y 11°
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="pg-stats-wrap">
        <div className="pg-stats-grid">
          {[
            { value: '60%',       label: 'no practica ingles fuera del colegio — CLIMB cambia eso',  color: '#4F46E5', bg: 'rgba(79,70,229,0.05)'   },
            { value: '49.1%',     label: 'lucha con Speaking — nuestra prioridad #1',                 color: '#EF4444', bg: 'rgba(239,68,68,0.05)'    },
            { value: '100% gratis', label: 'sin suscripcion, sin anuncios, sin excusas',              color: '#10B981', bg: 'rgba(16,185,129,0.05)'   },
          ].map((stat) => (
            <div key={stat.value} style={{ padding: '28px 16px', borderRight: '1px solid var(--border)', backgroundColor: stat.bg }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.5 }}>
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
              Nuestra respuesta
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: 'var(--dark)', marginBottom: '16px' }}>
              Cinco pilares. Un proposito.
            </h2>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', color: 'var(--text-mid)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
              Cada pilar de C.L.I.M.B. fue disenado para responder directamente a lo que los estudiantes nos dijeron que necesitaban.
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
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>
              Empieza por aqui
            </h2>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', color: 'var(--text-mid)', lineHeight: 1.6 }}>
              Cada tema fue elegido porque aparecio en las conversaciones reales de los estudiantes que encuestamos.
            </p>
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
