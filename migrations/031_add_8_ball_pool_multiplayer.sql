-- Migration: Adicionar jogo Sinuca 8 Ball Multiplayer
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
    'sinuca-8-ball-multiplayer',
    'Sinuca 8 Ball Multiplayer',
    'Sinuca 8 Ball introduziu um novo sistema de níveis para mantê-lo entretido. Com este novo sistema, você sempre enfrentará um desafio e terá acesso a locais de partida mais exclusivos, onde joga apenas contra os melhores jogadores de sinuca. Você também pode competir em torneios e ganhar recompensas que melhoram sua classificação.',
    'Arraste para acertar a bola',
    'https://html5.gamemonetize.com/458lt7ogtg7d3yoscko40xjq0cykodr6/',
    'Multiplayer',
    '2 Jogadores, Jogos para 2 Jogadores, Sinuca 8 Ball, Arcade, Tabuleiro, H5, Multiplayer',
    'https://img.gamemonetize.com/458lt7ogtg7d3yoscko40xjq0cykodr6/512x384.jpg',
    1920,
    1080,
    0,
    0,
    1
); 