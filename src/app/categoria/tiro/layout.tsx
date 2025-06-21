import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos de Tiro Online Grátis - Jogaly',
  description: 'Teste sua pontaria e reflexos com nossa coleção de jogos de tiro emocionantes! Jogue grátis no navegador.',
  keywords: 'jogos de tiro, tiro online, jogos de ação, pontaria, reflexos, jogos grátis',
  openGraph: {
    title: 'Jogos de Tiro Online Grátis - Jogaly',
    description: 'Teste sua pontaria e reflexos com nossa coleção de jogos de tiro emocionantes!',
    type: 'website',
  },
}

export default function TiroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 