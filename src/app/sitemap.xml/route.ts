import { gameService } from '@/lib/supabase'

// Lista de categorias disponíveis
const CATEGORIES = [
  'corrida',
  'cozinhar', 
  'esportes',
  'io',
  'multiplayer',
  'quebra-cabeca',
  'tiro'
]

export async function GET() {
  try {
    // Buscar todos os jogos de todas as páginas
    const allGames = await gameService.getAllGamesAllPages()
    
    // URL base do site (você pode configurar isso em variável de ambiente)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jogaly.com'
    
    // Data atual para lastmod
    const currentDate = new Date().toISOString().split('T')[0]
    
    // Gerar URLs do sitemap
    const urls = [
      // Página principal
      {
        url: baseUrl,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: '1.0'
      },
      // Página principal de categorias
      {
        url: `${baseUrl}/categoria`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      // Páginas de categorias específicas
      ...CATEGORIES.map(category => ({
        url: `${baseUrl}/categoria/${category}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      })),
      // Páginas de jogos individuais
      ...allGames.map(game => ({
        url: `${baseUrl}/jogar/${game.id}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      }))
    ]
    
    // Gerar XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache por 1 hora
      }
    })
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error)
    
    // Sitemap básico em caso de erro
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jogaly.com'
    const currentDate = new Date().toISOString().split('T')[0]
    
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/categoria</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${CATEGORIES.map(category => `  <url>
    <loc>${baseUrl}/categoria/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300' // Cache menor em caso de erro
      }
    })
  }
} 