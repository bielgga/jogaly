import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Configuração do Supabase - sempre pega do .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validação das variáveis de ambiente
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL não encontrada no arquivo .env.local')
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY não encontrada no arquivo .env.local')
}

// Cliente Supabase otimizado para jogos públicos
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Não precisamos de sessão persistente
    autoRefreshToken: false, // Não precisamos de refresh automático
    detectSessionInUrl: false, // Não detectar sessão na URL
    storage: undefined, // Não usar storage local
  },
  global: {
    headers: {
      'x-application-name': 'jogaly-games',
    },
  },
  db: {
    schema: 'public',
  },
})

// Interface completa do jogo
export interface Game {
  id: string
  title: string
  description: string
  instructions: string
  url: string
  category: string
  tags: string
  thumb: string
  width: string
  height: string
  views: number
  likes: number
  page: number
  gameid: string
  created_at?: string
}

// Interface otimizada para listagem (menos campos)
export interface GameListItem {
  id: string
  title: string
  thumb: string
  likes: number
  views: number
  page?: number
  category?: string
  gameid: string
}

// Cache otimizado com Map para melhor performance
const cache = new Map<string, { data: GameListItem[], timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

// Funções utilitárias para cache otimizadas
function getCachedData(key: string): GameListItem[] | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  cache.delete(key) // Limpar cache expirado
  return null
}

function setCachedData(key: string, data: GameListItem[]): void {
  // Limitar tamanho do cache
  if (cache.size > 20) {
    const firstKey = cache.keys().next().value
    if (firstKey) {
      cache.delete(firstKey)
    }
  }
  cache.set(key, { data, timestamp: Date.now() })
}

// Funções otimizadas para gerenciar jogos
export const gameService = {
  // Buscar todos os jogos da página 1 com cache
  async getAllGames(): Promise<GameListItem[]> {
    const cacheKey = 'games_page_1'
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,page,gameid')
      .eq('page', 1)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos:', error)
      throw error
    }
    
    const games = (data || []) as GameListItem[]
    setCachedData(cacheKey, games)
    return games
  },

  // Buscar jogos por página específica com cache
  async getGamesByPage(pageNumber: number): Promise<GameListItem[]> {
    const cacheKey = `games_page_${pageNumber}`
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,page,gameid')
      .eq('page', pageNumber)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos por página:', error)
      throw error
    }
    
    const games = (data || []) as GameListItem[]
    setCachedData(cacheKey, games)
    return games
  },

  // Buscar jogo por ID (dados completos) - sem cache para dados dinâmicos
  async getGameById(id: string): Promise<Game | null> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Erro ao buscar jogo:', error)
      return null
    }
    
    return data as Game
  },

  // Buscar jogos por categoria (todas as páginas)
  async getGamesByCategory(category: string): Promise<GameListItem[]> {
    const cacheKey = `games_category_${category}`
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,category,gameid')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos por categoria:', error)
      throw error
    }
    
    const games = (data || []) as GameListItem[]
    setCachedData(cacheKey, games)
    return games
  },

  // Buscar jogos relacionados (5 mais visualizados da página 1, excluindo o jogo atual)
  async getRelatedGames(gameId: string, category: string, limit: number = 5): Promise<GameListItem[]> {
    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,gameid')
      .neq('id', gameId)
      .eq('page', 1)
      .limit(limit)
      .order('views', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos relacionados:', error)
      return []
    }
    
    return (data || []) as GameListItem[]
  },

  // Pesquisar jogos por título (apenas página 1)
  async searchGames(query: string): Promise<GameListItem[]> {
    if (!query.trim()) return []
    
    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,gameid')
      .ilike('title', `%${query}%`)
      .eq('page', 1)
      .order('created_at', { ascending: false })
      .limit(20) // Limitar resultados
    
    if (error) {
      console.error('Erro ao pesquisar jogos:', error)
      throw error
    }
    
    return (data || []) as GameListItem[]
  },

  // Incrementar visualizações do jogo (otimizado)
  async incrementViews(gameId: string): Promise<number | null> {
    try {
      const { data, error } = await supabase
        .rpc('increment_game_views', { game_id: gameId })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao incrementar visualizações:', error)
      return null
    }
  },

  // Incrementar curtidas do jogo (otimizado)
  async incrementLikes(gameId: string): Promise<number | null> {
    try {
      const { data, error } = await supabase
        .rpc('increment_game_likes', { game_id: gameId })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao incrementar curtidas:', error)
      return null
    }
  },

  // Buscar jogos mais visualizados (com cache)
  async getMostViewedGames(limit: number = 10): Promise<GameListItem[]> {
    const cacheKey = `most_viewed_${limit}`
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,gameid')
      .eq('page', 1)
      .order('views', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Erro ao buscar jogos mais visualizados:', error)
      return []
    }
    
    const games = (data || []) as GameListItem[]
    setCachedData(cacheKey, games)
    return games
  },

  // Buscar todos os jogos de todas as páginas (sem filtro de página)
  async getAllGamesAllPages(): Promise<GameListItem[]> {
    const cacheKey = 'games_all_pages'
    const cached = getCachedData(cacheKey)
    if (cached) return cached

    const { data, error } = await supabase
      .from('games')
      .select('id,title,thumb,likes,views,page,gameid')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar todos os jogos:', error)
      throw error
    }
    
    const games = (data || []) as GameListItem[]
    setCachedData(cacheKey, games)
    return games
  },
} 