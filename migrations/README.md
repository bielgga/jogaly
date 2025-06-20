# 📊 Migrations do Banco de Dados

Este diretório contém as migrations SQL para o banco de dados do projeto Jogaly Games.

## 🚀 Como Executar uma Migration

### 1. **Acesse o Supabase Dashboard**
- Vá para [https://supabase.com](https://supabase.com)
- Faça login e selecione seu projeto
- Vá em **SQL Editor** no menu lateral

### 2. **Execute o Código SQL**
- Abra o arquivo da migration que deseja executar
- Copie todo o código SQL
- Cole no SQL Editor do Supabase
- Clique em **Run** para executar

## 📋 Migrations Disponíveis

### `001_add_views_column.sql`
**Descrição:** Adiciona sistema de visualizações para os jogos

**O que faz:**
- ✅ Adiciona coluna `views` na tabela `games`
- ✅ Cria índice para performance
- ✅ Cria função `increment_game_views()` para incrementar visualizações
- ✅ Inicializa jogos existentes com 0 visualizações

**Comando para executar:**
```bash
# Copie o conteúdo do arquivo 001_add_views_column.sql
# Cole no SQL Editor do Supabase
# Clique em Run
```

### `002_fix_increment_function.sql`
**Descrição:** Corrige a função de incremento de visualizações para funcionar corretamente.

**O que faz:**
- ✅ Corrige a função de incremento de visualizações para funcionar corretamente

**Comando para executar:**
```bash
# Copie o conteúdo do arquivo 002_fix_increment_function.sql
# Cole no SQL Editor do Supabase
# Clique em Run
```

### `003_add_likes_column.sql`
**Descrição:** Adiciona a coluna `likes` na tabela `games` e cria a função `increment_game_likes`.

**O que faz:**
- ✅ Adiciona coluna `likes` na tabela `games`
- ✅ Cria função `increment_game_likes()` para incrementar curtidas

**Comando para executar:**
```bash
# Copie o conteúdo do arquivo 003_add_likes_column.sql
# Cole no SQL Editor do Supabase
# Clique em Run
```

## ⚠️ Importante

- **Sempre faça backup** antes de executar migrations em produção
- **Execute as migrations em ordem** (001, 002, 003...)
- **Teste primeiro** em um ambiente de desenvolvimento
- **Verifique os logs** após executar para confirmar sucesso

## 🔍 Verificação Pós-Migration

Após executar a migration `001_add_views_column.sql`, você pode verificar se funcionou:

```sql
-- Verificar se a coluna foi criada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'views';

-- Verificar se a função foi criada
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'increment_game_views';

-- Testar a função
SELECT increment_game_views('67621');
SELECT views FROM games WHERE id = '67621';
```

Após executar a migration `002_fix_increment_function.sql`, você pode verificar se a função foi corrigida:

```sql
-- Verificar se a função foi corrigida
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'increment_game_views';

-- Testar a função
SELECT increment_game_views('67621');
SELECT views FROM games WHERE id = '67621';
```

Após executar a migration `003_add_likes_column.sql`, você pode verificar se a coluna `likes` foi criada:

```sql
-- Verificar se a coluna foi criada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'likes';

-- Verificar se a função foi criada
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'increment_game_likes';

-- Testar a função
SELECT increment_game_likes('67621');
SELECT likes FROM games WHERE id = '67621';
``` 