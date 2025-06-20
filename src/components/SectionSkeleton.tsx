'use client'

interface SectionSkeletonProps {
  title: string
  emoji: string
  gridCols?: {
    mobile: number
    tablet: number
    desktop: number
  }
  itemCount?: number
}

export default function SectionSkeleton({ 
  title, 
  emoji, 
  gridCols = { mobile: 2, tablet: 6, desktop: 8 },
  itemCount = 12
}: SectionSkeletonProps) {
  return (
    <div className="mt-16">
      {/* Título da seção */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl">
            <span className="mr-3">{emoji}</span>
            {title}
            <span className="ml-3">{emoji}</span>
          </div>
        </div>
      </div>
      
      {/* Grid de skeletons */}
      <div className="w-full">
        {/* Mobile */}
        <div className={`grid grid-cols-${gridCols.mobile} gap-3 sm:hidden`}>
          {Array.from({ length: Math.ceil(itemCount / 2) }).map((_, index) => (
            <div key={`mobile-skeleton-${index}`} className="aspect-square">
              <div className="h-full w-full rounded-2xl bg-gray-300 animate-pulse border-[3px] border-white/25">
                <div className="relative h-full">
                  {/* Skeleton para imagem */}
                  <div className="absolute inset-0 bg-gray-400 rounded-2xl"></div>
                  
                  {/* Skeleton para curtidas */}
                  <div className="absolute top-2 right-2 bg-gray-500 px-2 py-1 rounded-full">
                    <div className="w-8 h-3 bg-gray-600 rounded"></div>
                  </div>
                  
                  {/* Skeleton para título */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="bg-gray-500 h-3 rounded mb-1"></div>
                    <div className="bg-gray-500 h-2 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet */}
        <div className={`hidden sm:grid lg:hidden grid-cols-${gridCols.tablet} gap-4`}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={`tablet-skeleton-${index}`} className="aspect-square">
              <div className="h-full w-full rounded-2xl bg-gray-300 animate-pulse border-[3px] border-white/25">
                <div className="relative h-full">
                  {/* Skeleton para imagem */}
                  <div className="absolute inset-0 bg-gray-400 rounded-2xl"></div>
                  
                  {/* Skeleton para curtidas */}
                  <div className="absolute top-2 right-2 bg-gray-500 px-2 py-1 rounded-full">
                    <div className="w-8 h-3 bg-gray-600 rounded"></div>
                  </div>
                  
                  {/* Skeleton para título */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="bg-gray-500 h-3 rounded mb-1"></div>
                    <div className="bg-gray-500 h-2 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className={`hidden lg:grid grid-cols-${gridCols.desktop} gap-4`}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={`desktop-skeleton-${index}`} className="aspect-square">
              <div className="h-full w-full rounded-2xl bg-gray-300 animate-pulse border-[3px] border-white/25">
                <div className="relative h-full">
                  {/* Skeleton para imagem */}
                  <div className="absolute inset-0 bg-gray-400 rounded-2xl"></div>
                  
                  {/* Skeleton para curtidas */}
                  <div className="absolute top-2 right-2 bg-gray-500 px-2 py-1 rounded-full">
                    <div className="w-8 h-3 bg-gray-600 rounded"></div>
                  </div>
                  
                  {/* Skeleton para título */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="bg-gray-500 h-3 rounded mb-1"></div>
                    <div className="bg-gray-500 h-2 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 