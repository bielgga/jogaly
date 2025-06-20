'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { gameService, Game } from '@/lib/supabase'
import Footer from '@/components/Footer'

// Lazy load do componente de jogos relacionados
const RelatedGames = lazy(() => import('./RelatedGames'))

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
        
        // Carregar jogos relacionados de forma assíncrona (não bloquear a renderização)
        setTimeout(async () => {
          const related = await gameService.getRelatedGames(gameId, gameData.category, 10)
          setRelatedGames(related)
        }, 100)
        
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
      {/* Header simplificado inline */}
      <header className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg transform -rotate-3">
              Jogaly
              </div>
              <div className="text-5xl font-bold text-white">GAMES</div>
            </div>

            {/* Espaço vazio para equilibrar o layout */}
            <div className="w-12"></div>
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
                  loading="lazy"
                />
              </div>
            </div>

            {/* Jogos Relacionados com Lazy Loading */}
            <Suspense fallback={
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">🔥</span>
                  Jogos Mais Jogados
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-300 animate-pulse rounded-2xl"></div>
                  ))}
                </div>
              </div>
            }>
              <RelatedGames games={relatedGames} />
            </Suspense>
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