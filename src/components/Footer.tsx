'use client'

import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    title: 'Jogos de Tiro 🎯',
    href: '/categoria/tiro'
  },
  {
    title: 'Jogos de Corrida 🏎️',
    href: '/categoria/corrida'
  },
  {
    title: 'Quebra-Cabeças 🧩',
    href: '/categoria/quebra-cabeca'
  },
  {
    title: 'Jogos de Cozinhar 👨‍🍳',
    href: '/categoria/cozinhar'
  },
  {
    title: 'Jogos de Esportes ⚽',
    href: '/categoria/esportes'
  },
  {
    title: 'Jogos Multiplayer 🎮',
    href: '/categoria/multiplayer'
  },
  {
    title: 'Jogos IO 🌐',
    href: '/categoria/io'
  }
]

export default function Footer() {
  return (
    <footer className="py-12 mt-20 bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo e descrição */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logojogaly2.png"
                alt="Jogaly"
                width={280}
                height={84}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Descubra milhares de jogos online gratuitos no Jogaly! Nossa plataforma oferece uma vasta coleção de jogos em diversas categorias: ação, aventura, quebra-cabeças, esportes e muito mais. Jogue instantaneamente no seu navegador, sem downloads ou cadastros necessários.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">
              Categorias
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
              <p className="text-gray-400 text-base">
                © 2025 Jogaly - Jogos gratuitos online
              </p>
              <Link
                href="/termos-de-uso"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base underline"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 