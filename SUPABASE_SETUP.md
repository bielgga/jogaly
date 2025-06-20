# 🚀 Guia de Migração 100% para Supabase

Seu projeto Jogaly Games foi migrado completamente para usar o Supabase como banco de dados. Siga este guia para configurar tudo.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Node.js instalado
3. Projeto Next.js funcionando

## 🔧 Configuração do Supabase

### 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha um nome para seu projeto
4. Anote a **URL** e **anon key** do projeto

### 2. Criar Tabela no Banco

1. No painel do Supabase, vá em **SQL Editor**
2. Execute o seguinte comando:

```sql
-- Criar tabela de jogos
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  url TEXT NOT NULL,
  category TEXT,
  tags TEXT,
  thumb TEXT,
  width TEXT,
  height TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_games_category ON games(category);
CREATE INDEX idx_games_title ON games(title);
CREATE INDEX idx_games_created_at ON games(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Allow public read access" ON games
FOR SELECT USING (true);

-- Política para permitir inserção (opcional, para admin)
CREATE POLICY "Allow authenticated insert" ON games
FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### 3. Configurar Variáveis de Ambiente

O arquivo `.env.local` já foi criado com suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://trqrdrpbptpdfdyosqhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE**: Nunca commite este arquivo para o Git! Ele já está no .gitignore.

## 📊 Popular o Banco de Dados

### Instalar Dependências

```bash
npm install
```

### Executar Script de População

```bash
npm run populate-db
```

Este script irá:
- ✅ Verificar conexão com Supabase
- 📊 Inserir todos os 18 jogos no banco
- 🔄 Atualizar jogos existentes se necessário
- 📈 Mostrar estatísticas da migração

## 🎮 Executar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## ✅ O que foi Migrado

### ❌ ANTES (Dados Hardcoded)
- Dados dos jogos espalhados em múltiplos arquivos
- Código duplicado
- Difícil manutenção
- Performance ruim

### ✅ DEPOIS (100% Supabase)
- **Página Principal**: Carrega jogos do Supabase
- **Página do Jogo**: Busca jogo individual + relacionados
- **Layout SEO**: Metadata dinâmica do banco
- **Tratamento de Erros**: Mensagens amigáveis
- **Performance**: Cache e otimizações
- **Escalabilidade**: Fácil adicionar novos jogos

## 🛠️ Funcionalidades Implementadas

### 📦 Service Layer (`src/lib/supabase.ts`)
- `getAllGames()` - Buscar todos os jogos
- `getGameById(id)` - Buscar jogo específico
- `getGamesByCategory(category)` - Jogos por categoria
- `getRelatedGames(id, category)` - Jogos relacionados
- `searchGames(query)` - Pesquisar jogos

### 🎯 Páginas Atualizadas
- `src/app/page.tsx` - Lista de jogos
- `src/app/game/[id]/page.tsx` - Página individual
- `src/app/game/[id]/layout.tsx` - SEO dinâmico

### 🔧 Scripts
- `src/scripts/populate-db.ts` - Popular banco
- `npm run populate-db` - Comando para executar

## 🚨 Troubleshooting

### Erro de Conexão
```
❌ Erro de conexão com Supabase
```
**Solução**: Verifique as variáveis no `.env.local`

### Tabela não existe
```
❌ relation "games" does not exist
```
**Solução**: Execute o SQL de criação da tabela no Supabase

### Sem jogos na tela
```
Nenhum jogo encontrado
```
**Solução**: Execute `npm run populate-db`

## 📈 Próximos Passos

1. **Admin Panel**: Criar interface para adicionar jogos
2. **Categorias**: Filtros por categoria
3. **Busca**: Implementar busca em tempo real
4. **Favoritos**: Sistema de jogos favoritos
5. **Analytics**: Tracking de jogos mais jogados

## 🎉 Pronto!

Seu site agora está 100% integrado com Supabase! 

- ✅ Dados dinâmicos
- ✅ Performance otimizada  
- ✅ Fácil manutenção
- ✅ Escalável
- ✅ SEO friendly

Execute `npm run dev` e aproveite! 🚀 