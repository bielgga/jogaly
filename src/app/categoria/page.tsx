'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Componente para Card de Categoria - Usando o mesmo estilo da home
const CategoryCard = ({ 
  title, 
  imageUrl, 
  href,
  description
}: {
  title: string
  imageUrl: string
  href: string
  description: string
}) => {
  return (
    <Link href={href} className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 border border-white/10 hover:border-yellow-400/50 shadow-lg hover:shadow-2xl">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500"></div>
      </div>
      
      {/* Efeito de partículas */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400/80 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-orange-400/80 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-yellow-300/80 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-orange-300/80 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-yellow-500/80 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-orange-500/80 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        
        {/* Efeito de brilho */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-400/20 animate-pulse"></div>
      </div>
      
      {/* Conteúdo do card */}
      <div className="relative p-6 h-full flex flex-col justify-between min-h-[280px]">
        {/* Título */}
        <div>
          <h3 className="text-white font-bold text-xl mb-3 drop-shadow-2xl group-hover:text-yellow-300 transition-colors duration-300">
            {title}
          </h3>
          
          {/* Descrição */}
          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
            {description}
          </p>
        </div>
        
        {/* Seta indicativa */}
        <div className="flex justify-end mt-4">
          <div className="bg-yellow-400/20 backdrop-blur-sm text-yellow-400 p-2 rounded-full group-hover:bg-yellow-400/30 group-hover:scale-110 transition-all duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Borda animada */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/30 rounded-2xl transition-all duration-300"></div>
    </Link>
  )
}

export default function CategoriasPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Dados das categorias - usando as mesmas imagens da home
  const categories = [
    {
      title: 'Jogos de Tiro',
      imageUrl: 'https://img.gamemonetize.com//z3ns6gvgxik7pb9l1jhfvvkg964ewpxl//512x384.jpg',
      href: '/categoria/tiro',
      description: 'Mire, atire e acerte o alvo! Ação intensa e precisão milimétrica com os melhores jogos de tiro online.'
    },
    {
      title: 'Jogos de Corrida',
      imageUrl: 'https://img.gamemonetize.com/whsoq6n1ply6s1k4lbjfnwaozsjb26t5/512x384.jpg',
      href: '/categoria/corrida',
      description: 'Acelere ao máximo! Carros, motos e velocidade extrema em pistas desafiadoras e emocionantes.'
    },
    {
      title: 'Quebra-Cabeças',
      imageUrl: 'https://img.gamemonetize.com//5pqlhiolbr13mi1heq05z1rkzfv8jw8y//512x384.jpg',
      href: '/categoria/quebra-cabeca',
      description: 'Desafie sua mente com puzzles inteligentes e criativos que testam sua lógica e raciocínio.'
    },
    {
      title: 'Jogos de Cozinhar',
      imageUrl: 'https://img.gamemonetize.com//w4fz652t1x5kge5l4xztnw4hq7sbnu1x//512x384.jpg',
      href: '/categoria/cozinhar',
      description: 'Seja o chef! Cozinhe pratos deliciosos, gerencie restaurantes e conquiste clientes exigentes.'
    },
    {
      title: 'Jogos de Esportes',
      imageUrl: 'https://img.gamemonetize.com//mvrcuqg8nkwbydhr8tspp4dhnedxn93q//512x384.jpg',
      href: '/categoria/esportes',
      description: 'Futebol, basquete, tênis e muito mais! Entre em campo e mostre suas habilidades esportivas.'
    },
    {
      title: 'Jogos Multiplayer',
      imageUrl: 'https://img.gamemonetize.com//458lt7ogtg7d3yoscko40xjq0cykodr6//512x384.jpg',
      href: '/categoria/multiplayer',
      description: 'Jogue com amigos! Diversão garantida em grupo com os melhores jogos multijogador online.'
    },
    {
      title: 'Jogos IO',
      imageUrl: 'https://img.gamemonetize.com/avdfpa7rynma1wxofv7mfg6iyh8trf07/512x384.jpg',
      href: '/categoria/io',
      description: 'Batalhas online épicas! Cresça, evolua e domine em arenas competitivas contra jogadores reais.'
    }
  ]

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
          
          {/* Dots animados */}
          <div className="flex justify-center items-center space-x-3">
            <div className="w-5 h-5 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="w-5 h-5 bg-white rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}></div>
            <div className="w-5 h-5 bg-yellow-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}></div>
          </div>
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
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-3xl shadow-2xl hover:rotate-1 transition-transform duration-300">
              <span className="mr-3">📂</span>
              Categorias de Jogos
              <span className="ml-3">📂</span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-300 mt-6 text-lg max-w-3xl mx-auto">
          Explore nossa incrível coleção de jogos organizados por categorias. Encontre exatamente o tipo de diversão que você está procurando e mergulhe em aventuras emocionantes!
        </p>
      </div>

      {/* Grid de categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.href} {...category} />
        ))}
      </div>
    </div>
  )
} 