import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Categorias de Jogos Online Grátis - Jogaly',
  description: 'Explore diferentes categorias de jogos online grátis no Jogaly. Tiro, corrida, quebra-cabeças, cozinhar, esportes, multiplayer, IO e muito mais!',
  keywords: 'categorias de jogos, jogos online, jogos grátis, tiro, corrida, quebra-cabeça, cozinhar, multiplayer, esportes, io, ação, aventura',
  openGraph: {
    title: 'Categorias de Jogos Online Grátis - Jogaly',
    description: 'Explore nossa incrível coleção de jogos organizados por categorias. Encontre exatamente o tipo de diversão que você está procurando!',
    type: 'website',
  },
}

export default function CategoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
} 