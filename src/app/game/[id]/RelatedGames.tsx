'use client'

import Image from 'next/image'
import { Game } from '@/lib/supabase'

interface RelatedGamesProps {
  games: Game[]
}

export default function RelatedGames({ games }: RelatedGamesProps) {
  if (games.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3">🔥</span>
        Jogos Mais Jogados
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {games.map((relatedGame) => (
          <a
            key={relatedGame.id}
            href={`/game/${relatedGame.id}`}
            className="group relative aspect-square rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden border-[3px] border-white/25"
          >
            <Image
              src={relatedGame.thumb}
              alt={relatedGame.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
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
  )
} 