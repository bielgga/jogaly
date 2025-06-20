-- Adicionar coluna de curtidas na tabela games
ALTER TABLE games ADD COLUMN likes INTEGER DEFAULT 0;

-- Criar função para incrementar curtidas
CREATE OR REPLACE FUNCTION increment_game_likes(game_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    new_likes INTEGER;
BEGIN
    UPDATE games 
    SET likes = likes + 1 
    WHERE id = game_id;
    
    SELECT likes INTO new_likes 
    FROM games 
    WHERE id = game_id;
    
    RETURN new_likes;
END;
$$ LANGUAGE plpgsql;

-- Comentário sobre a migração
COMMENT ON COLUMN games.likes IS 'Número de curtidas (corações) do jogo';
COMMENT ON FUNCTION increment_game_likes(TEXT) IS 'Incrementa o número de curtidas (corações) de um jogo específico'; 