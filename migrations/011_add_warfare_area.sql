-- Migration 011: Add Warfare Area game and remove game ID 67621
-- Created: 2024
-- Description: Add "Área de Guerra" and remove game with ID 67621

-- Remove jogo antigo
DELETE FROM games WHERE id = '67621';

-- Adicionar novo jogo Warfare Area
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '1529',
  'Área de Guerra',
  'É guerra e os inimigos capturaram sua base. Você é o último soldado da sua tropa na base, então apenas você pode reconquistá-la. Pegue o rifle e prepare-se para a batalha.',
  'Desktop: Teclas de seta ou W A S D para mover o personagem. Mouse para virar o personagem, mirar e atirar. Mobile: Use o joystick na tela para mover, botão de fogo para atirar, toque e arraste no lado direito da tela para mirar e virar o personagem.',
  'https://html5.gamemonetize.com/3fnk3e4rstcjsqolnpx158fe8ptp74eb/',
  'Shooting',
  'Action, Army, Gun, HTML5, Killing, Mobile, Shooter, War',
  'https://img.gamemonetize.com/3fnk3e4rstcjsqolnpx158fe8ptp74eb/512x384.jpg',
  800,
  450,
  0,
  0
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category FROM games WHERE id = '1529'; 