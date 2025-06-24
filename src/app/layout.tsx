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
  manifest: '/favicon_io/site.webmanifest',
  openGraph: {
    title: 'Jogaly - Jogos Online Grátis',
    description: 'Jogue os melhores jogos online grátis no estilo Jogaly. Centenas de jogos divertidos para toda a família!',
    images: [{
      url: 'https://jogaly.com/logojogaly2.png',
      width: 400,
      height: 120,
      alt: 'Jogaly - Logo'
    }],
    type: 'website',
    siteName: 'Jogaly',
    locale: 'pt_BR',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jogaly.com'
  
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jogaly',
    description: 'Jogos online grátis para toda a família',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logojogaly2.png`,
      width: 400,
      height: 120
    },
    sameAs: [
      // Adicione aqui suas redes sociais quando tiver
    ]
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jogaly',
    description: 'Jogos online grátis para toda a família',
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Jogaly',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logojogaly2.png`,
        width: 400,
        height: 120
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/jogar/{search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

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
        
        {/* Meta tags para o Google */}
        <meta property="og:image" content="https://jogaly.com/logojogaly2.png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="120" />
        <meta property="og:image:alt" content="Jogaly - Jogos Online Grátis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://jogaly.com/logojogaly2.png" />
        
        {/* Dados estruturados da organização */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        
        {/* Dados estruturados do website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        
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