-- Migration 027: Adicionar Jogo da Lula Dinheiro Escondido na página 7
-- Criado: 2024
-- Descrição: Adiciona o jogo "Jogo da Lula Dinheiro Escondido" traduzido para português na página 7

INSERT INTO games (
  id, title, description, instructions, url, category, tags, thumb, width, height, views, likes, page
) VALUES 
(
  'jogo-da-lula-dinheiro-escondido',
  'Jogo da Lula Dinheiro Escondido',
  'Jogo da Lula Dinheiro Escondido é um jogo online gratuito de habilidade e objetos escondidos. Encontre o dinheiro escondido nas imagens especificadas. Cada nível tem 10 dinheiros escondidos. Há 8 níveis no total. O tempo é limitado, então seja rápido e encontre todos os objetos escondidos antes que o tempo acabe. Clicar no lugar errado várias vezes reduz o tempo em 5 segundos adicionais. Então, se você estiver pronto, comece o jogo e divirta-se!',
  'Use seu mouse para jogar ou toque na tela',
  'https://html5.gamemonetize.com/os1obpsp113v31iom4tbksso9me1d71v/',
  'Puzzle',
  'Diversão, Escondido, HTML5, Crianças, Mobile, Puzzle, Habilidade',
  'https://img.gamemonetize.com/os1obpsp113v31iom4tbksso9me1d71v/512x384.jpg',
  1280,
  720,
  0,
  0,
  7
); 