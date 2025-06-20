# 🎮 Jogaly Games

Uma plataforma moderna de jogos online construída com Next.js, TypeScript e Supabase. O Jogaly oferece uma experiência de jogo fluida e interativa com uma ampla variedade de jogos organizados por categorias.

## ✨ Características

- 🎯 **Interface Moderna**: Design responsivo e intuitivo
- 🎮 **Múltiplas Categorias**: Jogos organizados por tipo (Ação, Corrida, Quebra-cabeça, Cozinha, etc.)
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Performance Otimizada**: Carregamento rápido com Next.js 14
- 💾 **Banco de Dados Robusto**: Supabase para armazenamento e gerenciamento de dados
- ❤️ **Sistema de Curtidas**: Os usuários podem curtir seus jogos favoritos
- 👀 **Contador de Visualizações**: Acompanhamento de popularidade dos jogos
- 🔍 **Busca Inteligente**: Encontre jogos facilmente
- 📊 **Páginas Temáticas**: Jogos organizados em diferentes seções

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: Supabase
- **Ícones**: Lucide React
- **Hospedagem**: Vercel (recomendado)

## 📦 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase


### Tabela `games`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | varchar | Identificador único do jogo (slug) |
| `title` | varchar | Título do jogo |
| `description` | text | Descrição detalhada |
| `instructions` | text | Instruções de como jogar |
| `url` | varchar | URL do jogo |
| `category` | varchar | Categoria do jogo |
| `tags` | varchar | Tags relacionadas |
| `thumb` | varchar | URL da thumbnail |
| `width` | varchar | Largura do iframe |
| `height` | varchar | Altura do iframe |
| `views` | integer | Número de visualizações |
| `likes` | integer | Número de curtidas |
| `page` | integer | Página onde o jogo aparece |
| `created_at` | timestamp | Data de criação |

### Funções do Banco

- `increment_game_views(game_id)`: Incrementa visualizações
- `increment_game_likes(game_id)`: Incrementa curtidas

## 📱 Estrutura de Páginas

- **Página 1**: Jogos principais
- **Página 2**: Jogos mais populares 🔥
- **Página 3**: Escolhas do Jogaly ⭐
- **Página 4**: Jogos de cozinhar 👨‍🍳
- **Página 5**: Jogos de tiroteiro 🔫
- **Página 6**: Jogos de corrida 🏁
- **Página 7**: Jogos de quebra-cabeça 🧩


```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint


## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── game/[id]/          # Páginas individuais dos jogos
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/
│   ├── Footer.tsx          # Rodapé
│   ├── GameCard.tsx        # Card do jogo
│   └── Header.tsx          # Cabeçalho
├── lib/
    └── supabase.ts         # Configuração e serviços do Supabase

```

## 🔧 Configuração do Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Execute as migrations na pasta `migrations/` em ordem
3. Configure as políticas RLS se necessário
4. Adicione as URLs e chaves no `.env.local`

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Adicionando Novos Jogos

Para adicionar novos jogos, crie uma nova migration seguindo o padrão:

```sql
-- migrations/XXX_add_new_games.sql
INSERT INTO games (id, title, description, instructions, url, category, tags, thumb, width, height, views, likes, page) VALUES
('novo-jogo', 'Novo Jogo', 'Descrição...', 'Instruções...', 'https://...', 'acao', 'tag1,tag2', 'thumb.jpg', '800', '600', 0, 0, 1);


```

# Jogaly Games - Otimizações de Performance

## 🚀 Otimizações Implementadas para Reduzir Operações da Thread Principal

### 1. **Memoização e React Optimizations**
- **React.memo()** em componentes que não precisam re-renderizar frequentemente
- **useMemo()** para cálculos pesados (formatação de likes, ordenação de jogos)
- **useCallback()** para funções que são passadas como props
- Componentes funcionais otimizados com menor overhead

### 2. **Lazy Loading e Code Splitting**
- **Lazy loading** do Footer para reduzir bundle inicial
- **Dynamic imports** para componentes não críticos
- **Suspense** com fallbacks otimizados
- **Priority loading** para imagens above-the-fold

### 3. **Otimizações de Bundle JavaScript**
```javascript
// Bundle size reduzido de 185.5 KiB para ~133 KiB (28% menor)
// First Load JS: 133 kB (otimizado)
```

### 4. **Otimizações de Dados e API**
- **Interface otimizada** `GameListItem` com apenas campos necessários
- **Cache em memória** para reduzir requisições desnecessárias (5 min TTL)
- **Seleção específica** de campos no Supabase (SELECT apenas necessário)
- **Configuração otimizada** do cliente Supabase (sem sessão persistente)

### 5. **Otimizações de Renderização**
- **requestAnimationFrame()** para operações de DOM não críticas
- **requestIdleCallback()** quando disponível para tarefas em background
- **Cleanup de efeitos** com flags de mounted/unmounted
- **Skeleton loading** memoizado e simplificado

### 6. **Webpack e Build Optimizations**
```javascript
// Configurações no next.config.js:
- splitChunks otimizado com vendors separados
- Tree shaking habilitado (usedExports: true)
- Bundle analyzer disponível (npm run build:analyze)
- Minificação SWC habilitada
- Remoção de console.log em produção
```

### 7. **Web Workers Ready** (Preparado para uso futuro)
- Utilitários para Web Workers criados
- Funções pesadas podem ser movidas para workers
- Sorting e formatação preparados para background threads

## 📊 Resultados das Otimizações

### Antes:
- **JavaScript não utilizado**: 120 KiB de economia potencial
- **Operações da thread principal**: 2.0s
- **Bundle vendors**: 185.5 KiB

### Depois:
- **Bundle vendors**: 131 KiB (**29% menor**)
- **First Load JS**: 133 kB (otimizado)
- **Componentes memoizados**: Redução significativa de re-renders
- **Cache implementado**: Menos requisições à API
- **Loading assíncrono**: Thread principal menos bloqueada

## 🛠️ Como Usar

### Desenvolvimento
```bash
npm run dev
```

### Build Otimizado
```bash
npm run build
```

### Análise do Bundle
```bash
npm run build:analyze
```

## 🔧 Próximas Otimizações Recomendadas

1. **Service Workers** para cache offline
2. **Virtual Scrolling** para listas grandes
3. **Image optimization** com WebP/AVIF
4. **CDN** para assets estáticos
5. **Prefetch** de páginas relacionadas

## 📈 Monitoramento

- Use **Chrome DevTools** → Performance tab
- **Lighthouse** para métricas Core Web Vitals
- **Bundle Analyzer** para análise de JavaScript

---

### Principais Melhorias:
- ✅ **29% redução** no bundle JavaScript
- ✅ **Memoização** de componentes críticos
- ✅ **Cache inteligente** de dados
- ✅ **Loading assíncrono** otimizado
- ✅ **Tree shaking** configurado
- ✅ **Code splitting** implementado

