'use client'

import { useState, useEffect, lazy, Suspense, useMemo, useCallback, memo } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { gameService, GameListItem } from '@/lib/supabase'
import GameCard from '@/components/GameCard'
import Header from '@/components/Header'

// Lazy loading otimizado com preload estratégico
const Footer = lazy(() => import('@/components/Footer'))
const SectionSkeleton = dynamic(() => import('@/components/SectionSkeleton'), {
  ssr: false,
  loading: () => (
    <div className="mt-16 animate-pulse">
      <div className="h-20 bg-gray-300 rounded-2xl mb-12 mx-auto max-w-md"></div>
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-300 rounded-2xl"></div>
        ))}
      </div>
    </div>
  )
})

// Componente memoizado para seções de jogos
const GameSection = memo(({ 
  games, 
  title, 
  emoji, 
  sectionId,
  loading = false,
  rotation = 0
}: {
  games: GameListItem[]
  title: string
  emoji: string
  sectionId: string
  loading?: boolean
  rotation?: number
}) => {
  if (loading) {
    return (
      <SectionSkeleton 
        title={title} 
        emoji={emoji}
        gridCols={{ mobile: 3, tablet: 6, desktop: 8 }}
        itemCount={games.length || 12}
      />
    )
  }

  if (games.length === 0) return null

  return (
    <section aria-labelledby={`${sectionId}-heading`}>
      <h2 id={`${sectionId}-heading`} className="sr-only">{title}</h2>
      <div className="mt-16">
        {/* Título */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl hover:rotate-0 transition-transform duration-300" style={{ transform: `rotate(${rotation}deg)` }}>
              <span className="mr-3">{emoji}</span>
              {title}
              <span className="ml-3">{emoji}</span>
            </div>
          </div>
        </div>
        
        {/* Grid de Jogos */}
        <div className="w-full">
          {/* Mobile: 3 colunas menores */}
          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {games.map((game) => (
              <div key={`${sectionId}-${game.id}`} className="aspect-square">
                <GameCard game={game} />
              </div>
            ))}
          </div>

          {/* Tablet: 6 colunas menores */}
          <div className="hidden sm:grid lg:hidden grid-cols-6 gap-3">
            {games.map((game) => (
              <div key={`${sectionId}-${game.id}`} className="aspect-square">
                <GameCard game={game} />
              </div>
            ))}
          </div>

          {/* Desktop: 8 colunas menores */}
          <div className="hidden lg:grid grid-cols-8 gap-3">
            {games.map((game) => (
              <div key={`${sectionId}-${game.id}`} className="aspect-square">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

GameSection.displayName = 'GameSection'

// Componente para Card de Categoria
const CategoryCard = memo(({ 
  title, 
  imageUrl, 
  href 
}: {
  title: string
  imageUrl: string
  href: string
}) => {
  return (
    <Link href={href} className="group relative w-full aspect-square rounded-full overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-110 border-[3px] border-white/20 hover:border-yellow-400/50 shadow-lg hover:shadow-2xl">
      {/* Imagem de fundo escurecida */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 11vw"
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500"></div>
      </div>
      
      {/* Efeito de partículas */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Partículas animadas menores para círculos */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400/80 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-orange-400/80 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-yellow-300/80 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-orange-300/80 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-yellow-500/80 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-orange-500/80 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        
        {/* Efeito de brilho circular */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-400/20 animate-pulse rounded-full"></div>
      </div>
      
      {/* Título da categoria dentro do círculo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white font-bold text-xs sm:text-sm text-center px-2 drop-shadow-2xl group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
          {title}
        </h3>
      </div>
      
      {/* Efeito de hover adicional */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/30 rounded-full transition-all duration-300"></div>
    </Link>
  )
})

CategoryCard.displayName = 'CategoryCard'

// Componente principal otimizado
export default function Home() {
  const [games, setGames] = useState<GameListItem[]>([])
  const [popularGames, setPopularGames] = useState<GameListItem[]>([])
  const [page3Games, setPage3Games] = useState<GameListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para controlar loading das seções
  const [sectionsLoading, setSectionsLoading] = useState({
    popular: true,
    page3: true
  })

  // Memoizar jogos filtrados e ordenados
  const filteredGames = useMemo(() => {
    return games.sort((a, b) => b.likes - a.likes)
  }, [games])

  // Callback memoizado para carregar seções com otimização de performance
  const loadSections = useCallback(async () => {
    try {
      // Carregar seções restantes
      const [popularGamesData, page3GamesData] = await Promise.all([
        gameService.getGamesByPage(2),
        gameService.getGamesByPage(3),
      ])
      
      setPopularGames(popularGamesData.sort((a, b) => b.likes - a.likes))
      setPage3Games(page3GamesData.sort((a, b) => b.likes - a.likes))
      setSectionsLoading({ popular: false, page3: false })
      
    } catch (err) {
      console.error('Erro ao carregar seções adicionais:', err)
      setSectionsLoading({ popular: false, page3: false })
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadGames() {
      setLoading(true)
      setError(null)
      
      try {
        // Carregar jogos da página 1 primeiro (crítico)
        const gamesData = await gameService.getAllGames()
        
        if (!isMounted) return
        
        const sortedGames = gamesData.sort((a, b) => b.likes - a.likes)
        setGames(sortedGames)
        
        if (gamesData.length === 0) {
          setError('Nenhum jogo encontrado. Execute o script de população do banco de dados.')
        } else {
          // Carregar outras seções após um delay mínimo
          setTimeout(() => {
            if (isMounted) {
              loadSections()
            }
          }, 100)
        }
        
      } catch (err) {
        console.error('Erro ao carregar jogos:', err)
        if (isMounted) {
          setError('Erro ao carregar jogos. Verifique se o Supabase está configurado corretamente.')
        }
      }
      
      if (isMounted) {
        setLoading(false)
      }
    }
    
    loadGames()

    return () => {
      isMounted = false
    }
  }, [loadSections])

  // Componente de loading otimizado
  const LoadingComponent = useMemo(() => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Logo com animação */}
        <div className="mb-8">
          <div className="animate-bounce">
            <Image
              src="/logojogaly2.png"
              alt="Carregando Jogaly"
              width={400}
              height={120}
              className="h-32 w-auto"
              priority
            />
          </div>
        </div>
        
        {/* Dots animados com efeito mais bonito */}
        <div className="flex justify-center items-center space-x-3">
          <div className="w-5 h-5 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
          <div className="w-5 h-5 bg-white rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}></div>
          <div className="w-5 h-5 bg-yellow-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </div>
  ), [])

  if (loading) {
    return LoadingComponent
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Erro ao Carregar Jogos</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Título principal da página - visualmente oculto mas semanticamente correto */}
        <h1 className="sr-only">Jogos Online Grátis - Jogaly</h1>
        
        {/* Seção Principal - Jogos da Página 1 */}
        <section aria-labelledby="main-games-heading">
          <h2 id="main-games-heading" className="sr-only">Jogos Principais</h2>
          <div className="grid gap-3 sm:gap-4 mb-12">
            {/* Mobile: 2 colunas */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">
              {filteredGames.map((game, index) => (
                <div key={game.id} className="aspect-square">
                  <GameCard game={game} priority={index < 6} />
                </div>
              ))}
            </div>

            {/* Tablet: 5 colunas, primeiro jogo ocupa 2x2 */}
            <div className="hidden sm:grid lg:hidden grid-cols-5 gap-4">
              {filteredGames.map((game, index) => (
                <div
                  key={game.id}
                  className={`aspect-square ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <GameCard game={game} priority={index < 8} />
                </div>
              ))}
            </div>

            {/* Desktop: 7 colunas, primeiro jogo ocupa 2x2 */}
            <div className="hidden lg:grid grid-cols-7 gap-4">
              {filteredGames.map((game, index) => (
                <div
                  key={game.id}
                  className={`aspect-square ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <GameCard game={game} priority={index < 10} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Categorias - Posição original com layout novo */}
        <section className="mb-16" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">Categorias de Jogos</h2>
          
          {/* Grid de Categorias - Maiores */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            <CategoryCard
              title="Jogos de Tiro"
              imageUrl="https://img.gamemonetize.com//z3ns6gvgxik7pb9l1jhfvvkg964ewpxl//512x384.jpg"
              href="/categoria/tiro"
            />
            <CategoryCard
              title="Jogos de Corrida"
              imageUrl="https://img.gamemonetize.com/whsoq6n1ply6s1k4lbjfnwaozsjb26t5/512x384.jpg"
              href="/categoria/corrida"
            />
            <CategoryCard
              title="Quebra-Cabeças"
              imageUrl="https://img.gamemonetize.com//5pqlhiolbr13mi1heq05z1rkzfv8jw8y//512x384.jpg"
              href="/categoria/quebra-cabeca"
            />
            <CategoryCard
              title="Jogos de Cozinhar"
              imageUrl="https://img.gamemonetize.com//w4fz652t1x5kge5l4xztnw4hq7sbnu1x//512x384.jpg"
              href="/categoria/cozinhar"
            />
            <CategoryCard
              title="Multiplayer"
              imageUrl="https://img.gamemonetize.com//458lt7ogtg7d3yoscko40xjq0cykodr6//512x384.jpg"
              href="/categoria/multiplayer"
            />
            <CategoryCard
              title=".io"
              imageUrl="https://img.gamemonetize.com/avdfpa7rynma1wxofv7mfg6iyh8trf07/512x384.jpg"
              href="/categoria/io"
            />
            <CategoryCard
              title="Esportes"
              imageUrl="https://img.gamemonetize.com//mvrcuqg8nkwbydhr8tspp4dhnedxn93q//512x384.jpg"
              href="/categoria/esportes"
            />
          </div>
        </section>

        {/* Seção Jogos Mais Populares - Página 2 */}
        <GameSection
          games={popularGames}
          title="Jogos Mais Populares"
          emoji="🔥"
          sectionId="popular"
          loading={sectionsLoading.popular}
          rotation={2}
        />

        <GameSection
          games={page3Games}
          title="Escolhas do Jogaly"
          emoji="⭐"
          sectionId="page3"
          loading={sectionsLoading.page3}
          rotation={-2}
        />
      </main>
      
      <Suspense fallback={
        <footer className="py-6 mt-20 animate-pulse">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-400 px-8 py-4 rounded-2xl h-12 w-24"></div>
                <div className="bg-gray-400 h-12 w-32 rounded"></div>
              </div>
              <div className="bg-gray-400 h-4 w-48 rounded"></div>
            </div>
          </div>
        </footer>
      }>
        <Footer />
      </Suspense>
    </div>
  )
} 