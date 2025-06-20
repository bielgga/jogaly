'use client'

import { useState, useEffect } from 'react'
import { gameService, Game } from '@/lib/supabase'
import GameCard from '@/components/GameCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

  useEffect(() => {
    async function loadGames() {
      setLoading(true)
      setError(null)
      
      try {
        // Carregar jogos da página 1
        const gamesData = await gameService.getAllGames()
        // Ordenar jogos por curtidas (do mais curtido para o menos curtido)
        const sortedGames = gamesData.sort((a, b) => b.likes - a.likes)
        setGames(sortedGames)
        setFilteredGames(sortedGames)
        
        // Carregar jogos da página 2 (Jogos Mais Populares)
        const popularGamesData = await gameService.getGamesByPage(2)
        const sortedPopularGames = popularGamesData.sort((a, b) => b.likes - a.likes)
        setPopularGames(sortedPopularGames)
        
        // Carregar jogos da página 3 (Escolhas do Jogaly)
        const page3GamesData = await gameService.getGamesByPage(3)
        const sortedPage3Games = page3GamesData.sort((a, b) => b.likes - a.likes)
        setPage3Games(sortedPage3Games)
        
        // Carregar jogos da página 4 (Jogos de Cozinhar)
        const cookingGamesData = await gameService.getGamesByPage(4)
        const sortedCookingGames = cookingGamesData.sort((a, b) => b.likes - a.likes)
        setCookingGames(sortedCookingGames)
        
        // Carregar jogos da página 5 (Jogos de Tiroteiro)
        const shootingGamesData = await gameService.getGamesByPage(5)
        const sortedShootingGames = shootingGamesData.sort((a, b) => b.likes - a.likes)
        setShootingGames(sortedShootingGames)
        
        // Carregar jogos da página 6 (Jogos de Corrida)
        const racingGamesData = await gameService.getGamesByPage(6)
        const sortedRacingGames = racingGamesData.sort((a, b) => b.likes - a.likes)
        setRacingGames(sortedRacingGames)
        
        // Carregar jogos da página 7 (Jogos de Quebra-cabeça)
        const puzzleGamesData = await gameService.getGamesByPage(7)
        const sortedPuzzleGames = puzzleGamesData.sort((a, b) => b.likes - a.likes)
        setPuzzleGames(sortedPuzzleGames)
        
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
        {/* Seção Principal - Jogos da Página 1 */}
        <div className="grid gap-3 sm:gap-4 mb-12">
          {/* Mobile: 2 colunas */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {filteredGames.map((game) => (
              <div key={game.id} className="aspect-square">
                <GameCard game={game} />
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
                <GameCard game={game} />
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
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>

        {/* Seção Jogos Mais Populares - Página 2 */}
        {popularGames.length > 0 && (
          <div className="mt-16">
            {/* Título com efeito especial */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <span className="mr-3">🔥</span>
                  Jogos Mais Populares
                  <span className="ml-3">🔥</span>
                </div>
              </div>
            </div>
            
            {/* Layout Criativo: 3 Colunas Perfeitas */}
            <div className="w-full">
              {/* Mobile: Layout simples */}
              <div className="grid grid-cols-2 gap-4 sm:hidden">
                {popularGames.slice(0, 8).map((game) => (
                  <div key={`popular-${game.id}`} className="aspect-square">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>

              {/* Tablet e Desktop: Layout 3 colunas bem distribuído */}
              <div className="hidden sm:grid grid-cols-6 gap-4 w-full">
                {/* LINHA 1 */}
                {/* Horizontal - Coluna 1 */}
                <div className="col-span-2 aspect-[2.1/1]">
                  <GameCard game={popularGames[0]} />
                </div>
                {/* Quadrado - Coluna 2 */}
                <div className="col-span-1 aspect-square">
                  <GameCard game={popularGames[1]} />
                </div>
                {/* Quadrado - Coluna 2 */}
                <div className="col-span-1 aspect-square">
                  <GameCard game={popularGames[2]} />
                </div>
                {/* Vertical - Coluna 3 (ocupa 2 linhas) */}
                <div className="col-span-1 row-span-2 aspect-[1/2.1]">
                  <GameCard game={popularGames[3]} />
                </div>
                {/* Quadrado - Coluna 3 */}
                <div className="col-span-1 aspect-square">
                  <GameCard game={popularGames[4]} />
                </div>

                {/* LINHA 2 */}
                {/* Quadrado - Coluna 1 */}
                <div className="col-span-1 aspect-square">
                  <GameCard game={popularGames[5]} />
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
        )}

        {/* Seção Escolhas do Jogaly - Página 3 */}
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

        {/* Seção Jogos de Tiroteiro - Página 5 */}
        {shootingGames.length > 0 && (
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
        )}

        {/* Seção Jogos de Corrida - Página 6 */}
        {racingGames.length > 0 && (
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
        )}

        {/* Seção Jogos de Quebra-cabeça - Página 7 */}
        {puzzleGames.length > 0 && (
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
        )}

        {/* Seção Jogos de Cozinhar - Página 4 */}
        {cookingGames.length > 0 && (
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
        )}
      </main>
      
      <Footer />
    </div>
  )
} 