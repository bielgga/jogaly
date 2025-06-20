'use client'

import { memo } from 'react'

interface SectionSkeletonProps {
  title: string
  emoji: string
  gridCols: {
    mobile: number
    tablet: number
    desktop: number
  }
  itemCount: number
}

const SectionSkeleton = memo(function SectionSkeleton({ 
  title, 
  emoji, 
  gridCols, 
  itemCount 
}: SectionSkeletonProps) {
  // Gerar array de items apenas uma vez
  const items = Array.from({ length: itemCount }, (_, i) => i)
  
  return (
    <section className="mt-16" aria-label={`Carregando ${title}`}>
      {/* Título skeleton */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-gray-300 animate-pulse px-8 py-4 rounded-2xl h-16 w-80"></div>
        </div>
      </div>
      
      {/* Grid skeleton */}
      <div className="w-full">
        {/* Mobile */}
        <div className={`grid grid-cols-${gridCols.mobile} gap-2 sm:hidden`}>
          {items.slice(0, gridCols.mobile * 4).map((item) => (
            <div key={`mobile-${item}`} className="aspect-square bg-gray-300 animate-pulse rounded-2xl"></div>
          ))}
        </div>

        {/* Tablet */}
        <div className={`hidden sm:grid lg:hidden grid-cols-${gridCols.tablet} gap-3`}>
          {items.slice(0, gridCols.tablet * 3).map((item) => (
            <div key={`tablet-${item}`} className="aspect-square bg-gray-300 animate-pulse rounded-2xl"></div>
          ))}
        </div>

        {/* Desktop */}
        <div className={`hidden lg:grid grid-cols-${gridCols.desktop} gap-3`}>
          {items.map((item) => (
            <div key={`desktop-${item}`} className="aspect-square bg-gray-300 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default SectionSkeleton 