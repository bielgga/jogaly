-- Migration: Adicionar jogo Ping Pong Tênis de Mesa
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
    'ping-pong-tenis-de-mesa',
    'Ping Pong Tênis de Mesa',
    'Em Ping Pong: Tênis de Mesa, você entrará no emocionante mundo das partidas de tênis de mesa! Este jogo permite que você desfrute da diversão dos esportes! É um jogo casual perfeito para todo entusiasta de Ping Pong. A jogabilidade é simples e fácil de jogar. Controle a raquete de ping-pong, acerte a bola com precisão e reaja rapidamente! Em cada jogo, use habilidade e táticas. Vença seu oponente e lute por cada ponto. Seus oponentes ficarão mais difíceis, tente ajustar sua estratégia e encontrar suas fraquezas!',
    'Clique com o mouse ou toque para jogar',
    'https://html5.gamemonetize.com/92la82a07m5svdcghv5t1ytio7bf4q9j/',
    'Sports',
    'Casual, Jogos HTML5, Tênis, Esportes, Ping Pong',
    'https://img.gamemonetize.com/92la82a07m5svdcghv5t1ytio7bf4q9j/512x384.jpg',
    750,
    1624,
    0,
    0,
    1
); 