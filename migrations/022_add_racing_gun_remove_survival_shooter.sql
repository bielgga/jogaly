-- Migration 022: Adicionar Racing Gun e remover Jogo de Tiro de Sobrevivência
-- Criado: 2024
-- Descrição: Adiciona "Corrida de Tiros" na página 1 e remove "jogo-de-tiro-de-sobrevivencia"

-- Remover jogo antigo
DELETE FROM games WHERE id = 'jogo-de-tiro-de-sobrevivencia';

-- Adicionar novo jogo Racing Gun
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes, page
) VALUES 
(
  'corrida-de-tiros',
  'Corrida de Tiros',
  'Corrida de Tiros Online é um shooter multijogador de ritmo acelerado onde os jogadores competem em corridas intensas enquanto participam de batalhas emocionantes com armas. Ambientado em ambientes dinâmicos e em constante mudança, os jogadores devem navegar por obstáculos, desviar do fogo inimigo e usar estrategicamente power-ups para superar os oponentes e chegar primeiro à linha de chegada. Com personagens personalizáveis, uma variedade de armas e uma gama de mapas desafiadores, Corrida de Tiros Online oferece emoção infinita para jogadores que buscam ação de alta octanagem e competição feroz. Junte-se aos amigos ou jogue sozinho nesta corrida cheia de adrenalina para a vitória!',
  'mouse ou espaço',
  'https://html5.gamemonetize.com/bmtr36i9huzstsuag0k8jkwrmna45fuv/',
  'Multiplayer',
  '2 Jogadores, Arma, Multijogador, Corrida',
  'https://img.gamemonetize.com/bmtr36i9huzstsuag0k8jkwrmna45fuv/512x384.jpg',
  800,
  600,
  0,
  0,
  1
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category, page FROM games WHERE id = 'corrida-de-tiros'; 