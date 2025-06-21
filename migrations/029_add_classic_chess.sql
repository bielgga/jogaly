-- Migration: Adicionar jogo Xadrez Clássico
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
    'xadrez-classico',
    'Xadrez Clássico',
    'O xadrez clássico é um jogo de tabuleiro para dois jogadores jogado em um tabuleiro de xadrez com 64 casas organizadas em fileiras de uma grade 8x8. Cada jogador começa com 16 peças: incluindo um rei, uma rainha, dois cavalos, duas torres, dois bispos e oito peões. O objetivo deste jogo de xadrez é dar xeque-mate no rei do oponente, colocando-o em perigo iminente de ser capturado. O jogo pode ser jogado contra inteligência artificial ou junto com outra pessoa no mesmo dispositivo. O jogo também tem a capacidade de resolver problemas de xadrez.',
    'Clique com o mouse ou toque para jogar',
    'https://html5.gamemonetize.com/4ntoq6issim7yfpyk52gtf7v8dowre4s/',
    'Puzzle',
    'Tabuleiro, Estratégia, Clássico, Xadrez, Quebra-cabeça',
    'https://img.gamemonetize.com/4ntoq6issim7yfpyk52gtf7v8dowre4s/512x384.jpg',
    800,
    600,
    0,
    0,
    7
); 