-- Migration 014: Set all existing games to page 1
-- Created: 2024
-- Description: Update all existing games to have page = 1

-- Definir todos os jogos existentes como página 1
UPDATE games SET page = 1 WHERE page IS NULL OR page != 1;

-- Verificar quantos jogos foram atualizados
SELECT COUNT(*) as total_jogos_pagina_1 FROM games WHERE page = 1; 