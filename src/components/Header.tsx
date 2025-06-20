'use client'

export default function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-3">
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg" style={{ transform: 'rotate(-5deg)' }}>
          Jogaly
          </div>
          <div className="text-5xl font-bold text-white">GAMES</div>
        </div>
      </div>
    </header>
  )
} 