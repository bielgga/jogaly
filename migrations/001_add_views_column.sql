-- Migration: Adicionar coluna de visualizações
-- Data: 2025-01-19
-- Descrição: Adiciona coluna 'views' para contar visualizações dos jogos

-- Adicionar coluna views com valor padrão 0
ALTER TABLE games 
ADD COLUMN views INTEGER DEFAULT 0 NOT NULL;

-- Criar índice para melhor performance nas consultas de visualizações
CREATE INDEX idx_games_views ON games(views DESC);

-- Comentário na coluna para documentação
COMMENT ON COLUMN games.views IS 'Número total de visualizações do jogo';

-- Atualizar jogos existentes para ter 0 visualizações (caso não tenha sido aplicado pelo DEFAULT)
UPDATE games SET views = 0 WHERE views IS NULL;

-- Criar função para incrementar visualizações de forma segura
CREATE OR REPLACE FUNCTION increment_game_views(game_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE games 
  SET views = views + 1 
  WHERE id = game_id;
END;
$$; 