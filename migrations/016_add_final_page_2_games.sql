-- Migration 016: Adicionar jogos finais na página 2 (23 jogos total)
-- Adiciona os últimos 3 jogos traduzidos para português

INSERT INTO games (
  external_id, 
  title, 
  description, 
  instructions, 
  url, 
  category, 
  tags, 
  thumb, 
  width, 
  height, 
  page
) VALUES 
(
  '6836',
  'Boxe Bêbado',
  'As batalhas bêbadas continuam com o novo jogo. No Boxe Bêbado, os Boxeadores Bêbados entram na arena e tentam nocautear uns aos outros. Você pode dar socos rápidos no jogo, mas cuidado com sua Barra de Energia! Se ficar sem energia, levará um tempo para se recuperar. Certamente você ficará vulnerável nesta situação. Então não se esqueça de calcular sua energia ao determinar sua estratégia de luta!',
  'JOGADOR 1: SETAS DO TECLADO | JOGADOR 2: W A S D | Você pode usar os lados esquerdo e direito em telas sensíveis ao toque',
  'https://html5.gamemonetize.com/u7kh677sengcitk8eaib93z7gsiub9f6/',
  'Action',
  '2 Jogadores, Jogos 2 Jogadores, Boxe, Meninos, Luta, Diversão, Engraçado, Stickman',
  'https://img.gamemonetize.com/u7kh677sengcitk8eaib93z7gsiub9f6/512x384.jpg',
  800,
  480,
  2
),
(
  '6382',
  'Among Us Corrida de Natal',
  'O Natal está chegando! Vamos coletar presentes para o feriado! Mas há carros e obstáculos nos impedindo. Evite-os, ou colete anões para obter um escudo. Comece a correr agora!',
  'Teclas direcionais para se mover',
  'https://html5.gamemonetize.com/2zl80gyxb8wow5mthrawir5la9h52fa5/',
  'Arcade',
  'Evitar, Meninos, Natal, Coletando, Jogo, Jogos, H5, Feriado, HTML, HTML5, Criança, Crianças, Obstáculo, Correr, Corrida, Habilidades, Esporte, Esportes',
  'https://img.gamemonetize.com/2zl80gyxb8wow5mthrawir5la9h52fa5/512x384.jpg',
  750,
  1334,
  2
),
(
  '2335',
  'MineStrike.fun',
  'MineStrike.fun é um jogo divertido no estilo Minecraft. Coma bolos, biscoitos, peixe cozido e tudo que encontrar para crescer de tamanho enquanto você é pequeno, mais importante não coma batatas venenosas, pois reduz sua experiência e você fica menor! Ataque inimigos menores, assim você tem uma chance melhor de permanecer vivo. Você pode se proteger simplesmente fugindo de inimigos grandes para que eles não te matem com um golpe de sua arma poderosa! O jogo tem apenas 15 níveis. Você consegue chegar ao nível 15 e se tornar o maior e mais forte do jogo?',
  'Mover - mouse | Atacar - botão esquerdo do mouse | Acelerar - botão direito do mouse',
  'https://html5.gamemonetize.com/bgkaq5jchbya9rff5jw6gnkwceukg16s/',
  'Multiplayer',
  '.io, Jogos .io, 2D, Ação, Animal, Arcade, Batalha, Bloco, Minecraft, Espada, Zumbi',
  'https://img.gamemonetize.com/bgkaq5jchbya9rff5jw6gnkwceukg16s/512x384.jpg',
  800,
  600,
  2
); 