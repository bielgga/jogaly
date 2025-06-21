import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Termos de Uso - Jogaly',
  description: 'Termos de uso e condições de utilização da plataforma Jogaly - Jogos gratuitos online.',
  keywords: 'termos de uso, condições, jogaly, jogos online, política',
  openGraph: {
    title: 'Termos de Uso - Jogaly',
    description: 'Termos de uso e condições de utilização da plataforma Jogaly.',
    type: 'website',
  },
}

export default function TermosDeUsoLayout({
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