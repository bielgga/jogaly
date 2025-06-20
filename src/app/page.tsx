'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { gameService, Game } from '@/lib/supabase'
import GameCard from '@/components/GameCard'
import Header from '@/components/Header'
import SectionSkeleton from '@/components/SectionSkeleton'

// Lazy load do Footer para reduzir bundle inicial
const Footer = lazy(() => import('@/components/Footer'))

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [popularGames, setPopularGames] = useState<Game[]>([])
  const [page3Games, setPage3Games] = useState<Game[]>([])
  const [cookingGames, setCookingGames] = useState<Game[]>([])
  const [shootingGames, setShootingGames] = useState<Game[]>([])
  const [racingGames, setRacingGames] = useState<Game[]>([])
  const [puzzleGames, setPuzzleGames] = useState<Game[]>([])
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

  useEffect(() => {
    async function loadGames() {
      setLoading(true)
      setError(null)
      
      try {
        // Carregar jogos da página 1 primeiro (crítico)
        const gamesData = await gameService.getAllGames()
        const sortedGames = gamesData.sort((a, b) => b.likes - a.likes)
        setGames(sortedGames)
        setFilteredGames(sortedGames)
        
        // Carregar outras seções de forma assíncrona (não crítico)
        // Usar requestIdleCallback se disponível para melhor performance
        const loadSections = () => {
          Promise.all([
            gameService.getGamesByPage(2),
            gameService.getGamesByPage(3),
            gameService.getGamesByPage(4),
            gameService.getGamesByPage(5),
            gameService.getGamesByPage(6),
            gameService.getGamesByPage(7)
          ]).then(([
            popularGamesData,
            page3GamesData,
            cookingGamesData,
            shootingGamesData,
            racingGamesData,
            puzzleGamesData
          ]) => {
            // Atualizar seções uma por vez para reduzir layout shifts
            setPopularGames(popularGamesData.sort((a, b) => b.likes - a.likes))
            setSectionsLoading(prev => ({ ...prev, popular: false }))
            
            setTimeout(() => {
              setPage3Games(page3GamesData.sort((a, b) => b.likes - a.likes))
              setSectionsLoading(prev => ({ ...prev, page3: false }))
            }, 100)
            
            setTimeout(() => {
              setShootingGames(shootingGamesData.sort((a, b) => b.likes - a.likes))
              setSectionsLoading(prev => ({ ...prev, shooting: false }))
            }, 200)
            
            setTimeout(() => {
              setRacingGames(racingGamesData.sort((a, b) => b.likes - a.likes))
              setSectionsLoading(prev => ({ ...prev, racing: false }))
            }, 300)
            
            setTimeout(() => {
              setPuzzleGames(puzzleGamesData.sort((a, b) => b.likes - a.likes))
              setSectionsLoading(prev => ({ ...prev, puzzle: false }))
            }, 400)
            
            setTimeout(() => {
              setCookingGames(cookingGamesData.sort((a, b) => b.likes - a.likes))
              setSectionsLoading(prev => ({ ...prev, cooking: false }))
            }, 500)
          }).catch(err => {
            console.error('Erro ao carregar seções adicionais:', err)
            // Em caso de erro, remover os skeletons
            setSectionsLoading({
              popular: false,
              page3: false,
              cooking: false,
              shooting: false,
              racing: false,
              puzzle: false
            })
          })
        }

        // Usar requestIdleCallback se disponível, senão setTimeout
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(loadSections)
        } else {
          setTimeout(loadSections, 100)
        }
        
        if (gamesData.length === 0) {
          setError('Nenhum jogo encontrado. Execute o script de população do banco de dados.')
        }
        
      } catch (err) {
        console.error('Erro ao carregar jogos:', err)
        setError('Erro ao carregar jogos. Verifique se o Supabase está configurado corretamente.')
      }
      
      setLoading(false)
    }
    
    loadGames()
  }, [])

  useEffect(() => {
    // Manter a ordenação por curtidas ao filtrar
    const sortedGames = games.sort((a, b) => b.likes - a.likes)
    setFilteredGames(sortedGames)
  }, [games])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Logo com animação */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3">
              <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg transform -rotate-2 animate-bounce">
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
    )
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
                  <h2 id="popular-games-heading" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
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

        {/* Seção Escolhas do Jogaly - Página 3 */}
        {sectionsLoading.page3 ? (
          <SectionSkeleton 
            title="Escolhas do Jogaly" 
            emoji="⭐"
            gridCols={{ mobile: 3, tablet: 6, desktop: 8 }}
            itemCount={24}
          />
        ) : (
          <section aria-labelledby="jogaly-picks-heading">
            <h2 id="jogaly-picks-heading" className="sr-only">Escolhas do Jogaly</h2>
            <div className="mt-16">
              {/* Título */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <span className="mr-3">⭐</span>
                    Escolhas do Jogaly
                    <span className="ml-3">⭐</span>
                  </div>
                </div>
              </div>
              
              {/* Grid de Jogos da Página 3 */}
              <div className="w-full">
                {/* Mobile: 3 colunas */}
                <div className="grid grid-cols-3 gap-3 sm:hidden">
                  {page3Games.slice(0, 12).map((game) => (
                    <div key={`page3-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Tablet: 6 colunas */}
                <div className="hidden sm:grid lg:hidden grid-cols-6 gap-4">
                  {page3Games.slice(0, 18).map((game) => (
                    <div key={`page3-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Desktop: 8 colunas */}
                <div className="hidden lg:grid grid-cols-8 gap-4">
                  {page3Games.map((game) => (
                    <div key={`page3-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Seção Jogos de Tiroteiro - Página 5 */}
        {sectionsLoading.shooting ? (
          <SectionSkeleton 
            title="Jogos de Tiroteiro" 
            emoji="🎯"
            gridCols={{ mobile: 3, tablet: 6, desktop: 8 }}
            itemCount={16}
          />
        ) : shootingGames.length > 0 && (
          <section aria-labelledby="shooting-games-heading">
            <h2 id="shooting-games-heading" className="sr-only">Jogos de Tiroteiro</h2>
            <div className="mt-16">
              {/* Título com tema de tiro */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <span className="mr-3">🎯</span>
                    Jogos de Tiroteiro
                    <span className="ml-3">🔫</span>
                  </div>
                </div>
              </div>
              
              {/* Grid uniforme - todos os jogos do mesmo tamanho */}
              <div className="w-full">
                {/* Mobile: 3 colunas menores */}
                <div className="grid grid-cols-3 gap-2 sm:hidden">
                  {shootingGames.map((game) => (
                    <div key={`shooting-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Tablet: 6 colunas menores */}
                <div className="hidden sm:grid lg:hidden grid-cols-6 gap-3">
                  {shootingGames.map((game) => (
                    <div key={`shooting-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Desktop: 8 colunas menores */}
                <div className="hidden lg:grid grid-cols-8 gap-3">
                  {shootingGames.map((game) => (
                    <div key={`shooting-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Seção Jogos de Corrida - Página 6 */}
        {sectionsLoading.racing ? (
          <SectionSkeleton 
            title="Jogos de Corrida" 
            emoji="🏎️"
            gridCols={{ mobile: 3, tablet: 6, desktop: 8 }}
            itemCount={12}
          />
        ) : racingGames.length > 0 && (
          <section aria-labelledby="racing-games-heading">
            <h2 id="racing-games-heading" className="sr-only">Jogos de Corrida</h2>
            <div className="mt-16">
              {/* Título com tema de corrida */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <span className="mr-3">🏎️</span>
                    Jogos de Corrida
                    <span className="ml-3">🏁</span>
                  </div>
                </div>
              </div>
              
              {/* Grid uniforme - todos os jogos do mesmo tamanho */}
              <div className="w-full">
                {/* Mobile: 3 colunas menores */}
                <div className="grid grid-cols-3 gap-2 sm:hidden">
                  {racingGames.map((game) => (
                    <div key={`racing-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Tablet: 6 colunas menores */}
                <div className="hidden sm:grid lg:hidden grid-cols-6 gap-3">
                  {racingGames.map((game) => (
                    <div key={`racing-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Desktop: 8 colunas menores */}
                <div className="hidden lg:grid grid-cols-8 gap-3">
                  {racingGames.map((game) => (
                    <div key={`racing-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Seção Jogos de Quebra-cabeça - Página 7 */}
        {sectionsLoading.puzzle ? (
          <SectionSkeleton 
            title="Jogos de Quebra-Cabeça" 
            emoji="🧩"
            gridCols={{ mobile: 3, tablet: 6, desktop: 8 }}
            itemCount={16}
          />
        ) : puzzleGames.length > 0 && (
          <section aria-labelledby="puzzle-games-heading">
            <h2 id="puzzle-games-heading" className="sr-only">Jogos de Quebra-Cabeça</h2>
            <div className="mt-16">
              {/* Título com tema de puzzle */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <span className="mr-3">🧩</span>
                    Jogos de Quebra-Cabeça
                    <span className="ml-3">🔍</span>
                  </div>
                </div>
              </div>
              
              {/* Grid uniforme - todos os jogos do mesmo tamanho */}
              <div className="w-full">
                {/* Mobile: 3 colunas menores */}
                <div className="grid grid-cols-3 gap-2 sm:hidden">
                  {puzzleGames.map((game) => (
                    <div key={`puzzle-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Tablet: 6 colunas menores */}
                <div className="hidden sm:grid lg:hidden grid-cols-6 gap-3">
                  {puzzleGames.map((game) => (
                    <div key={`puzzle-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Desktop: 8 colunas menores */}
                <div className="hidden lg:grid grid-cols-8 gap-3">
                  {puzzleGames.map((game) => (
                    <div key={`puzzle-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Seção Jogos de Cozinhar - Página 4 */}
        {sectionsLoading.cooking ? (
          <SectionSkeleton 
            title="Jogos de Cozinhar" 
            emoji="👨‍🍳"
            gridCols={{ mobile: 3, tablet: 6, desktop: 8 }}
            itemCount={12}
          />
        ) : cookingGames.length > 0 && (
          <section aria-labelledby="cooking-games-heading">
            <h2 id="cooking-games-heading" className="sr-only">Jogos de Cozinhar</h2>
            <div className="mt-16">
              {/* Título com tema culinário */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-50"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <span className="mr-3">👨‍🍳</span>
                    Jogos de Cozinhar
                    <span className="ml-3">🍳</span>
                  </div>
                </div>
              </div>
              
              {/* Grid uniforme - todos os jogos do mesmo tamanho */}
              <div className="w-full">
                {/* Mobile: 3 colunas menores */}
                <div className="grid grid-cols-3 gap-2 sm:hidden">
                  {cookingGames.map((game) => (
                    <div key={`cooking-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Tablet: 6 colunas menores */}
                <div className="hidden sm:grid lg:hidden grid-cols-6 gap-3">
                  {cookingGames.map((game) => (
                    <div key={`cooking-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Desktop: 8 colunas menores */}
                <div className="hidden lg:grid grid-cols-8 gap-3">
                  {cookingGames.map((game) => (
                    <div key={`cooking-${game.id}`} className="aspect-square">
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
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