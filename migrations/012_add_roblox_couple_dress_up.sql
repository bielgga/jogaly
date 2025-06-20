-- Migration 012: Add Roblox Couple Dress up game and remove game ID 67609
-- Created: 2024
-- Description: Add "Vestir Casal Roblox" and remove game with ID 67609

-- Remove jogo antigo
DELETE FROM games WHERE id = '67609';

-- Adicionar novo jogo Roblox Couple Dress up
INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes
) VALUES 
(
  '65905',
  'Vestir Casal Roblox',
  'Prepare-se para liberar sua criatividade com Vestir Casal Roblox, um jogo de moda divertido e emocionante onde você pode criar os looks perfeitos para personagens do Roblox. Seja vestindo para um dia casual ou um evento glamouroso, as possibilidades são infinitas. Escolha entre uma variedade de roupas da moda, acessórios e penteados para criar o look perfeito para o casal. Perfeito para entusiastas da moda e fãs do Roblox, este jogo de vestir traz seus sonhos de moda virtual à vida!',
  'Clique com o Botão Esquerdo do Mouse',
  'https://html5.gamemonetize.com/o3d0s6ul608rk9dm4ius3tax6s2w5src/',
  'Girls',
  'Cute, Dress Up, Fashion',
  'https://img.gamemonetize.com/o3d0s6ul608rk9dm4ius3tax6s2w5src/512x384.jpg',
  800,
  600,
  0,
  0
);

-- Verificar se o jogo foi adicionado corretamente
SELECT id, title, category FROM games WHERE id = '65905'; 