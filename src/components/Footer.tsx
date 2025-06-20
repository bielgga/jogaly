'use client'

export default function Footer() {
  return (
    <footer className="py-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-4xl shadow-lg transform -rotate-3">
              Jogaly
            </div>
            <h2 className="text-5xl font-bold text-white">GAMES</h2>
          </div>
          <p className="text-white text-center">
            © 2025 Jogaly - Jogos gratuitos online
          </p>
        </div>
      </div>
    </footer>
  )
} 