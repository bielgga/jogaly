import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quebra-Cabeças Online Grátis - Jogaly',
  description: 'Desafie sua mente e desenvolva seu raciocínio lógico com nossos quebra-cabeças! Jogue grátis no navegador.',
  keywords: 'quebra-cabeça, puzzle, raciocínio lógico, mente, desafio, jogos grátis',
  openGraph: {
    title: 'Quebra-Cabeças Online Grátis - Jogaly',
    description: 'Desafie sua mente e desenvolva seu raciocínio lógico com nossos quebra-cabeças!',
    type: 'website',
  },
}

export default function QuebraCabecaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 