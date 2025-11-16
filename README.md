# Claude Code Prompt Generator

Sistema gerador de prompts estruturados para Claude Code com agentes especializados.

## Stack Técnica

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v3.4
- **AI**: Vercel AI SDK
- **Database**: Supabase (auth + storage)
- **Model**: Claude Sonnet 4.5

## Arquitetura de Agentes

Sistema multiagente especializado:

- **Analyzer Agent** ✅ - Análise de código, auditoria, detecção de padrões
- **Refactor Agent** ✅ - Refatoração, otimização, mobile-first
- **Feature Agent** ✅ - Criação de features, CRUD, integrações
- **Debug Agent** ✅ - Debugging, testes, correções
- **Planner Agent** ✅ - Planejamento de tasks, breakdown, MCP integration

## Setup

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.local.example` para `.env.local` e preencha:

```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
# Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Supabase (opcional para primeira entrega)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Configurar Supabase (Opcional)

Execute o SQL em `supabase-schema.sql` no Supabase Dashboard para criar as tabelas.

### 4. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Como Usar

1. **Digite sua solicitação**: Descreva o que você quer que Claude Code faça
2. **Análise automática**: O sistema detecta o agente adequado
3. **Prompt gerado**: Receba um prompt estruturado pronto para usar no Claude Code
4. **Copie e use**: Clique em "Copy" e cole no Claude Code

## Estrutura do Projeto

```
/app
  /api
    /generate-prompt    # API para gerar prompts
    /analyze-query      # API para análise de queries
  layout.tsx
  page.tsx             # Página principal
/components
  /prompt-builder
    QueryInput.tsx     # Input da query
    AnalysisDisplay.tsx # Exibição da análise
    PromptDisplay.tsx  # Exibição do prompt
/lib
  /agents
    analyzer.ts        # Analyzer Agent
    index.ts          # Configuração de agentes
  /supabase
    client.ts         # Cliente Supabase
  /ai
    client.ts         # Cliente AI SDK
/types
  agents.ts           # Tipos dos agentes
  supabase.ts         # Tipos do Supabase
```

## Entrega Completa ✅

- [x] Setup Next.js 15 + Tailwind + Supabase
- [x] Implementar todos os 5 agentes especializados
- [x] Interface completa: input → análise → prompt gerado
- [x] Schema Supabase para prompts e templates
- [x] Sistema de análise automática de queries
- [x] Templates estruturados para cada agente
- [x] Design mobile-first responsivo

## Agentes Implementados

### 🔍 Analyzer Agent
Análise de código, auditoria de segurança, detecção de padrões, performance analysis

### ♻️ Refactor Agent
Refatoração de código, otimização de performance, conversão mobile-first, modernização

### ✨ Feature Agent
Criação de features, operações CRUD, integrações com APIs, componentes UI

### 🐛 Debug Agent
Debugging, correção de bugs, testes, error handling, memory leak detection

### 📋 Planner Agent
Planejamento de projetos, breakdown de tasks, integração MCP, estimativas

## Próximos Passos

1. Sistema de templates salvos no Supabase
2. Histórico de prompts gerados
3. Autenticação com Supabase Auth
4. Compartilhamento de templates públicos
5. Refinamento de prompts com feedback
6. Export de prompts em diferentes formatos

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint do código
```

## Licença

MIT
