import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jogaly - Jogos Online Grátis',
  description: 'Jogue os melhores jogos online grátis no estilo Jogaly. Centenas de jogos divertidos para toda a família!',
  keywords: 'jogos online, Jogaly, jogos grátis, games, puzzle, aventura, ação',
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/favicon_io/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-site-verification" content="c_APdrWTSbmgTKrbAuugus_xCUXOclv0pS4n11o17Kc" />
        <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17241419163"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17241419163');
              
              // Event snippet for Visualização de página conversion page
              gtag('event', 'conversion', {
                  'send_to': 'AW-17241419163/y5jWCITAvN8aEJvbrJ1A',
                  'value': 1.0,
                  'currency': 'BRL'
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
} 