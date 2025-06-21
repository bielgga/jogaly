-- Migration: Adicionar jogo Ludo Multiplayer
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
    'ludo-multiplayer',
    'Ludo Multiplayer',
    'Ludo Online Multiplayer é o lugar perfeito para jogar jogos online com seus amigos. Com uma enorme seleção de jogos para escolher, você pode encontrar o jogo perfeito para jogar online. Role os dados e vença outros jogadores no tabuleiro de ludo. Para diversão multiplayer, o jogo ludo online para 4 jogadores é uma versão substituta do Jogo Real Ludo Multiplayer. Em períodos anteriores, este emocionante jogo era jogado entre reis e rainhas indianos. Você tem que pensar estrategicamente, pois o ludo online pode ser um ludo simples e depende muito da sorte. Ao pousar neles, você poderá enviar os tokens de outros jogadores de volta ao início. Além disso, você impedirá que os jogadores tirem tokens protegendo quadrados anotados com um símbolo de estrela. Tente acertar com uma jogada de sorte usando-o como um local seguro até que outros jogadores passem. Especialmente se você tiver vários tokens ativos. Para chegar ao meio do tabuleiro, role os dados e mova seus tokens. Você precisa primeiro tirar um seis no dado para colocar um de seus tokens no tabuleiro de jogo. Você pode ganhar o jogo quando chegar ao meio com todas as quatro peças.',
    'Use o botão esquerdo do mouse para rolar os dados. No celular, toque nos dados',
    'https://html5.gamemonetize.com/mdd14zrwngeri03nhxzh9prb28x3tcmv/',
    'Multiplayer',
    '2 Jogadores, Jogos para 2 Jogadores, 2D, Tabuleiro, Casual, Clássico, Jogos, H5, HTML5, Multiplayer',
    'https://img.gamemonetize.com/mdd14zrwngeri03nhxzh9prb28x3tcmv/512x384.jpg',
    720,
    1280,
    0,
    0,
    1
); 