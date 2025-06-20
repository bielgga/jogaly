-- Migration 013: Add page column to games table
-- Created: 2024
-- Description: Add page column to filter games by page number and set all existing games to page 1

-- Adicionar coluna page
ALTER TABLE games ADD COLUMN page INTEGER DEFAULT 1;

-- Definir todos os jogos existentes como página 1
UPDATE games SET page = 1 WHERE page IS NULL;

-- Criar índice para melhor performance na busca por página
CREATE INDEX idx_games_page ON games(page);

-- Verificar se a coluna foi adicionada corretamente
SELECT COUNT(*) as total_jogos_pagina_1 FROM games WHERE page = 1; 