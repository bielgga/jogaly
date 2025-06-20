-- Migration 006: Add Round 6 game and remove game ID 67113
-- Created: 2024
-- Description: Add "Round 6 - Sinal Verde Sinal Vermelho" and remove game with ID 67113

-- Remove jogo antigo
DELETE FROM games WHERE id = '67113';

-- Adicionar novo jogo Round 6
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '23814',
  'Round 6 - Sinal Verde Sinal Vermelho',
  'Convite para o Round 6. Convite para um jogo justo de Sinal Vermelho, Sinal Verde. Quem ganhar este jogo receberá uma grande quantia em dinheiro de prêmio. Pare no sinal vermelho. Continue quando o sinal verde estiver ligado. Siga os movimentos da cabeça do seu personagem! Não se apresse. Sinal Vermelho, Sinal Verde. Biscoitos de Açúcar. Cabo de Guerra. Bolinhas de Gude. Pedras de Vidro. O Jogo Round 6. Experimente as delícias da mania que está varrendo o mundo pelo seu PC!',
  'Use o mouse para controlar, clique no botão esquerdo do mouse para correr e mover na direção',
  'https://html5.gamemonetize.com/etp56l9axninm4hfoue23ndqkvbpkho2/',
  'Arcade',
  '3D Games, Android, Best, Crazy, Game, HTML, HTML5, Mobile, run, running, Skills, Unity3D',
  'https://img.gamemonetize.com/etp56l9axninm4hfoue23ndqkvbpkho2/512x384.jpg',
  800,
  600,
  0,
  0
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category FROM games WHERE id = '23814'; 