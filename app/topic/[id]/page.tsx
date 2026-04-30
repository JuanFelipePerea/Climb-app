import { topics } from '@/data/topics'
import TopicPage from '@/components/TopicPage'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const index = topics.findIndex((t) => t.id === id)
  const topic = topics[index]

  if (!topic) {
    return (
      <main
        style={{
          maxWidth: '480px',
          margin: '100px auto',
          padding: '0 24px',
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '56px', marginBottom: '20px' }}>🔍</div>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '26px',
            fontWeight: 800,
            color: 'var(--dark)',
            marginBottom: '12px',
          }}
        >
          Tema no encontrado
        </h1>
        <p style={{ color: 'var(--text-mid)', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
          El tema que buscas no existe o fue movido.
        </p>
        <Link
          href="/"
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
            padding: '12px 24px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
          }}
        >
          Ver todos los temas
        </Link>
      </main>
    )
  }

  const nextTopic = topics[index + 1]

  return <TopicPage topic={topic} nextTopic={nextTopic} />
}

export function generateStaticParams() {
  return topics.map((t) => ({ id: t.id }))
}
