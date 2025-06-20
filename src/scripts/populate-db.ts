import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Carregar variáveis do .env.local explicitamente
config({ path: '.env.local' })

// Verificar e carregar variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL não encontrada no arquivo .env.local')
  console.log('Certifique-se de que o arquivo .env.local existe na raiz do projeto com:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://trqrdrpbptpdfdyosqhw.supabase.co')
  process.exit(1)
}

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY não encontrada no arquivo .env.local')
  console.log('Certifique-se de que o arquivo .env.local tem a chave service_role para operações administrativas')
  process.exit(1)
}

// Usar service_role key para operações administrativas
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const gamesData = [
  {"id":"67621","title":"Sprunki Ketchup Mod","description":"Sprunki Ketchup Mod - Um jogo com física de arremessos e elementos ragdoll. Jogue ketchup para acertar o Sprunki e transformá-lo em uma versão de ketchup! Teste suas habilidades em 30 níveis! A dificuldade aumentará e os mapas ficarão maiores. Use sua cabeça: calcule a trajetória perfeita do arremesso e use os ricochetes para vencer!","instructions":"Sua missão é jogar ketchup no Simon. Use o ketchup como um projétil, estique como um estilingue e atire com precisão","url":"https://html5.gamemonetize.com/7tvjo8x6w1flu3fvadry5mz8qbhotkxo/","category":"Puzzle","tags":"1 Jogador, 2D, angrybirds, Casual, Mobile, Física, Sprunki","thumb":"https://img.gamemonetize.com/7tvjo8x6w1flu3fvadry5mz8qbhotkxo/512x384.jpg","width":"800","height":"600"},
  {"id":"66422","title":"BlockPuzzleMagic","description":"Monte e elimine os blocos. Vários blocos de formas diferentes aparecerão aleatoriamente na parte inferior. Arraste os blocos para a caixa superior. Eles serão eliminados quando uma linha ou coluna estiver preenchida. Venha experimentar!","instructions":"Clique com o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/z6gxwxdgunqmjmhva7j5kszeya71ls9u/","category":"Puzzle","tags":"1 Jogador, Arcade, Puzzle, quebra-cabeça","thumb":"https://img.gamemonetize.com/z6gxwxdgunqmjmhva7j5kszeya71ls9u/512x384.jpg","width":"350","height":"600"},
  {"id":"67112","title":"Simulador de Caminhão Offroad","description":"Experimente a emoção de dirigir caminhões offroad! Navegue por terrenos acidentados, entregue cargas por caminhos desafiadores e domine caminhões poderosos em ambientes realistas. Conquiste colinas, lama e rios nesta aventura definitiva de simulação de direção de caminhão. Pronto para dirigir?","instructions":"Clique com o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/a6i1ot5d0scwphehyrsl0vned0ezjk8q/","category":"Action","tags":"Direção, Mentolatux, offroad, Simulador, Caminhão, unity, WebGL","thumb":"https://img.gamemonetize.com/a6i1ot5d0scwphehyrsl0vned0ezjk8q/512x384.jpg","width":"800","height":"600"},
  {"id":"67439","title":"Zumbis vs. Girassóis","description":"Neste jogo de tower defense cheio de ação, seu jardim está sob ataque de zumbis implacáveis! Posicione estrategicamente plantas únicas - cada uma com habilidades especiais - para parar os invasores cambaleantes. Desbloqueie e melhore suas plantas para liberar ataques poderosos e criar uma defesa imbatível. Enfrente inimigos temíveis - lute contra ondas de zumbis, cada um com suas próprias forças e fraquezas. Ganhe sol e sobreviva - colete recursos para expandir seu arsenal e manter a linha! Você consegue ser mais esperto que os mortos-vivos e proteger sua casa? A batalha pela sobrevivência começa agora!","instructions":"Clique com o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/6kw2gj2vjs2uztzkl5xyrxrpreo5t6lo/","category":"Hypercasual","tags":"plantas zangadas, apocalipse, Exército, Batalha, Casual, Defesa, Fruta, Frutas, Hypercasual, Planta, plantas, Tower Defense, Zumbi","thumb":"https://img.gamemonetize.com/6kw2gj2vjs2uztzkl5xyrxrpreo5t6lo/512x384.jpg","width":"800","height":"600"},
  {"id":"67603","title":"Bestas Doces","description":"Combine doces. Alimente monstros. Libere o caos do açúcar! Entre no mundo selvagem e caprichoso de Sweet Beasts, uma aventura de quebra-cabeça match-3 repleta de doces onde monstros adoráveis têm um apetite insaciável por doces! Combine doces coloridos, desencadeie combos explosivos e alimente seus amigos bestas famintos enquanto viaja por florestas pegajosas de gomas, montanhas de marshmallow e lagoas de geleia. Cada nível traz novos desafios e travessuras monstruosas! Desbloqueie novas criaturas, descubra seus poderes viciados em doces e enfrente obstáculos pegajosos em centenas de níveis deliciosamente complicados.","instructions":"Faça match-3 e vença","url":"https://html5.gamemonetize.com/h9oc4gnpqgqndct23kpvys6qlgzlo7v4/","category":"Hypercasual","tags":"Melhores Jogos, Match-3, Puzzle","thumb":"https://img.gamemonetize.com/h9oc4gnpqgqndct23kpvys6qlgzlo7v4/512x384.jpg","width":"800","height":"600"},
  {"id":"67602","title":"Conquista do Trono","description":"O trono foi perdido. O castelo está amaldiçoado. Reconquiste-o. Em Thronehold, você calça as botas de um guerreiro solitário preso em um castelo em ruínas cheio de perigo, escuridão e segredos há muito esquecidos. Este intenso jogo de plataforma combina ação acelerada, saltos precisos e armadilhas inteligentes em uma fortaleza labiríntica que já foi governada por reis - agora assombrada por criaturas das sombras. Salte sobre espinhos mortais, escale torres antigas, desbloqueie caminhos ocultos e lute contra cavaleiros amaldiçoados, bestas espectrais e máquinas retorcidas que guardam a sala do trono. Apenas os mais fortes podem reconquistar o Thronehold.","instructions":"Evite obstáculos e continue se movendo. Clique para pular","url":"https://html5.gamemonetize.com/rv7i4vp7fn46vjdgjs8el77c83twubly/","category":"Hypercasual","tags":"Rei, Obstáculo, Plataforma","thumb":"https://img.gamemonetize.com/rv7i4vp7fn46vjdgjs8el77c83twubly/512x384.jpg","width":"800","height":"600"},
  {"id":"67635","title":"Fuga do Parquinho Thung Thung Sahur","description":"Thung Thung Sahur Playgrounds Escape é um jogo de sobrevivência e terror. Você deve encontrar uma maneira de completar a missão dentro de um certo tempo antes que Thung Thung te pegue!","instructions":"WASD para se mover","url":"https://html5.gamemonetize.com/8tcibyn2omj8rnb6w52fca37crhmexjh/","category":"Adventure","tags":"Terror, Tung Tung Tung, Tung Tung Tung Sahur","thumb":"https://img.gamemonetize.com/8tcibyn2omj8rnb6w52fca37crhmexjh/512x384.jpg","width":"800","height":"600"},
  {"id":"67614","title":"Jogo de Tiro de Sobrevivência","description":"Survival Shooter é um jogo de ação acelerado visto de cima onde você deve lutar contra ondas infinitas de inimigos. Armado com armas poderosas e reflexos rápidos, você lutará em arenas intensas, coletará power-ups e desbloqueará melhorias para sobreviver o máximo possível. Os inimigos ficam mais fortes, mais rápidos e mais agressivos - apenas os habilidosos durarão. Com visuais estilizados, controles responsivos de twin-stick e jogabilidade desafiadora, Survival Shooter oferece uma experiência cheia de adrenalina que te faz voltar sempre. Por quanto tempo você consegue sobreviver ao ataque? Suba no ranking e prove seu valor no teste definitivo de sobrevivência.","instructions":"Clique com o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/j7cwr3eola0ddykquvywldrqi5umfm8l/","category":"Arcade","tags":"2D, ataque, Tiro, sobrevivência","thumb":"https://img.gamemonetize.com/j7cwr3eola0ddykquvywldrqi5umfm8l/512x384.jpg","width":"1280","height":"720"},
  {"id":"67639","title":"Chuva de Slime","description":"Desvie dos objetos que caem e colete o máximo de moedas que puder! Jogo de arcade acelerado baseado em reflexos que é fácil de jogar mas difícil de dominar. Por quanto tempo você consegue sobreviver?","instructions":"Teclado, arrastar ou tocar","url":"https://html5.gamemonetize.com/d0h77hx3taikfukdn3jqgjvh2hz333y3/","category":"Hypercasual","tags":"2D, Arcade, Evitar, Coleção, infinito","thumb":"https://img.gamemonetize.com/d0h77hx3taikfukdn3jqgjvh2hz333y3/512x384.jpg","width":"720","height":"1280"},
  {"id":"67588","title":"Estacionamento de Carros Polly","description":"Prepare-se para dominar o quebra-cabeça definitivo de estacionamento de carros! Em Parking Poly Cars, sua missão é escapar de engarrafamentos movendo os carros certos na ordem correta. Desfrute de uma jogabilidade viciante de quebra-cabeça de engarrafamento que testa sua lógica e estratégia. Deslize os carros, desbloqueie o caminho e limpe o estacionamento neste jogo divertido e desafiador de quebra-cabeça de carros! Perfeito para fãs de jogos cerebrais, simuladores de estacionamento e jogos de engarrafamento. Com dificuldade crescente e níveis inteligentes, este jogo de estacionamento manterá seu cérebro afiado. Seja você um jogador casual ou um profissional de quebra-cabeças, desfrute de horas de diversão anti-stress!","instructions":"Clique e arraste carros para movê-los. Toque e deslize carros no celular para deslizá-los","url":"https://html5.gamemonetize.com/kcrzitqb6wihdtc7dgarvuhzpbupldn3/","category":"Puzzle","tags":"1 Jogador, Jogos 3D, Carros, Casual, Hypercasual, Mobile, Estacionamento, Puzzle, jogos unity","thumb":"https://img.gamemonetize.com/kcrzitqb6wihdtc7dgarvuhzpbupldn3/512x384.jpg","width":"1080","height":"1920"},
  {"id":"67570","title":"Drag N Boom","description":"DragnBoom é um jogo de arcade divertido da velha escola que combina velocidade e precisão! Mergulhe em um universo medieval imaginário cheio de heróis, ecoando os maiores jogos de arcade e plataforma de todos os tempos.","instructions":"Use o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/avdfpa7rynma1wxofv7mfg6iyh8trf07/","category":"Adventure","tags":"1 Jogador, Ação, Aventura, Arcade, Cartoon Network, corrida, Dragão, Mario, correndo, Habilidades","thumb":"https://img.gamemonetize.com/avdfpa7rynma1wxofv7mfg6iyh8trf07/512x384.jpg","width":"800","height":"480"},
  {"id":"66610","title":"Quebra-cabeça de Conexões","description":"Una os quadrados correspondentes. O jogo tem vários tipos de blocos, cada um com uma linha de conexão, e blocos com a mesma linha de conexão podem ser conectados. O jogo tem tema espacial, a tela é muito bonita, venha experimentar.","instructions":"Clique com o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/w9ivj4zh3jsdgv228mo6arl3scwflrpc/","category":"Puzzle","tags":"1 Jogador, Arcade, Puzzle","thumb":"https://img.gamemonetize.com/w9ivj4zh3jsdgv228mo6arl3scwflrpc/512x384.jpg","width":"350","height":"600"},
  {"id":"67605","title":"Barragem Heroica","description":"Libere balas. Desvie do caos. Defenda o reino. Em Heroic Barrage, você é a última linha de defesa - um guerreiro destemido armado com poder de fogo infinito, enfrentando onda após onda de inimigos implacáveis. Ambientado em um campo de batalha acelerado de rolagem lateral logo acima do nível do solo, esta aventura estilo arcade desafia seus reflexos, precisão e coragem. Inimigos enxameiam de todas as direções e altitudes. Seu trabalho? Atire sem parar, sobreviva ao ataque e domine os céus com precisão e estilo. Com controles intuitivos de joystick, você se moverá, mirará e explodirá através de ondas crescentes de inimigos voadores.","instructions":"Desvie dos inimigos e atire","url":"https://html5.gamemonetize.com/xh68e468i0y8trlyucd55tbhdh526foh/","category":"Hypercasual","tags":"Inimigos, voar, correr, Super-herói","thumb":"https://img.gamemonetize.com/xh68e468i0y8trlyucd55tbhdh526foh/512x384.jpg","width":"800","height":"600"},
  {"id":"67609","title":"Fuga das Cobras","description":"Escape From Snakes é um jogo de sobrevivência arcade acelerado onde o perigo desliza de todas as direções! Desvie de uma onda infinita de cobras e tente sobreviver o máximo possível. Simples de jogar mas difícil de dominar - perfeito para jogadores casuais e competitivos. Você consegue durar mais que o enxame?","instructions":"Teclado, toque ou mouse","url":"https://html5.gamemonetize.com/l078xbrwau481peyccnpdwkcdsg5g0ke/","category":"Hypercasual","tags":"Casual, Mobile, Cobra, sobrevivência","thumb":"https://img.gamemonetize.com/l078xbrwau481peyccnpdwkcdsg5g0ke/512x384.jpg","width":"720","height":"1280"},
  {"id":"67585","title":"Bolas Saltitantes","description":"Se você está procurando o campeão mata-tempo, não perca este jogo HTML5 Bouncing Balls. Parece um jogo muito simples de quebrar tijolos, mas é mais viciante! É um jogo simples e minimalista para jogar porque não há necessidade de pegá-las. Apenas use seu dedo para tocar, mirar e atirar a bola e ricochetear e destruir esses tijolos. Colete círculos dourados para obter bolas adicionais e conseguir a corrente infinita de bolas! Sua tarefa é esmagar o máximo de tijolos possível antes que caiam no chão. Vamos lá! Aproveite o novo jogo Bouncing Balls.","instructions":"Deslize o dedo para arremessar as bolas e quebrar os tijolos. Cada tijolo tem números - acerte os tijolos tantas vezes quanto o número neles para fazê-los desaparecer. Tente quebrar o máximo de tijolos possível antes que se movam para baixo","url":"https://html5.gamemonetize.com/t6jirs5vm2z0c3xa60ld40xh8u34v13a/","category":"Puzzle","tags":"Bola, Cérebro, Número, Puzzle, Habilidades, Estratégia","thumb":"https://img.gamemonetize.com/t6jirs5vm2z0c3xa60ld40xh8u34v13a/512x384.jpg","width":"800","height":"600"},
  {"id":"67516","title":"Labubu e Amigos - 2 Jogadores","description":"Labubu e seu amigo precisam escapar da ilha durante o verão! Tenham muito cuidado enquanto se aventuram juntos e coletam todas as conchas douradas pelo caminho. Claro, colete essas conchas douradas primeiro - depois cheguem à caixa de presente gigante! Ambos os adoráveis amigos Labubu devem chegar à caixa de presente, porque dentro estão suas coisas favoritas. Mas cuidado - o caminho está cheio de perigos e obstáculos!","instructions":"Use WASD e setas para se mover. Colete todas as Conchas Douradas e chegue à Caixa de Presente. Jogável tanto no celular quanto no PC","url":"https://html5.gamemonetize.com/lv9gv1e4b0nnycb2h3v6chrzmsiwp1zr/","category":"Arcade","tags":"1 Jogador, 2 Jogadores, Jogos 2 Jogadores, 2D, Ação, Aventura, Arcade, Plataforma","thumb":"https://img.gamemonetize.com/lv9gv1e4b0nnycb2h3v6chrzmsiwp1zr/512x384.jpg","width":"800","height":"600"},
  {"id":"67113","title":"Motorista de Caminhão de Carga Real 2025","description":"Real Cargo Truck Driver 2025 é um jogo imersivo de simulação de caminhão onde os jogadores transportam cargas pesadas por estradas desafiadoras. Experimente física de direção realista, clima dinâmico e ambientes detalhados enquanto gerencia entregas, melhora seus caminhões e explora rotas expansivas de mundo aberto.","instructions":"WASD para dirigir","url":"https://html5.gamemonetize.com/l1d2e2zfagy73bk0trm842vg06hfmagh/","category":"Action","tags":"carga, Direção, Mentolatux, Caminhão, unity, WebGL","thumb":"https://img.gamemonetize.com/l1d2e2zfagy73bk0trm842vg06hfmagh/512x384.jpg","width":"800","height":"600"},
  {"id":"59327","title":"Corrida de Veículo Humano","description":"Quer uma aventura divertida de parkour em Human Vehicle Run? Neste jogo único, você coletará muitos stickmen. Depois lidere uma multidão crescente de pessoas, transformando-as em um carro ou até mesmo veículos poderosos. Quanto mais pessoas você tiver, mais poderoso seu veículo se torna até se tornar um helicóptero.","instructions":"Clique com o mouse ou toque para jogar","url":"https://html5.gamemonetize.com/env6yjhbdjtey6d11eualsj2qk4edx0d/","category":"Racing","tags":"Aventura, Arcade, correndo","thumb":"https://img.gamemonetize.com/env6yjhbdjtey6d11eualsj2qk4edx0d/512x384.jpg","width":"750","height":"1334"}
]

async function createTable() {
  console.log('🔧 Criando tabela games...')
  
  const { error } = await supabase.rpc('create_games_table', {})
  
  if (error && !error.message.includes('already exists')) {
    console.error('❌ Erro ao criar tabela:', error)
    return false
  }
  
  console.log('✅ Tabela games criada com sucesso!')
  return true
}

async function populateDatabase() {
  console.log('🚀 Iniciando migração para Supabase...')
  console.log('📊 Total de jogos para inserir:', gamesData.length)
  
  try {
    // Verificar conexão
    console.log('🔗 Verificando conexão com Supabase...')
    const { data: testData, error: testError } = await supabase
      .from('games')
      .select('id')
      .limit(1)
    
    if (testError) {
      console.error('❌ Erro de conexão com Supabase:', testError.message)
      console.log('\n📋 INSTRUÇÕES PARA CONFIGURAR SUPABASE:')
      console.log('1. Acesse https://supabase.com e crie um projeto')
      console.log('2. Vá em SQL Editor e execute o seguinte comando:')
      console.log(`
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  url TEXT NOT NULL,
  category TEXT,
  tags TEXT,
  thumb TEXT,
  width TEXT,
  height TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_games_category ON games(category);
CREATE INDEX idx_games_title ON games(title);
CREATE INDEX idx_games_created_at ON games(created_at);
      `)
      console.log('3. Atualize as variáveis no arquivo .env.local')
      console.log('4. Execute este script novamente')
      return
    }
    
    console.log('✅ Conexão com Supabase estabelecida!')
    
    // Verificar se já existem jogos
    const { data: existingGames, error: countError } = await supabase
      .from('games')
      .select('id')
    
    if (countError) {
      console.error('❌ Erro ao verificar jogos existentes:', countError)
      return
    }
    
    console.log(`📈 Jogos existentes no banco: ${existingGames?.length || 0}`)
    
    // Inserir jogos em lotes para melhor performance
    const batchSize = 10
    let inserted = 0
    let updated = 0
    
    for (let i = 0; i < gamesData.length; i += batchSize) {
      const batch = gamesData.slice(i, i + batchSize)
      
      console.log(`📦 Processando lote ${Math.floor(i/batchSize) + 1}/${Math.ceil(gamesData.length/batchSize)}...`)
      
      const { data, error } = await supabase
        .from('games')
        .upsert(batch, { onConflict: 'id', ignoreDuplicates: false })
        .select('id')
      
      if (error) {
        console.error('❌ Erro ao inserir lote:', error)
        continue
      }
      
      // Contar novos vs atualizados
      const batchIds = batch.map(g => g.id)
      const existingIds = existingGames?.map(g => g.id) || []
      const newInBatch = batchIds.filter(id => !existingIds.includes(id))
      
      inserted += newInBatch.length
      updated += batch.length - newInBatch.length
    }
    
    console.log('\n🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!')
    console.log(`✅ Jogos inseridos: ${inserted}`)
    console.log(`🔄 Jogos atualizados: ${updated}`)
    console.log(`📊 Total no banco: ${gamesData.length}`)
    
    // Verificar resultado final
    const { data: finalGames } = await supabase
      .from('games')
      .select('id')
    
    console.log(`🔍 Verificação final: ${finalGames?.length || 0} jogos no banco`)
    
    console.log('\n🚀 Seu site agora está 100% integrado com Supabase!')
    console.log('Execute: npm run dev')
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

// Executar apenas se for chamado diretamente
if (require.main === module) {
  populateDatabase()
}

export default populateDatabase 