import { createClient } from '@supabase/supabase-js'

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

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  created_at?: string
}

// Funções para gerenciar jogos
export const gameService = {
  // Buscar todos os jogos da página 1
  async getAllGames(): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('page', 1)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos:', error)
      throw error
    }
    
    return data || []
  },

  // Buscar jogos por página específica
  async getGamesByPage(pageNumber: number): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('page', pageNumber)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos por página:', error)
      throw error
    }
    
    return data || []
  },

  // Buscar jogo por ID
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
    
    return data
  },

  // Buscar jogos por categoria (apenas página 1)
  async getGamesByCategory(category: string): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('category', category)
      .eq('page', 1)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos por categoria:', error)
      throw error
    }
    
    return data || []
  },

  // Buscar jogos relacionados (5 mais visualizados da página 1, excluindo o jogo atual)
  async getRelatedGames(gameId: string, category: string, limit: number = 5): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .neq('id', gameId)
      .eq('page', 1)
      .limit(limit)
      .order('views', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar jogos relacionados:', error)
      return []
    }
    
    return data || []
  },

  // Pesquisar jogos por título (apenas página 1)
  async searchGames(query: string): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .ilike('title', `%${query}%`)
      .eq('page', 1)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao pesquisar jogos:', error)
      throw error
    }
    
    return data || []
  },

  // Incrementar visualizações do jogo
  async incrementViews(gameId: string): Promise<number | null> {
    console.log('📊 Chamando incrementViews para gameId:', gameId)
    const { data, error } = await supabase
      .rpc('increment_game_views', { game_id: gameId })
    
    if (error) {
      console.error('❌ Erro ao incrementar visualizações:', error)
      return null
    } else {
      console.log('✅ RPC executado com sucesso. Novas visualizações:', data)
      return data
    }
  },

  // Incrementar curtidas do jogo
  async incrementLikes(gameId: string): Promise<number | null> {
    console.log('❤️ Chamando incrementLikes para gameId:', gameId)
    const { data, error } = await supabase
      .rpc('increment_game_likes', { game_id: gameId })
    
    if (error) {
      console.error('❌ Erro ao incrementar curtidas:', error)
      return null
    } else {
      console.log('✅ RPC executado com sucesso. Novas curtidas:', data)
      return data
    }
  },

  // Buscar jogos mais visualizados (apenas página 1)
  async getMostViewedGames(limit: number = 10): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('page', 1)
      .order('views', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Erro ao buscar jogos mais visualizados:', error)
      return []
    }
    
    return data || []
  }
} 