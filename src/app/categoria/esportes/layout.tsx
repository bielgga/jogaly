import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos de Esportes Online Grátis - Jogaly',
  description: 'Jogue os melhores jogos de esportes online grátis! Futebol, basquete, tênis, corrida e muito mais. Diversão esportiva garantida no Jogaly.',
  keywords: 'jogos de esportes, futebol online, basquete grátis, tênis virtual, jogos esportivos, competição online',
  openGraph: {
    title: 'Jogos de Esportes Online Grátis - Jogaly',
    description: 'Jogue os melhores jogos de esportes online grátis! Futebol, basquete, tênis, corrida e muito mais.',
    type: 'website',
  },
}

export default function EsportesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 