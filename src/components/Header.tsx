'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <Image
            src="/logojogaly2.png"
            alt="Jogaly"
            width={400}
            height={120}
            className="h-32 w-auto"
            priority
          />
        </div>
      </div>
    </header>
  )
} 