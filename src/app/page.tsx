'use client'

import { useState, useEffect, lazy, Suspense, useMemo, useCallback, memo } from 'react'
import dynamic from 'next/dynamic'
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

// Componente principal otimizado
export default function Home() {
  const [games, setGames] = useState<GameListItem[]>([])
  const [popularGames, setPopularGames] = useState<GameListItem[]>([])
  const [page3Games, setPage3Games] = useState<GameListItem[]>([])
  const [cookingGames, setCookingGames] = useState<GameListItem[]>([])
  const [shootingGames, setShootingGames] = useState<GameListItem[]>([])
  const [racingGames, setRacingGames] = useState<GameListItem[]>([])
  const [puzzleGames, setPuzzleGames] = useState<GameListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para controlar loading das seções
  const [sectionsLoading, setSectionsLoading] = useState({
    popular: true,
    page3: true,
    cooking: true,
    shooting: true,
    racing: true,
    puzzle: true
  })

  // Memoizar jogos filtrados e ordenados
  const filteredGames = useMemo(() => {
    return games.sort((a, b) => b.likes - a.likes)
  }, [games])

  // Callback memoizado para carregar seções com otimização de performance
  const loadSections = useCallback(async () => {
    try {
      // Carregar seções em batches para reduzir blocking
      const loadBatch1 = async () => {
        const [popularGamesData, page3GamesData] = await Promise.all([
          gameService.getGamesByPage(2),
          gameService.getGamesByPage(3),
        ])
        
        setPopularGames(popularGamesData.sort((a, b) => b.likes - a.likes))
        setPage3Games(page3GamesData.sort((a, b) => b.likes - a.likes))
        setSectionsLoading(prev => ({ ...prev, popular: false, page3: false }))
      }

      const loadBatch2 = async () => {
        const [shootingGamesData, racingGamesData] = await Promise.all([
          gameService.getGamesByPage(5),
          gameService.getGamesByPage(6),
        ])
        
        setShootingGames(shootingGamesData.sort((a, b) => b.likes - a.likes))
        setRacingGames(racingGamesData.sort((a, b) => b.likes - a.likes))
        setSectionsLoading(prev => ({ ...prev, shooting: false, racing: false }))
      }

      const loadBatch3 = async () => {
        const [cookingGamesData, puzzleGamesData] = await Promise.all([
          gameService.getGamesByPage(4),
          gameService.getGamesByPage(7),
        ])
        
        setCookingGames(cookingGamesData.sort((a, b) => b.likes - a.likes))
        setPuzzleGames(puzzleGamesData.sort((a, b) => b.likes - a.likes))
        setSectionsLoading(prev => ({ ...prev, cooking: false, puzzle: false }))
      }

      // Executar batches com delays para otimizar performance
      await loadBatch1()
      
      // Usar requestIdleCallback para as próximas seções
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadBatch2(), { timeout: 3000 })
        window.requestIdleCallback(() => loadBatch3(), { timeout: 5000 })
      } else {
        setTimeout(loadBatch2, 100)
        setTimeout(loadBatch3, 200)
      }
      
    } catch (err) {
      console.error('Erro ao carregar seções adicionais:', err)
      setSectionsLoading({
        popular: false,
        page3: false,
        cooking: false,
        shooting: false,
        racing: false,
        puzzle: false
      })
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
          <div className="inline-flex items-center space-x-3">
            <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg animate-bounce" style={{ transform: 'rotate(-5deg)' }}>
              Jogaly
            </div>
            <span className="text-5xl font-bold text-white animate-pulse">GAMES</span>
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título principal da página - visualmente oculto mas semanticamente correto */}
        <h1 className="sr-only">Jogos Online Grátis - Jogaly Games</h1>
        
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

        {/* Seção Jogos Mais Populares - Página 2 */}
        {sectionsLoading.popular ? (
          <SectionSkeleton 
            title="Jogos Mais Populares" 
            emoji="🔥"
            gridCols={{ mobile: 2, tablet: 6, desktop: 6 }}
            itemCount={23}
          />
        ) : popularGames.length > 0 && (
          <section aria-labelledby="popular-games-heading">
            <div className="mt-16">
              {/* Título com efeito especial */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
                </div>
                <div className="relative flex justify-center">
                  <h2 id="popular-games-heading" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl hover:rotate-0 transition-transform duration-300">
                    <span className="mr-3">🔥</span>
                    Jogos Mais Populares
                    <span className="ml-3">🔥</span>
                  </h2>
                </div>
              </div>
              
              {/* Layout Criativo: 3 Colunas Perfeitas */}
              <div className="w-full">
                {/* Mobile: Layout simples */}
                <div className="grid grid-cols-2 gap-4 sm:hidden">
                  {popularGames.slice(0, 8).map((game, index) => (
                    <div key={`popular-${game.id}`} className="aspect-square">
                      <GameCard game={game} priority={index < 4} />
                    </div>
                  ))}
                </div>

                {/* Tablet e Desktop: Layout 3 colunas bem distribuído */}
                <div className="hidden sm:grid grid-cols-6 gap-4 w-full">
                  {/* LINHA 1 */}
                  {/* Horizontal - Coluna 1 */}
                  <div className="col-span-2 aspect-[2.1/1]">
                    <GameCard game={popularGames[0]} priority={true} />
                  </div>
                  {/* Quadrado - Coluna 2 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[1]} priority={true} />
                  </div>
                  {/* Quadrado - Coluna 2 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[2]} priority={true} />
                  </div>
                  {/* Vertical - Coluna 3 (ocupa 2 linhas) */}
                  <div className="col-span-1 row-span-2 aspect-[1/2.1]">
                    <GameCard game={popularGames[3]} priority={true} />
                  </div>
                  {/* Quadrado - Coluna 3 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[4]} priority={true} />
                  </div>

                  {/* LINHA 2 */}
                  {/* Quadrado - Coluna 1 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[5]} priority={true} />
                  </div>
                  {/* Quadrado - Coluna 1 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[6]} />
                  </div>
                  {/* Horizontal - Coluna 2 */}
                  <div className="col-span-2 aspect-[2.1/1]">
                    <GameCard game={popularGames[7]} />
                  </div>
                  {/* Quadrado - Coluna 3 (complemento do vertical da linha 1) */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[8]} />
                  </div>

                  {/* LINHA 3 */}
                  {/* Vertical - Coluna 1 (ocupa 2 linhas) */}
                  <div className="col-span-1 row-span-2 aspect-[1/2.1]">
                    <GameCard game={popularGames[9]} />
                  </div>
                  {/* Quadrado - Coluna 1 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[10]} />
                  </div>
                  {/* Quadrado - Coluna 2 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[11]} />
                  </div>
                  {/* Quadrado - Coluna 2 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[12]} />
                  </div>
                  {/* Horizontal - Coluna 3 */}
                  <div className="col-span-2 aspect-[2.1/1]">
                    <GameCard game={popularGames[13]} />
                  </div>

                  {/* LINHA 4 */}
                  {/* Quadrado - Coluna 1 (complemento do vertical da linha 3) */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[14]} />
                  </div>
                  {/* Vertical - Coluna 2 (ocupa 2 linhas) */}
                  <div className="col-span-1 row-span-2 aspect-[1/2.1]">
                    <GameCard game={popularGames[15]} />
                  </div>
                  {/* Quadrado - Coluna 2 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[16]} />
                  </div>
                  {/* Quadrado - Coluna 3 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[17]} />
                  </div>
                  {/* Quadrado - Coluna 3 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[18]} />
                  </div>

                  {/* LINHA 5 */}
                  {/* Horizontal - Coluna 1 */}
                  <div className="col-span-2 aspect-[2.1/1]">
                    <GameCard game={popularGames[19]} />
                  </div>
                  {/* Quadrado - Coluna 2 (complemento do vertical da linha 4) */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[20]} />
                  </div>
                  {/* Quadrado - Coluna 3 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[21]} />
                  </div>
                  {/* Quadrado - Coluna 3 */}
                  <div className="col-span-1 aspect-square">
                    <GameCard game={popularGames[22]} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Usar componentes memoizados para as outras seções */}
        <GameSection
          games={page3Games}
          title="Escolhas do Jogaly"
          emoji="⭐"
          sectionId="page3"
          loading={sectionsLoading.page3}
          rotation={-2}
        />

        <GameSection
          games={shootingGames}
          title="Jogos de Tiroteiro"
          emoji="🎯"
          sectionId="shooting"
          loading={sectionsLoading.shooting}
          rotation={2}
        />

        <GameSection
          games={racingGames}
          title="Jogos de Corrida"
          emoji="🏎️"
          sectionId="racing"
          loading={sectionsLoading.racing}
          rotation={-2}
        />

        <GameSection
          games={puzzleGames}
          title="Jogos de Quebra-Cabeça"
          emoji="🧩"
          sectionId="puzzle"
          loading={sectionsLoading.puzzle}
          rotation={2}
        />

        <GameSection
          games={cookingGames}
          title="Jogos de Cozinhar"
          emoji="👨‍🍳"
          sectionId="cooking"
          loading={sectionsLoading.cooking}
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