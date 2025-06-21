-- Migration: Adicionar jogo Dominó Clássico Duelo
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
    'domino-classico-duelo',
    'Dominó Clássico Duelo',
    'Um jogo de tabuleiro no qual é construída uma cadeia de dominós (pedras, ossos), tocando metades com o mesmo número de pontos indicando a pontuação. Você pode jogar contra inteligência artificial ou com um oponente online no modo multiplayer. Um conjunto clássico tem 28 dominós, também chamados de pedras ou ossos. Estes retângulos são divididos em 2 partes, cada uma com pontos de 0 a 6. Dois jogadores participam do jogo. No início, 7 pedras são distribuídas para cada jogador. As restantes ficam de reserva, com o lado limpo para cima (no mercado). O jogador que tem o duplo 6-6 começa, colocando uma pedra. Os próximos jogadores colocam suas peças.',
    'Clique com o mouse ou toque para jogar',
    'https://html5.gamemonetize.com/l3njgmefn0e3h9ih3zyhyctgjj2jlpsv/',
    'Multiplayer',
    '2 Jogadores, Jogos para 2 Jogadores, Tabuleiro, Clássico, Multiplayer, jogos para dois jogadores',
    'https://img.gamemonetize.com/l3njgmefn0e3h9ih3zyhyctgjj2jlpsv/512x384.jpg',
    800,
    600,
    0,
    0,
    1
); 