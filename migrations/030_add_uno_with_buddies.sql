-- Migration: Adicionar jogo Uno com Amigos
-- Data: 2024-12-19

INSERT INTO games (
    id, 
    title, 
    description, 
    instructions, 
    url, 
    category, 
    tags, 
    thumb, 
    width, 
    height, 
    views, 
    likes, 
    page
) VALUES (
    'uno-com-amigos',
    'Uno com Amigos',
    'Uno com Amigos é um jogo de cartas clássico online que é fácil de aprender e impossível de largar. Jogue este divertido jogo de cartas com seus amigos ou contra jogadores do mundo todo.',
    'Use o mouse para jogar',
    'https://html5.gamemonetize.com/lbvo74xbqleti4uozsjm93ep18e9vcdx/',
    'Multiplayer',
    '1 Jogador, Arcade, Cartas, Cassino, Clássico, Multiplayer, Estratégia',
    'https://img.gamemonetize.com/lbvo74xbqleti4uozsjm93ep18e9vcdx/512x384.jpg',
    800,
    600,
    0,
    0,
    1
); 