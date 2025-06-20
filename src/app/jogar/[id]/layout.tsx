import type { Metadata } from 'next'
import Script from 'next/script'
import { gameService } from '@/lib/supabase'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const game = await gameService.getGameById(params.id)
    
    if (!game) {
      return {
        title: 'Jogo não encontrado - Jogaly Games',
        description: 'O jogo que você procura não foi encontrado.',
      }
    }

    const gameTitle = `${game.title} - Jogue Online Grátis`
    const gameDescription = `${game.description} Jogue ${game.title} grátis no Jogaly Games. ${game.instructions}`

    return {
      title: `${gameTitle} | Jogaly Games`,
      description: gameDescription.slice(0, 160),
      keywords: [
        game.title.toLowerCase(),
        game.category.toLowerCase(),
        'jogos online',
        'Jogaly',
        'jogos grátis',
        'html5 games',
        'browser games'
      ].join(', '),
      authors: [{ name: 'Jogaly Games' }],
      creator: 'Jogaly Games',
      publisher: 'Jogaly Games',
      robots: 'index, follow',
      openGraph: {
        title: gameTitle,
        description: gameDescription.slice(0, 160),
        images: [{
          url: game.thumb,
          width: parseInt(game.width),
          height: parseInt(game.height),
          alt: `${game.title} - Jogue Online Grátis`
        }],
        type: 'website',
        siteName: 'Jogaly Games',
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        title: gameTitle,
        description: gameDescription.slice(0, 160),
        images: [game.thumb],
        creator: '@Jogalygames',
      },
      alternates: {
        canonical: `/jogar/${game.id}`,
      },
      other: {
        'game:category': game.category,
      }
    }
  } catch (error) {
    console.error('Erro ao gerar metadata:', error)
    return {
      title: 'Erro - Jogaly Games',
      description: 'Erro ao carregar informações do jogo.',
    }
  }
}

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  try {
    const game = await gameService.getGameById(params.id)
    
    if (!game) {
      return children
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: game.title,
      description: game.description,
      image: game.thumb,
      genre: game.category,
      gamePlatform: 'Web Browser',
      operatingSystem: 'Any',
      applicationCategory: 'Game',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Jogaly Games'
      }
    }

    return (
      <>
        <Script
          id="game-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}
      </>
    )
  } catch (error) {
    console.error('Erro no layout:', error)
    return children
  }
} 