'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center relative">
          {/* Botão Home - Lado Esquerdo */}
          <div className="absolute left-0 hidden sm:flex items-center gap-3">
            <Link 
              href="/" 
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
            </Link>
            
            <Link 
              href="/categoria" 
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
              title="Categorias de Jogos"
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
                  d="M3 7V5C3 3.89543 3.89543 3 5 3H7C8.10457 3 9 3.89543 9 5V7C9 8.10457 8.10457 9 7 9H5C3.89543 9 3 8.10457 3 7Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M15 7V5C15 3.89543 15.8954 3 17 3H19C20.1046 3 21 3.89543 21 5V7C21 8.10457 20.1046 9 19 9H17C15.8954 9 15 8.10457 15 7Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M3 19V17C3 15.8954 3.89543 15 5 15H7C8.10457 15 9 15.8954 9 17V19C9 20.1046 8.10457 21 7 21H5C3.89543 21 3 20.1046 3 19Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M15 19V17C15 15.8954 15.8954 15 17 15H19C20.1046 15 21 15.8954 21 17V19C21 20.1046 20.1046 21 19 21H17C15.8954 21 15 20.1046 15 19Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">Categorias</span>
            </Link>
          </div>

          {/* Logo Central */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logojogaly2.png"
              alt="Jogaly"
              width={400}
              height={120}
              className="h-32 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Menu mobile - Home e Categorias */}
        <div className="flex justify-center items-center gap-3 mt-4 sm:hidden">
          <Link 
            href="/" 
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            title="Home"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path 
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          
          <Link 
            href="/categoria" 
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            title="Categorias"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path 
                d="M3 7V5C3 3.89543 3.89543 3 5 3H7C8.10457 3 9 3.89543 9 5V7C9 8.10457 8.10457 9 7 9H5C3.89543 9 3 8.10457 3 7Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M15 7V5C15 3.89543 15.8954 3 17 3H19C20.1046 3 21 3.89543 21 5V7C21 8.10457 20.1046 9 19 9H17C15.8954 9 15 8.10457 15 7Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M3 19V17C3 15.8954 3.89543 15 5 15H7C8.10457 15 9 15.8954 9 17V19C9 20.1046 8.10457 21 7 21H5C3.89543 21 3 20.1046 3 19Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M15 19V17C15 15.8954 15.8954 15 17 15H19C20.1046 15 21 15.8954 21 17V19C21 20.1046 20.1046 21 19 21H17C15.8954 21 15 20.1046 15 19Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium">Categorias</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 