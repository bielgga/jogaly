-- Migration: Adicionar jogo Pontos.io
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
    'pontos-io',
    'Pontos.io',
    'Pontos.io é um incrível jogo de batalha de pontos. Você começará como um pequeno ponto cinza. Evite pontos maiores e tente comer os pequenos. Uma vez que você ficar maior, encontrará muitos pontos para comer, mas sempre tenha cuidado com os maiores. Boa sorte!',
    'Toque ou segure e deslize para jogar',
    'https://html5.gamemonetize.com/luieuk312u2fyem7isdnwp8dl375cha8/',
    'Multiplayer',
    '.io, Jogos .io, Arcade, Hypercasual, Multiplayer',
    'https://img.gamemonetize.com/luieuk312u2fyem7isdnwp8dl375cha8/512x384.jpg',
    720,
    1280,
    0,
    0,
    1
); 