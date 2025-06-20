-- Migration 009: Add Getting Over It Unblocked game and remove game ID 66422
-- Created: 2024
-- Description: Add "Superando Tudo Desbloqueado" and remove game with ID 66422

-- Remove jogo antigo
DELETE FROM games WHERE id = '66422';

-- Adicionar novo jogo Getting Over It Unblocked
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '65970',
  'Superando Tudo Desbloqueado',
  'Comece a mais maravilhosa aventura de escalada de todos os tempos em Superando Tudo Desbloqueado. Este jogo testará sua paciência, habilidade e determinação como nunca antes. Você joga como um homem preso em um pote gigante, armado apenas com um martelo para escalar plataformas impossíveis. Seu objetivo é continuar subindo. Três aventuras diferentes estão esperando para desafiá-lo. Observe plataformas ocas, distâncias mais longas, etc.',
  'Clique com o mouse ou toque para jogar',
  'https://html5.gamemonetize.com/99gjodm9l46o7lbkuf26qhc54pxyzp1o/',
  'Adventure',
  'Fun, jump, Skill',
  'https://img.gamemonetize.com/99gjodm9l46o7lbkuf26qhc54pxyzp1o/512x384.jpg',
  1920,
  1080,
  0,
  0
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category FROM games WHERE id = '65970'; 