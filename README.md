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
- **Refactor Agent** (Em desenvolvimento) - Refatoração, otimização, mobile-first
- **Feature Agent** (Em desenvolvimento) - Criação de features, CRUD, integrações
- **Debug Agent** (Em desenvolvimento) - Debugging, testes, correções
- **Planner Agent** (Em desenvolvimento) - Planejamento de tasks, breakdown, MCP integration

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

## Primeira Entrega ✅

- [x] Setup Next.js 15 + Tailwind + Supabase
- [x] Implementar Analyzer Agent básico
- [x] Interface: input → análise → prompt gerado
- [x] Schema Supabase para prompts e templates

## Próximos Passos

1. Implementar agentes restantes (Refactor, Feature, Debug, Planner)
2. Sistema de templates salvos
3. Histórico de prompts
4. Autenticação com Supabase
5. Compartilhamento de templates
6. Refinamento de prompts com feedback

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint do código
```

## Licença

MIT
