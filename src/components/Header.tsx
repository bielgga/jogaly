'use client'

export default function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-3">
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg transform -rotate-3">
          Jogaly
          </div>
          <h1 className="text-5xl font-bold text-white">GAMES</h1>
        </div>
      </div>
    </header>
  )
} 