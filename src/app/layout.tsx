import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jogaly Games - Jogos Online Grátis',
  description: 'Jogue os melhores jogos online grátis no estilo Jogaly. Centenas de jogos divertidos para toda a família!',
  keywords: 'jogos online, Jogaly, jogos grátis, games, puzzle, aventura, ação',
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
      </head>
      <body>{children}</body>
    </html>
  )
} 