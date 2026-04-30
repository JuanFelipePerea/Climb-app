import type { Metadata } from 'next'
import Header from '@/components/Header'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'CLIMB — Habla inglés. De verdad.',
  description:
    'Plataforma de aprendizaje de inglés para estudiantes de secundaria. Speaking, gramática y vocabulario sin excusas.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.tailwindcss.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --primary:       #4F46E5;
            --primary-dark:  #3730A3;
            --primary-light: #818CF8;
            --primary-glow:  rgba(79,70,229,0.14);
            --accent:        #F97316;
            --accent-dark:   #EA6C0A;
            --success:       #10B981;
            --warning:       #FBBF24;
            --dark:          #0F172A;
            --dark-2:        #1E293B;
            --bg:            #F8FAFC;
            --card:          #FFFFFF;
            --text:          #0F172A;
            --text-mid:      #475569;
            --text-light:    #94A3B8;
            --border:        #E2E8F0;
          }

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            background-color: var(--bg);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: var(--text);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            line-height: 1.2;
          }

          a { color: inherit; text-decoration: none; }

          button {
            font-family: 'Inter', system-ui, sans-serif;
            cursor: pointer;
            border: none;
            outline: none;
          }

          button:focus-visible {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
          }

          /* Skeleton pulse animation */
          @keyframes skeleton-pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
          }

          .skeleton {
            background: var(--border);
            border-radius: 8px;
            animation: skeleton-pulse 1.5s ease-in-out infinite;
          }

          /* Smooth card lift */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .fade-up {
            animation: fadeUp 0.4s ease forwards;
          }

          /* Progress bar shimmer */
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
