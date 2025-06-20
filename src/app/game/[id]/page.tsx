'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { gameService, Game } from '@/lib/supabase'
import Footer from '@/components/Footer'

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [relatedGames, setRelatedGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const viewIncrementedRef = useRef<string | null>(null)

  useEffect(() => {
    async function loadGame() {
    const gameId = params.id as string
      setLoading(true)
      setError(null)
      
      try {
        // Carregar jogo principal
        const gameData = await gameService.getGameById(gameId)
        
        if (!gameData) {
          setError('Jogo não encontrado')
          setLoading(false)
          return
        }
        
        setGame(gameData)
        
        // Incrementar visualizações apenas uma vez por jogo
        if (viewIncrementedRef.current !== gameId) {
          console.log('🔍 Incrementando visualização para jogo:', gameId)
          await gameService.incrementViews(gameId)
          viewIncrementedRef.current = gameId
          console.log('✅ Visualização incrementada para jogo:', gameId)
        } else {
          console.log('⏭️ Visualização já incrementada para jogo:', gameId)
        }
        
        // Carregar jogos relacionados (10 mais visualizados)
        const related = await gameService.getRelatedGames(gameId, gameData.category, 10)
        setRelatedGames(related)
        
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
            <div className="inline-flex items-center space-x-2">
              <div className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-2xl shadow-lg animate-bounce">
                Jogaly
              </div>
              <span className="text-2xl font-bold text-white animate-pulse">GAMES</span>
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
      <header className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/')}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
              >
                <span>← Voltar</span>
              </button>
              
              <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg transform -rotate-3">
              Jogaly
              </div>
              
              <h1 className="text-5xl font-bold text-white">GAMES</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Área do jogo - Esquerda (3 colunas) */}
          <div className="xl:col-span-3">
            {/* Container do jogo com título e visualizações */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
              {/* Header do jogo com título e visualizações */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">{game.title}</h1>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full">
                      <span className="text-blue-300 mr-2">👁️</span>
                      <span className="font-semibold text-sm sm:text-base">{game.views.toLocaleString()} visualizações</span>
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
                      className="flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-white/30"
                    >
                      <span className="text-red-400 mr-2">❤️</span>
                      <span className="font-semibold text-sm sm:text-base">{game.likes.toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Área do jogo */}
              <div className="relative aspect-video">
                <iframe
                  src={game.url}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  title={game.title}
                  allowFullScreen
                />
              </div>
            </div>

            {/* Jogos Mais Jogados */}
            {relatedGames.length > 0 && (
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🔥</span>
                  Jogos Mais Jogados
                </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {relatedGames.map((relatedGame) => (
                    <a
                      key={relatedGame.id}
                      href={`/game/${relatedGame.id}`}
                      className="group relative aspect-square rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden border-[3px] border-white/25"
                    >
                      <img
                        src={relatedGame.thumb}
                        alt={relatedGame.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Visualizações no jogo mais jogado */}
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <span className="text-blue-400">👁️</span>
                        <span>
                          {relatedGame.views >= 1000000 
                            ? `${(relatedGame.views / 1000000).toFixed(1)}M` 
                            : relatedGame.views >= 1000 
                            ? `${(relatedGame.views / 1000).toFixed(1)}k` 
                            : relatedGame.views}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">
                          {relatedGame.title}
                        </h3>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
            )}
          </div>

          {/* Informações do jogo - Direita (1 coluna) */}
          <div className="xl:col-span-1 space-y-6">
            {/* Descrição */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📝</span>
                Sobre o Jogo
              </h2>
              <p className="text-gray-700 leading-relaxed">{game.description}</p>
            </div>

            {/* Instruções */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Como Jogar
              </h2>
              <p className="text-gray-700 leading-relaxed">{game.instructions}</p>
            </div>


          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 