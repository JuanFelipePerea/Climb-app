'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { signInWithGoogle, signOutUser } from '@/lib/auth'
import { auth } from '@/lib/firebase'

const headerStyles = `
.hdr-root {
  position: sticky; top: 0; z-index: 50;
  background-color: rgba(15,23,42,0.92);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  height: 56px;
  display: flex; align-items: center;
  padding-left: 16px; padding-right: 16px;
  justify-content: space-between;
  gap: 8px;
}
.hdr-subtitle    { display: none; }
.hdr-username    { display: none; }
.hdr-login-long  { display: none; }
.hdr-login-short { display: flex; }
.hdr-nav { display: flex; align-items: center; gap: 4px; }
.hdr-nav-link {
  font-family: Inter, system-ui, sans-serif;
  font-size: 13px; font-weight: 500;
  color: rgba(255,255,255,0.6);
  padding: 6px 10px; border-radius: 8px;
  transition: color 150ms, background-color 150ms;
  white-space: nowrap;
}
.hdr-nav-link:hover { color: rgba(255,255,255,0.9); background-color: rgba(255,255,255,0.07); }
@media (min-width: 640px) {
  .hdr-root       { height: 64px; padding-left: 24px; padding-right: 24px; gap: 12px; }
  .hdr-subtitle   { display: block; }
  .hdr-username   { display: block; }
  .hdr-login-long { display: flex; }
  .hdr-login-short { display: none; }
  .hdr-nav-link   { font-size: 14px; padding: 6px 12px; }
}
`

export default function Header() {
  const { user, loading } = useAuth()
  const router = useRouter()

  async function handleLogin() {
    await signInWithGoogle()
    if (auth.currentUser) {
      router.push('/feed')
    }
  }

  const homeHref = user ? '/feed' : '/'

  return (
    <>
      <style>{headerStyles}</style>
      <header className="hdr-root">
        {/* Logo */}
        <Link href={homeHref} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 0 1px rgba(79,70,229,0.4), 0 4px 12px rgba(79,70,229,0.35)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2L16 14H2L9 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M9 6L13 14H5L9 6Z" fill="rgba(255,255,255,0.35)"/>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: '18px',
                color: '#FFFFFF',
                letterSpacing: '0.06em',
                lineHeight: 1,
              }}
            >
              CLIMB
            </span>
            <span
              className="hdr-subtitle"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Learn English Live
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hdr-nav" style={{ flex: 1 }}>
          <Link href={homeHref} className="hdr-nav-link">Inicio</Link>
          <Link href="/" className="hdr-nav-link">Explorar</Link>
        </nav>

        {/* Auth area */}
        {loading ? (
          <div
            style={{
              width: '100px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.08)',
              animation: 'skeleton-pulse 1.5s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
        ) : user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName ?? 'User'}
                width={34}
                height={34}
                style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(79,70,229,0.6)', flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  flexShrink: 0,
                }}
              >
                {(user.displayName ?? user.email ?? '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
              </div>
            )}
            <span
              className="hdr-username"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 500,
                maxWidth: '140px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.displayName ?? user.email}
            </span>
            <button
              onClick={signOutUser}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '8px',
                padding: '6px 12px',
                transition: 'all 150ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              }}
            >
              Salir
            </button>
          </div>
        ) : (
          <>
            {/* Mobile: icon + "Entrar" */}
            <button
              onClick={handleLogin}
              className="hdr-login-short"
              style={{
                background: 'linear-gradient(135deg, #F97316, #EA6C0A)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                borderRadius: '10px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 0 0 1px rgba(249,115,22,0.4), 0 4px 14px rgba(249,115,22,0.35)',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#fff" fillOpacity="0.9" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#fff" fillOpacity="0.9" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fff" fillOpacity="0.9" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#fff" fillOpacity="0.9" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar
            </button>

            {/* Desktop: full label */}
            <button
              onClick={handleLogin}
              className="hdr-login-long"
              style={{
                background: 'linear-gradient(135deg, #F97316, #EA6C0A)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: '10px',
                padding: '10px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 0 1px rgba(249,115,22,0.4), 0 4px 14px rgba(249,115,22,0.35)',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
                minHeight: '42px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(249,115,22,0.5), 0 6px 20px rgba(249,115,22,0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(249,115,22,0.4), 0 4px 14px rgba(249,115,22,0.35)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#fff" fillOpacity="0.9" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#fff" fillOpacity="0.9" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fff" fillOpacity="0.9" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#fff" fillOpacity="0.9" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar con Google
            </button>
          </>
        )}
      </header>
    </>
  )
}
