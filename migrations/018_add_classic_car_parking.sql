-- Migration 018: Adicionar Classic Car Parking 2025 na página 3
-- Adiciona 1 jogo traduzido para português na página 3

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
  '34176',
  'Estacionamento de Carros Clássicos 2025',
  'Estacionamento de Carros Clássicos 2025 desafia sua precisão e habilidades de direção com missões de estacionamento realistas! Assuma o controle de carros vintage e navegue por espaços apertados, pistas estreitas e obstáculos complicados. Domine cada nível estacionando perfeitamente sem acidentes. Não é apenas um jogo - é um verdadeiro teste de paciência e controle!',
  'WASD para dirigir o carro',
  'https://html5.gamemonetize.com/h2756112zb490g5tjjpoq6av147lo7i7/',
  'Action',
  'Carro, Estacionamento de Carro, Clássico, Direção, Mentolatux, Estacionamento, Habilidade, Unity, WebGL',
  'https://img.gamemonetize.com/h2756112zb490g5tjjpoq6av147lo7i7/512x384.jpg',
  800,
  600,
  3
); 