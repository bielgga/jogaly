import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos de Corrida Online Grátis - Jogaly',
  description: 'Acelere a fundo e deixe seus adversários para trás nestes jogos de corrida incríveis! Jogue grátis no navegador.',
  keywords: 'jogos de corrida, corrida online, carros, velocidade, racing, jogos grátis',
  openGraph: {
    title: 'Jogos de Corrida Online Grátis - Jogaly',
    description: 'Acelere a fundo e deixe seus adversários para trás nestes jogos de corrida incríveis!',
    type: 'website',
  },
}

export default function CorridaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 