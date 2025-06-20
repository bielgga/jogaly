-- Corrigir função para incrementar curtidas
DROP FUNCTION IF EXISTS increment_game_likes(TEXT);

CREATE OR REPLACE FUNCTION increment_game_likes(game_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    new_likes INTEGER;
    game_exists BOOLEAN;
BEGIN
    -- Verificar se o jogo existe
    SELECT EXISTS(SELECT 1 FROM games WHERE id = game_id) INTO game_exists;
    
    IF NOT game_exists THEN
        RAISE EXCEPTION 'Jogo com ID % não encontrado', game_id;
    END IF;
    
    -- Atualizar o jogo e obter o novo valor
    UPDATE games 
    SET likes = COALESCE(likes, 0) + 1 
    WHERE id = game_id;
    
    -- Buscar o novo valor
    SELECT likes INTO new_likes 
    FROM games 
    WHERE id = game_id;
    
    RETURN new_likes;
END;
$$ LANGUAGE plpgsql;

-- Comentário sobre a correção
COMMENT ON FUNCTION increment_game_likes(TEXT) IS 'Incrementa o número de curtidas de um jogo específico (versão corrigida)'; 