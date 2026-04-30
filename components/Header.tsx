'use client'

import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { signInWithGoogle, signOutUser } from '@/lib/auth'

export default function Header() {
  const { user, loading } = useAuth()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(15,23,42,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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
            <path
              d="M9 2L16 14H2L9 2Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M9 6L13 14H5L9 6Z"
              fill="rgba(255,255,255,0.35)"
            />
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
      </a>

      {/* Auth area */}
      {loading ? (
        /* Skeleton — Umbral de Doherty: nunca mostramos nada roto */
        <div
          style={{
            width: '140px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.08)',
            animation: 'skeleton-pulse 1.5s ease-in-out infinite',
          }}
        />
      ) : user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? 'User'}
              width={36}
              height={36}
              style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(79,70,229,0.6)' }}
            />
          ) : (
            <div
              style={{
                width: '36px',
                height: '36px',
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
              {(user.displayName ?? user.email ?? '?')
                .split(' ')
                .map((w) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
          )}
          <span
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
              padding: '6px 14px',
              transition: 'all 150ms ease',
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
        /* CTA principal — Ley de Fitts: área generosa, contraste máximo */
        <button
          onClick={signInWithGoogle}
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
      )}
    </header>
  )
}
