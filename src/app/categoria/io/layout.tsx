import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos IO Online Grátis - Jogaly',
  description: 'Jogue os melhores jogos IO multiplayer online! Compita com jogadores do mundo todo em jogos como Slither.io, Agar.io e muito mais. Grátis no navegador.',
  keywords: 'jogos io, io games, multiplayer online, slither, agar, snake io, battle royale, jogos grátis',
  openGraph: {
    title: 'Jogos IO Online Grátis - Jogaly',
    description: 'Jogue os melhores jogos IO multiplayer online! Compita com jogadores do mundo todo.',
    type: 'website',
  },
}

export default function IOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 