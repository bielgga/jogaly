'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="py-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <Image
              src="/logojogaly2.png"
              alt="Jogaly Games"
              width={250}
              height={75}
              className="h-16 w-auto"
            />
          </div>
          <p className="text-white text-center">
            © 2025 Jogaly - Jogos gratuitos online
          </p>
        </div>
      </div>
    </footer>
  )
} 