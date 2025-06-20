'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GameListItem } from '@/lib/supabase'
import { useState, memo, useMemo, useCallback } from 'react'

interface GameCardProps {
  game: GameListItem
  priority?: boolean
}

// Componente de Skeleton otimizado
const GameCardSkeleton = memo(function GameCardSkeleton() {
  return (
    <div className="group relative h-full w-full rounded-2xl shadow-lg overflow-hidden border-[3px] border-white/25 bg-gray-300 animate-pulse">
      <div className="absolute inset-0 bg-gray-400"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute top-2 right-2 bg-gray-500 text-transparent px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg">
        <span>❤️</span>
        <span>000</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
        <div className="bg-gray-500 h-4 rounded mb-1"></div>
        <div className="bg-gray-500 h-3 rounded w-3/4"></div>
      </div>
    </div>
  )
})

const GameCard = memo(function GameCard({ game, priority = false }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Memoizar formatação de likes para evitar recálculos
  const formattedLikes = useMemo(() => {
    if (game.likes >= 1000000) {
      return `${(game.likes / 1000000).toFixed(1)}M`
    } else if (game.likes >= 1000) {
      return `${(game.likes / 1000).toFixed(1)}k`
    }
    return game.likes.toString()
  }, [game.likes])

  // Callbacks memoizados para evitar re-renders
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  // Memoizar href para evitar re-renders
  const gameHref = useMemo(() => `/game/${game.id}`, [game.id])

  if (!game) {
    return <GameCardSkeleton />
  }

  return (
    <Link href={gameHref} className="block h-full w-full">
      <article 
        className="group relative h-full w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden border-[3px] border-white/25"
        aria-label={`Jogar ${game.title}`}
      >
        {/* Skeleton enquanto carrega */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-400 animate-pulse"></div>
        )}

        {/* Imagem de fundo ocupando todo o card */}
        <div className="absolute inset-0">
          <Image
            src={game.thumb}
            alt={game.title}
            fill
            priority={priority}
            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 14vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Fallback para erro de imagem */}
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="text-4xl mb-2">🎮</div>
                <div className="text-xs font-bold">{game.title}</div>
              </div>
            </div>
          )}
        </div>

        {/* Overlay gradiente para o título */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Curtidas - Canto superior direito */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg">
          <span className="text-red-400" aria-hidden="true">❤️</span>
          <span>{formattedLikes}</span>
        </div>
        
        {/* Título do jogo */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <h3 className="font-bold text-white text-xs sm:text-sm text-center leading-tight drop-shadow-lg line-clamp-2">
            {game.title}
          </h3>
        </div>

        {/* Efeito de brilho animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </article>
    </Link>
  )
})

export default GameCard 