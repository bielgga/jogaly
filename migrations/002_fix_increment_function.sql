-- Migration: Corrigir função de incremento de visualizações
-- Data: 2025-01-19
-- Descrição: Corrige possível problema na função increment_game_views

-- Remover função existente
DROP FUNCTION IF EXISTS increment_game_views(TEXT);

-- Criar função melhorada com mais controle
CREATE OR REPLACE FUNCTION increment_game_views(game_id TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_views INTEGER;
BEGIN
    -- Atualizar e retornar o novo valor
    UPDATE games 
    SET views = views + 1 
    WHERE id = game_id
    RETURNING views INTO new_views;
    
    -- Verificar se o jogo foi encontrado
    IF new_views IS NULL THEN
        RAISE EXCEPTION 'Jogo com ID % não encontrado', game_id;
    END IF;
    
    -- Retornar o novo número de visualizações
    RETURN new_views;
END;
$$;

-- Adicionar comentário na função
COMMENT ON FUNCTION increment_game_views(TEXT) IS 'Incrementa visualizações de um jogo e retorna o novo valor'; 