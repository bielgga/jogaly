-- Migration 010: Add Flip Skater Rush 3D and Light It Rush games, remove games ID 67605 and 67112
-- Created: 2024
-- Description: Add "Corrida do Skatista 3D" and "Corrida da Luz" and remove games with IDs 67605 and 67112

-- Remove jogos antigos
DELETE FROM games WHERE id = '67605';
DELETE FROM games WHERE id = '67112';

-- Adicionar novos jogos
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '42522',
  'Corrida do Skatista 3D',
  'Corrida do Skatista 3D é um jogo de skate para duas pessoas particularmente interessante. Mas você controla duas pessoas deslizando, e ajustando suas posições, ambas podem passar pelos obstáculos. Há confiança no desafio?',
  'Deslize para mover',
  'https://html5.gamemonetize.com/e609mlgzubon66yfnrx6araayi0hgsdv/',
  'Arcade',
  'Avoid, Kids, Mobile, Skating',
  'https://img.gamemonetize.com/e609mlgzubon66yfnrx6araayi0hgsdv/512x384.jpg',
  750,
  1334,
  0,
  0
),
(
  '67688',
  'Corrida da Luz',
  'Balance, pule, gire e deslize seu corpo de mestre stickman de uma forma de cor neon para outra para fazê-las brilhar e iluminar. É um mundo escuro lá fora para um pequenino mestre stickman como você, e é hora de iluminar e fazer as cores brilharem.',
  'Clique com o mouse ou toque para jogar',
  'https://html5.gamemonetize.com/gskztfg8o3i7aeh66zmn8flgkttfftdw/',
  'Stickman',
  'Action, Adventure, Casual, Jumping, running, Stickman, Super',
  'https://img.gamemonetize.com/gskztfg8o3i7aeh66zmn8flgkttfftdw/512x384.jpg',
  480,
  800,
  0,
  0
);

-- Verificar se os jogos foram adicionados corretamente
SELECT id, title, category FROM games WHERE id IN ('42522', '67688'); 