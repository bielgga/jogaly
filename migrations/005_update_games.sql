-- Migration 005: Update games - Remove old games and add new ones
-- Created: 2024
-- Description: Remove "Bestas Doces" and "Lubabu e Amigos", add "Tom & Jerry: Runner" and "Among Us Hide 'N Seek 2"

-- Remove jogos antigos
DELETE FROM games WHERE title = 'Bestas Doces';
DELETE FROM games WHERE title = 'Lubabu e Amigos';

-- Adicionar novos jogos
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes, page
) VALUES 
(
  '36446',
  'Tom & Jerry: Runner',
  'O inverno chegou e Jerry está com fome! Muita fome! Jerry está em uma missão para pegar todo o queijo, mas deve ter cuidado pois Tom está à espreita. TRÊS MODOS DE JOGO Jogue o clássico, corrida e o novo modo de combinação de cores! MAIS DE 100 NÍVEIS Muitos níveis cheios de queijo e diversão para jogar! OBJETOS E OBSTÁCULOS Use tudo ao seu alcance para evitar armadilhas, foguetes e outros obstáculos. MÚLTIPLOS AMBIENTES Corra pela sala de estar, jardim, sótão e muito mais! CARTAS BÔNUS Colete cartas bônus que ajudam você a ficar um passo à frente do Tom!',
  'Toque para Jogar',
  'https://html5.gamemonetize.com/9j3csw5erc84p2kmq4okvgvw5nc18hp6/',
  'Adventure',
  'Adventure, Cartoon, Cartoon Network, Fire, HTML5, Hypercasual, run, Unity3D',
  'https://img.gamemonetize.com/9j3csw5erc84p2kmq4okvgvw5nc18hp6/512x384.jpg',
  800,
  600,
  0,
  0,
  1
),
(
  '8822',
  'Among Us Hide ''N Seek 2',
  'Hora do esconde-esconde para Among Us. Ainda é pique-esconde. Neste labirinto, use anteparos para se esconder. Desvie dos caçadores e pegue o máximo de diamantes móveis possível. Ou seja um capturador e encontre os escondidos!',
  'Deslize para jogar',
  'https://html5.gamemonetize.com/loawmzcc9c87rcf1edrtrs1di35xiyd4/',
  'Arcade',
  '3D, 3D Games, Arcade, Avoid, Boy, Collecting, Hidden, Kid, Maze, Puzzle, Relaxation, Timing',
  'https://img.gamemonetize.com/loawmzcc9c87rcf1edrtrs1di35xiyd4/512x384.jpg',
  440,
  750,
  0,
  0,
  1
);

-- Verificar se os jogos foram adicionados corretamente
SELECT id, title, category FROM games WHERE id IN ('36446', '8822'); 