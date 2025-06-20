-- Migration 008: Add Snake Color Challenge game and remove game ID 66610
-- Created: 2024
-- Description: Add "Desafio das Cores da Cobra" and remove game with ID 66610

-- Remove jogo antigo
DELETE FROM games WHERE id = '66610';

-- Adicionar novo jogo Snake Color Challenge
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '61990',
  'Desafio das Cores da Cobra',
  'Mergulhe no mundo emocionante do Desafio das Cores da Cobra, um jogo arcade empolgante e de ritmo acelerado onde reflexos e estratégia são fundamentais! Inspirado no clássico jogo da cobrinha mas com uma reviravolta vibrante, este jogo online e gratuito desafia os jogadores a navegar por um mundo dinâmico cheio de obstáculos que mudam de cor.',
  'Jogar Desafio das Cores da Cobra é simples. Comece a jogar instantaneamente do seu navegador - completamente grátis e sem downloads ou instalações necessárias.',
  'https://html5.gamemonetize.com/djlhj9byrm6ma3wa7j8kjtgjfgx5mycy/',
  'Hypercasual',
  'Color, kiz10, Puzzle, Snake',
  'https://img.gamemonetize.com/djlhj9byrm6ma3wa7j8kjtgjfgx5mycy/512x384.jpg',
  450,
  750,
  0,
  0
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category FROM games WHERE id = '61990'; 