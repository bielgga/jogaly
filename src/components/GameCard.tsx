'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@/lib/supabase'

interface GameCardProps {
  game: Game
  priority?: boolean
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="block h-full w-full">
      <div 
        className="group relative h-full w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden border-[3px] border-white/25"
      >
      {/* Imagem de fundo ocupando todo o card */}
      <div className="absolute inset-0">
        <Image
          src={game.thumb}
          alt={game.title}
          fill
          priority={priority}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 14vw"
        />
      </div>

      {/* Overlay gradiente para o título */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Curtidas - Canto superior direito */}
      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg">
        <span className="text-red-400">❤️</span>
        <span>
          {game.likes >= 1000000 
            ? `${(game.likes / 1000000).toFixed(1)}M` 
            : game.likes >= 1000 
            ? `${(game.likes / 1000).toFixed(1)}k` 
            : game.likes}
        </span>
      </div>
      
      {/* Título do jogo */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
        <h3 className="font-bold text-white text-xs sm:text-sm text-center leading-tight drop-shadow-lg line-clamp-2">
          {game.title}
        </h3>
      </div>

      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>
    </Link>
  )
} 