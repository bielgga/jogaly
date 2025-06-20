-- Migration 007: Add Fireboy and Watergirl game and remove game ID 67585
-- Created: 2024
-- Description: Add "Menino do Fogo e Menina da Água Online" and remove game with ID 67585

-- Remove jogo antigo
DELETE FROM games WHERE id = '67585';

-- Adicionar novo jogo Fireboy and Watergirl
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '64747',
  'Menino do Fogo e Menina da Água Online',
  'Junte-se a uma emocionante aventura para 2 jogadores em Menino do Fogo e Menina da Água Online. Comece no misterioso Templo da Floresta. Trabalhem juntos, resolvam quebra-cabeças e superem obstáculos neste jogo casual cheio de ação. Você pode escolher diferentes modos para experimentar. Colete gemas com seus amigos no modo Fuga para desbloquear o templo, empurre os baús e abra as portas. No Super Rei da Aventura, você precisa resolver quebra-cabeças com sua estratégia.',
  'Clique com o mouse ou toque para jogar',
  'https://html5.gamemonetize.com/1msc3emdw1a5nc6m5zkzmxzogbe66mm2/',
  'Stickman',
  'Adventure, Fire, Forest, water',
  'https://img.gamemonetize.com/1msc3emdw1a5nc6m5zkzmxzogbe66mm2/512x384.jpg',
  1280,
  720,
  0,
  0
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category FROM games WHERE id = '64747'; 