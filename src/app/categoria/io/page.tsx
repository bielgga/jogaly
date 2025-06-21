'use client'

import { useState, useEffect } from 'react'
import { gameService, GameListItem } from '@/lib/supabase'
import GameCard from '@/components/GameCard'
import Image from 'next/image'

export default function JogosIOPage() {
  const [games, setGames] = useState<GameListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadIOGames() {
      setLoading(true)
      setError(null)
      
      try {
        const gamesData = await gameService.getGamesByPage(9)
        const sortedGames = gamesData.sort((a, b) => b.likes - a.likes)
        setGames(sortedGames)
        
        if (gamesData.length === 0) {
          setError('Nenhum jogo IO encontrado.')
        }
      } catch (err) {
        console.error('Erro ao carregar jogos IO:', err)
        setError('Erro ao carregar jogos IO. Tente novamente mais tarde.')
      }
      
      setLoading(false)
    }
    
    loadIOGames()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          {/* Logo com animação */}
          <div className="mb-8">
            <div className="animate-bounce">
              <Image
                src="/logojogaly2.png"
                alt="Carregando Jogaly"
                width={400}
                height={120}
                className="h-32 w-auto mx-auto"
                priority
              />
            </div>
          </div>
          
          {/* Dots animados com efeito mais bonito */}
          <div className="flex justify-center items-center space-x-3">
            <div className="w-5 h-5 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="w-5 h-5 bg-white rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}></div>
            <div className="w-5 h-5 bg-purple-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-4">Erro ao Carregar Jogos</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-bold"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Título da página */}
      <div className="mb-12">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl">
              <span className="mr-3">🌐</span>
              Jogos IO
              <span className="ml-3">🌐</span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-300 mt-6 text-lg">
          Entre na arena online e domine o ranking! Jogos IO gratuitos com batalhas massivas, crescimento progressivo e competição global em tempo real.
        </p>
      </div>

      {/* Grid de jogos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {games.map((game, index) => (
          <div key={game.id} className="aspect-square">
            <GameCard game={game} priority={index < 12} />
          </div>
        ))}
      </div>


    </div>
  )
} 