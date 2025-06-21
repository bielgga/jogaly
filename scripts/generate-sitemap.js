const fs = require('fs')
const path = require('path')

// Configuração
const SITE_URL = 'https://jogaly.com' // Altere para sua URL real
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml')

// Lista de jogos conhecidos (baseado nas migrations)
// Você pode expandir esta lista ou buscar do banco de dados
const KNOWN_GAMES = [
  // Página 1
  'zumbis-vs-girassois',
  'corrida-da-luz',
  'tom-jerry-runner',
  'super-motocross',
  'superando-tudo-desbloqueado',
  'esconde-esconde-amigos',
  'among-us-hide-n-seek-2',
  'montanha-de-neve-zigzag',
  'quebra-cabeca-do-heroi-resgate',
  'bolas-do-amor-2d',
  'round-6-sinal-verde-sinal-vermelho',
  'cone-de-sorvete-enrolado-diy',
  'fabrica-de-veiculos',
  'salto-circular',
  'sprunki-trilhos-mortos',
  
  // Página 2
  'corrida-do-skatista-3d',
  'corrida-da-luz-stickman',
  'copo-feliz-encha-o-copo-desenhando-linhas',
  'tiro-noturno-de-ursos-zumbis',
  'pou-online',
  'among-us-edicao-online',
  'trilhos-do-telhado-pilha-de-cores-3d',
  'caminho-pixel',
  'fuga-do-parquinho-thung-thung-sahur',
  'jogo-de-tiro-de-sobrevivencia',
  'fuga-do-parquinho-thung-thung-sahur-2',
  'chuva-de-slime',
  'area-de-guerra',
  'menino-do-fogo-e-menina-da-agua-online',
  'estacionamento-de-carros-polly',
  'basico-do-baldi-v143',
  'tom-falante-corrida-do-ouro-online',
  'minecraft-remake',
  'sprunki-mod-ketchup',
  'desafio-das-cores-da-cobra',
  'vestir-casal-roblox',
  
  // Página 3
  'empurre-a-multidao-louca-confronto-stickman-3d',
  'super-runcraft',
  'vandalos-do-skate',
  'desafio-round-6-3d',
  'corrida-de-bicicleta',
  'fall-bros',
  'corrida-de-veiculo-humano',
  '12-minibatalhas',
  'tap-tap-recarregado',
  'tom-e-jerry-corrida',
  'magia-do-quebra-cabeca-de-blocos',
  'simulador-de-direcao-de-caminhao-offroad',
  'minestrike-fun',
  'zumbis-vs-girassois-2',
  'among-us-corrida-de-natal',
  'bestas-doces',
  'boxe-bebado',
  'among-us-corrida-espacial',
  'chuva-de-slime-2',
  
  // Jogos adicionais conhecidos
  'classic-car-parking',
  'bloxd-io',
  'kirka-io',
  'racing-gun',
  'squid-game-hidden-money'
]

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]
  
  // URLs do sitemap
  const urls = [
    // Página principal
    {
      url: SITE_URL,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    // Páginas de jogos
    ...KNOWN_GAMES.map(gameId => ({
      url: `${SITE_URL}/jogar/${gameId}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    }))
  ]
  
  // Gerar XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Criar diretório se não existir
  const publicDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // Escrever arquivo
  fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8')
  
  console.log(`✅ Sitemap gerado com sucesso!`)
  console.log(`📍 Localização: ${OUTPUT_PATH}`)
  console.log(`🔗 URLs incluídas: ${urls.length}`)
  console.log(`📅 Data de geração: ${currentDate}`)
}

// Executar se chamado diretamente
if (require.main === module) {
  generateSitemap()
}

module.exports = { generateSitemap, KNOWN_GAMES } 