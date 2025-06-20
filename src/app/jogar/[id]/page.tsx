'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { gameService, Game, GameListItem } from '@/lib/supabase'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [mostViewedGames, setMostViewedGames] = useState<GameListItem[]>([])
  const [allGames, setAllGames] = useState<GameListItem[]>([])
  const [moreGames, setMoreGames] = useState<GameListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const viewIncrementedRef = useRef<string | null>(null)

  useEffect(() => {
    async function loadGame() {
      const gameId = params.id as string
      setLoading(true)
      setError(null)
      
      try {
        // Carregar jogo principal e todos os jogos ordenados por views
        const [gameData, allGamesData] = await Promise.all([
          gameService.getGameById(gameId),
          gameService.getAllGamesAllPages()
        ])
        
        if (!gameData) {
          setError('Jogo não encontrado')
          setLoading(false)
          return
        }
        
        setGame(gameData)
        
        // Filtrar o jogo atual e ordenar por views (mais jogados)
        const filteredGames = allGamesData
          .filter(g => g.id !== gameId)
          .sort((a, b) => b.views - a.views)
        
        // Top 3 mais jogados
        setMostViewedGames(filteredGames.slice(0, 3))
        
        // Próximos 28 mais jogados para a sidebar
        setAllGames(filteredGames.slice(3, 31))
        
        // Próximos 100 mais jogados para a seção embaixo
        setMoreGames(filteredGames.slice(31, 131))
        
        // Incrementar visualizações apenas uma vez por jogo
        if (viewIncrementedRef.current !== gameId) {
          console.log('🔍 Incrementando visualização para jogo:', gameId)
          await gameService.incrementViews(gameId)
          viewIncrementedRef.current = gameId
          console.log('✅ Visualização incrementada para jogo:', gameId)
        } else {
          console.log('⏭️ Visualização já incrementada para jogo:', gameId)
        }
        
      } catch (err) {
        console.error('Erro ao carregar jogo:', err)
        setError('Erro ao carregar jogo')
      }
      
      setLoading(false)
    }
    
    loadGame()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Logo com animação */}
          <div className="mb-8">
            <div className="animate-bounce">
              <Image
                src="/logojogaly2.png"
                alt="Carregando Jogaly"
                width={300}
                height={90}
                className="h-24 w-auto"
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
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{error || 'Jogo não encontrado'}</h2>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Voltar aos Jogos
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header simplificado inline */}
      <header className="py-6">
        <div className="container mx-auto px-4 pt-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Botão Home - Ícone de casinha */}
            <button
              onClick={() => router.push('/')}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              title="Voltar para Home"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path 
                  d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Logo Central */}
            <div className="flex items-center">
              <Image
                src="/logojogaly2.png"
                alt="Jogaly"
                width={300}
                height={90}
                className="h-24 w-auto"
                priority
              />
            </div>

            {/* Espaço vazio para equilibrar o layout */}
            <div className="w-12"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-2 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Área principal do jogo - Esquerda (3 colunas) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Container do iframe */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              <div className="relative aspect-video">
                <iframe
                  src={game.url}
                  className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl"
                  title={game.title}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Título e descrição juntos */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-6">
              {/* Título com estatísticas */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-white">{game.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-blue-500/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full border border-blue-400/30">
                    <span className="text-blue-400 mr-2">👁️</span>
                    <span className="font-semibold">{game.views.toLocaleString()} visualizações</span>
                  </div>
                  <button
                    onClick={async () => {
                      // Atualizar imediatamente na interface (otimistic update)
                      setGame(prev => prev ? {...prev, likes: prev.likes + 1} : null)
                      
                      // Tentar atualizar no servidor
                      const newLikes = await gameService.incrementLikes(game.id)
                      if (newLikes !== null) {
                        // Se o servidor retornou um valor, usar o valor correto
                        setGame(prev => prev ? {...prev, likes: newLikes} : null)
                      } else {
                        // Se houve erro, reverter a mudança otimista
                        setGame(prev => prev ? {...prev, likes: prev.likes - 1} : null)
                      }
                    }}
                    className="flex items-center bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-2 rounded-full border border-red-400/30 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-red-500/30"
                  >
                    <span className="text-red-400 mr-2">❤️</span>
                    <span className="font-semibold">{game.likes.toLocaleString()}</span>
                  </button>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">📝</span>
                  Sobre o Jogo
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">{game.description}</p>
              </div>

              {/* Instruções */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-3">🎯</span>
                  Como Jogar
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">{game.instructions}</p>
              </div>
            </div>
          </div>

          {/* Jogos mais jogados - Direita (1 coluna) */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-8 space-y-8">
              {/* Top 3 Jogos Mais Jogados */}
              <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🔥</span>
                  Top Jogos Mais Jogados
                </h2>
                
                {mostViewedGames.length > 0 ? (
                  <div className="space-y-4">
                    {mostViewedGames.map((mostViewedGame, index) => (
                      <a
                        key={mostViewedGame.id}
                        href={`/jogar/${mostViewedGame.id}`}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20 hover:shadow-lg backdrop-blur-sm"
                      >
                        {/* Posição */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                          {index + 1}
                        </div>
                        
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                          <Image
                            src={mostViewedGame.thumb}
                            alt={mostViewedGame.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-200"
                            sizes="64px"
                          />
                        </div>
                        
                        {/* Informações */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 group-hover:text-yellow-400 transition-colors">
                            {mostViewedGame.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center text-xs text-gray-400">
                              <span className="text-blue-400 mr-1">👁️</span>
                              <span>
                                {mostViewedGame.views >= 1000000 
                                  ? `${(mostViewedGame.views / 1000000).toFixed(1)}M` 
                                  : mostViewedGame.views >= 1000 
                                  ? `${(mostViewedGame.views / 1000).toFixed(1)}k` 
                                  : mostViewedGame.views}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                              <span className="text-red-400 mr-1">❤️</span>
                              <span>
                                {mostViewedGame.likes >= 1000 
                                  ? `${(mostViewedGame.likes / 1000).toFixed(1)}k` 
                                  : mostViewedGame.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-10 h-10 bg-white/10 animate-pulse rounded-full"></div>
                        <div className="w-16 h-16 bg-white/10 animate-pulse rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-white/10 animate-pulse rounded"></div>
                          <div className="h-3 bg-white/10 animate-pulse rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mais Jogos - Ícones Pequenos */}
              <div>
                
                {allGames.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3">
                    {allGames.map((gameItem) => (
                      <a
                        key={gameItem.id}
                        href={`/jogar/${gameItem.id}`}
                        className="group relative aspect-square rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer hover:scale-105"
                        title={gameItem.title}
                      >
                        <Image
                          src={gameItem.thumb}
                          alt={gameItem.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-200"
                          sizes="80px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(28)].map((_, i) => (
                      <div key={i} className="aspect-square bg-white/10 animate-pulse rounded-lg border border-white/10"></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nova seção com 100 jogos - Embaixo de tudo */}
        <div className="mt-12">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🎯</span>
              Descubra Mais Jogos
            </h2>
            
            {moreGames.length > 0 ? (
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-3">
                {moreGames.map((gameItem) => (
                  <a
                    key={gameItem.id}
                    href={`/jogar/${gameItem.id}`}
                    className="group relative aspect-square rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer hover:scale-105"
                    title={gameItem.title}
                  >
                    <Image
                      src={gameItem.thumb}
                      alt={gameItem.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-200"
                      sizes="(max-width: 640px) 16vw, (max-width: 768px) 12vw, (max-width: 1024px) 10vw, 10vw"
                      quality={90}
                      priority={false}
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-3">
                {[...Array(100)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/10 animate-pulse rounded-lg border border-white/10"></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 