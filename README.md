# 🎮 Friv Games - Site de Jogos Online

Um site moderno estilo Jogaly para jogos online, desenvolvido com Next.js, TypeScript, Tailwind CSS e Supabase.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados e backend
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase

## 🛠️ Instalação

1. **Clone o repositório ou use os arquivos criados**

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados Supabase:**
   
   Acesse seu projeto no [Supabase](https://supabase.com) e execute o seguinte SQL no editor:
   
   ```sql
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
   ```

4. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://trqrdrpbptpdfdyosqhw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRycXJkcnBicHRwZGZkeW9zcWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDcwODksImV4cCI6MjA2NTg4MzA4OX0.aVrm5hC1tv_Of73gA6f3lzUUfefP_VRJaISSJ9zfccc
   ```

5. **Execute o projeto:**
   ```bash
   npm run dev
   ```

6. **Acesse o site:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🎮 Funcionalidades

- ✅ **Grid responsivo de jogos** - Layout adaptável para diferentes telas
- ✅ **Busca em tempo real** - Pesquise jogos por título, descrição ou tags
- ✅ **Filtros por categoria** - Organize jogos por categoria
- ✅ **Modal de jogo** - Jogue diretamente no site em tela cheia
- ✅ **Design moderno** - Interface inspirada no Friv com cores vibrantes
- ✅ **Animações suaves** - Hover effects e transições
- ✅ **Otimizado para mobile** - Funciona perfeitamente em dispositivos móveis

## 🎨 Design

O design segue o estilo clássico do Friv com:
- Gradiente roxo/azul/verde como fundo
- Cards brancos com bordas arredondadas
- Hover effects com escala e sombras
- Tipografia Fredoka para um visual divertido
- Layout em grid responsivo

## 📱 Responsividade

- **Mobile:** 2 colunas
- **Tablet:** 3-4 colunas  
- **Desktop:** 5-6 colunas
- **Desktop grande:** 8 colunas

## 🔧 Personalização

Para adicionar mais jogos, edite o arquivo `src/app/page.tsx` e adicione novos objetos ao array `gamesData`, ou configure o Supabase para gerenciar os jogos dinamicamente.

## 📄 Licença

Este projeto é livre para uso pessoal e educacional.

---

Desenvolvido com ❤️ usando tecnologias modernas 