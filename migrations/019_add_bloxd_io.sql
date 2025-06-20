-- Migration 019: Adicionar Bloxd.io na página 1
-- Adiciona 1 jogo na página 1

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
  'bloxd-io',
  'Bloxd.io',
  'O Bloxd.io é um jogo online com gráficos do Minecraft e vários modos de jogo. Os modos de jogo incluem parkour, criatividade sandbox e combate, dependendo do modo que você escolher para jogar. Entre neste mundo pixelado e explore diferentes aventuras!',
  'Use WASD para mover, mouse para olhar ao redor, espaço para pular',
  'https://bloxd.io/?skipPrerollFirstSession=true',
  'Multiplayer',
  'Minecraft, Multiplayer, Sandbox, Parkour, Combate, Criatividade, Online, Bloco, Pixel, Aventura',
  'https://imgs.crazygames.com/games/bloxdhop-io/cover_16x9-1709115453824.png?metadata=none&quality=85&width=675&fit=crop',
  800,
  600,
  1
); 