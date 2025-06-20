-- Migration 020: Adicionar Kirka.io na página 2
-- Adiciona 1 jogo na página 2 (Jogos Mais Populares)

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
  'kirka-io',
  'Kirka.io',
  'Kirka.io é um jogo FPS online com um estilo de arte em voxels. Você pode jogar em equipe, sozinho ou no modo parkour em vários locais de batalha. Depois de escolher o jogo, você pode personalizar a ordem de suas armas para se adequar ao seu estilo de jogo.',
  'Use WASD para mover, mouse para mirar e atirar, espaço para pular, shift para correr',
  'https://kirka.io/',
  'Shooter',
  'FPS, Shooter, Multiplayer, Voxel, Online, Equipe, Parkour, Armas, Combate, 3D',
  'https://pixiapi.com/wp-content/uploads/2023/12/kirka-io-game-icon.jpg',
  800,
  600,
  2
); 