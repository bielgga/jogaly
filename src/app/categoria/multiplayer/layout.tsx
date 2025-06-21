import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos Multiplayer Online Grátis - Jogaly',
  description: 'Divirta-se com amigos nos melhores jogos multiplayer online! Jogue grátis no navegador.',
  keywords: 'jogos multiplayer, multijogador, amigos, online, cooperativo, jogos grátis',
  openGraph: {
    title: 'Jogos Multiplayer Online Grátis - Jogaly',
    description: 'Divirta-se com amigos nos melhores jogos multiplayer online!',
    type: 'website',
  },
}

export default function MultiplayerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 