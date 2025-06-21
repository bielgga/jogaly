import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos de Cozinhar Online Grátis - Jogaly',
  description: 'Solte o chef que há em você e prepare pratos deliciosos nestes jogos de culinária! Jogue grátis no navegador.',
  keywords: 'jogos de cozinhar, culinária, chef, cozinha, receitas, jogos grátis',
  openGraph: {
    title: 'Jogos de Cozinhar Online Grátis - Jogaly',
    description: 'Solte o chef que há em você e prepare pratos deliciosos nestes jogos de culinária!',
    type: 'website',
  },
}

export default function CozinharLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 