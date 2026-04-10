<div align="center">

# INUNDE OPS

**Plataforma interna de gestão operacional, financeira e analítica**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.43-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](LICENSE)

*A "control tower" da INUNDE SARL — Guiné-Bissau*

</div>

---

## O que é o INUNDE OPS?

O **INUNDE OPS** é a plataforma web interna de controlo e gestão da [INUNDE SARL](https://inunde.app), o primeiro super app da Guiné-Bissau. Não é uma app pública — é a torre de controlo da equipa interna.

Centraliza em tempo real:
- Controlo financeiro (entradas, saídas, dívidas, capital dos sócios)
- Gestão de entregas e logística (iComida, iEntrega)
- Call center com registo rápido de chamadas
- Portal de motoboys com UX mobile-first
- Dashboard executivo com KPIs e gráficos
- Gestão de parceiros e relatórios exportáveis

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        INUNDE OPS                               │
│                    ops.inunde.app                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────────┐       ┌──────────────────────────────┐   │
│   │  FRONTEND        │       │  BACKEND                     │   │
│   │                  │       │                              │   │
│   │  Next.js 14      │◄─────►│  Supabase                    │   │
│   │  App Router      │       │  ├── PostgreSQL (DB)         │   │
│   │  TypeScript      │       │  ├── Auth (RLS por role)     │   │
│   │  Tailwind CSS    │       │  ├── Storage (uploads)       │   │
│   │  shadcn/ui       │       │  ├── Realtime (notif.)       │   │
│   │  Recharts        │       │  └── Edge Functions          │   │
│   │  TanStack Query  │       │                              │   │
│   └──────────────────┘       └──────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  LAYOUTS                                                │   │
│   │  /dashboard/*  → Sidebar (240px) + Header + Main       │   │
│   │  /login        → Centered card layout                  │   │
│   │  /my-*         → Portal do motoboy (mobile-first)      │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  DESIGN LIBS (Emil Kowalski)                            │   │
│   │  sonner → Toasts com feedback imediato                  │   │
│   │  vaul   → Bottom drawers para mobile                   │   │
│   │  cmdk   → Paleta de comandos (Cmd+K)                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│             Deploy: Vercel (CI/CD automático via GitHub)        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js (App Router) | 14.2 |
| Linguagem | TypeScript (strict) | 5.4 |
| Estilos | Tailwind CSS | 3.4 |
| Componentes | shadcn/ui + Radix UI | latest |
| Toasts | sonner (Emil Kowalski) | 1.7 |
| Drawers | vaul (Emil Kowalski) | 0.9 |
| Paleta de comandos | cmdk | 1.0 |
| Gráficos | Recharts | 2.12 |
| Forms | React Hook Form + Zod | 7.52 / 3.23 |
| Data fetching | TanStack Query | 5.40 |
| Datas | date-fns | 3.6 |
| Ícones | Lucide React | 0.395 |
| Base de dados | Supabase (PostgreSQL) | 2.43 |
| Auth | Supabase Auth (RLS) | — |
| Storage | Supabase Storage | — |
| Deploy | Vercel | — |

---

## Módulos MVP (Fase 1)

| # | Módulo | Descrição | Estado |
|---|--------|-----------|--------|
| M1 | Auth & Perfis | Login, roles, middleware de rotas, convite | ✅ |
| M2 | Dashboard Executivo | KPIs, gráficos, breakdown por vertical | ✅ |
| M3 | Financeiro | Entradas, saídas, aprovações, fechos diários | ✅ |
| M4 | Operações | Entregas CRUD, estados, atribuição motoboy | ✅ |
| M5 | Call Center | Registo rápido de chamadas, conversões | ✅ |
| M6 | Portal Motoboy | UX mobile-first, entregas do dia, despesas | ✅ |
| M7 | Dívidas | Reembolsos, pagamentos parciais, alertas | ✅ |
| M8 | Relatórios | Export Excel/PDF por período e categoria | ✅ |

**Fase 2 (próximo):** Capital dos sócios · Gestão de parceiros · RH & assiduidade · KPIs avançados · Notificações WhatsApp

---

## Roles e Acessos

| Role | Dashboard | Finanças | Operações | Call Center | Motoboy | Relatórios | Definições |
|------|:---------:|:--------:|:---------:|:-----------:|:-------:|:----------:|:----------:|
| `admin` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `ceo` | ✅ | ✅ | ✅ | ✅ | 👁 | ✅ | — |
| `board_member` | ✅ | 👁 | 👁 | — | — | ✅ | — |
| `finance` | ✅ | ✅ | 👁 | — | — | ✅ | — |
| `operations` | — | — | ✅ | ✅ | ✅ | — | — |
| `call_center` | — | — | 👁 | ✅ | — | — | — |
| `motorbike` | — | — | — | — | ✅ | — | — |
| `auditor` | 👁 | 👁 | 👁 | 👁 | — | 👁 | — |

*✅ Acesso completo · 👁 Só leitura · — Sem acesso*

---

## Setup Local

### Pré-requisitos

- Node.js 18+
- npm 9+
- Conta Supabase ([supabase.com](https://supabase.com))

### 1. Clonar e instalar

```bash
git clone https://github.com/atchutchi/app_interna_inunde.git
cd app_interna_inunde
npm install
```

### 2. Variáveis de ambiente

Criar `.env.local` na raiz (nunca commitar):

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
SUPABASE_SERVICE_ROLE_KEY=[service_role_key]
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Obter as chaves em **app.supabase.com → Settings → API**.

### 3. Base de dados

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login e ligar ao projecto
supabase login
supabase link --project-ref [project-id]

# Correr migrations
supabase db push

# Seed de desenvolvimento (opcional)
supabase db reset
```

### 4. Correr em desenvolvimento

```bash
npm run dev
# Abrir http://localhost:3000
```

### 5. Build de produção

```bash
npm run build
npm run start
```

---

## Estrutura do Projecto

```
src/
├── app/
│   ├── (auth)/               # Login, recuperação de password
│   ├── (dashboard)/          # Todas as páginas internas (protegidas)
│   │   ├── dashboard/        # M2 — Dashboard executivo
│   │   ├── finance/          # M3 — Módulo financeiro
│   │   │   ├── income/       # Entradas
│   │   │   ├── expenses/     # Saídas
│   │   │   ├── debts/        # Dívidas e reembolsos
│   │   │   └── shareholders/ # Capital dos sócios
│   │   ├── operations/       # M4 — Operações / Entregas
│   │   ├── call-center/      # M5 — Call center
│   │   ├── riders/           # M6 — Gestão de motoboys
│   │   ├── partners/         # Parceiros
│   │   ├── hr/               # RH e assiduidade
│   │   ├── reports/          # M8 — Relatórios
│   │   └── settings/         # Configurações e utilizadores
│   └── (rider-portal)/       # Portal simplificado (mobile-only)
│
├── components/
│   ├── ui/                   # shadcn/ui (gerado automaticamente)
│   ├── layout/               # Sidebar · Header · MobileNav · CommandMenu
│   ├── dashboard/            # KPICard · RevenueChart · VerticalBreakdown
│   ├── finance/              # EntryForm · EntryTable · DebtCard
│   ├── operations/           # DeliveryForm · DeliveryTable · StatusBadge
│   ├── call-center/          # CallForm (vaul drawer em mobile)
│   ├── riders/               # RiderCard · ExpenseForm
│   └── shared/               # UploadButton · ConfirmDialog · ExportButton
│
├── lib/
│   ├── supabase/             # client.ts · server.ts · middleware.ts
│   ├── utils.ts              # cn() · formatCurrency(XOF) · formatDate()
│   ├── constants.ts          # VERTICALS · ZONES · EXPENSE_CATEGORIES
│   └── validations/          # Schemas Zod por entidade
│
├── hooks/                    # useAuth · useDeliveries · useFinance · useRider
└── types/                    # database.types.ts · app.types.ts

supabase/
├── migrations/               # Schema SQL + RLS + triggers de auditoria
└── seed.sql                  # Dados de desenvolvimento (is_seed: true)
```

---

## Deploy

Deploy automático via **Vercel** integrado com GitHub:

| Branch | Ambiente | URL |
|--------|----------|-----|
| `main` | Produção | ops.inunde.app |
| `feature/*`, `claude/*` | Preview | *.vercel.app |

```bash
# Deploy manual (se necessário)
vercel --prod
```

Variáveis de ambiente configuradas no Vercel Dashboard (Production + Preview).

---

## Desenvolvimento

### Convenções de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:      Nova funcionalidade
fix:       Correcção de bug
refactor:  Refactoring sem alterar comportamento
chore:     Configuração, dependências, CI/CD
docs:      Apenas documentação
```

### Workflow de branches

```
main          → produção (protegida)
feature/*     → novas funcionalidades
fix/*         → correcções de bugs
claude/*      → sessões de desenvolvimento com Claude Code
```

### Comandos úteis

```bash
npm run dev          # Servidor de desenvolvimento (http://localhost:3000)
npm run build        # Build de produção
npm run lint         # ESLint (zero warnings em produção)
npm run type-check   # TypeScript sem emitir ficheiros
npm run format       # Prettier em todos os ficheiros
```

---

## Segurança

- **RLS activo** em todas as tabelas — utilizadores só vêem dados do seu tenant
- **SUPABASE_SERVICE_ROLE_KEY** exclusivamente server-side, jamais exposta no cliente
- **Uploads** validados por tipo (PDF, JPG, PNG) e tamanho (máx. 5 MB) antes de enviar
- **Zod** valida todos os inputs antes de qualquer operação na base de dados
- **Audit logs** automáticos via triggers PostgreSQL para todas as acções críticas
- **Multi-tenancy** via `tenant_id` em todas as tabelas — arquitectura SaaS-ready

---

## Sobre a INUNDE SARL

**INUNDE SARL** · Bissau, Guiné-Bissau · Fundada 2024

O primeiro super app da Guiné-Bissau com as verticais **iComida** (food delivery), **iEntrega** (logística on-demand), **iEventos** (bilheteira digital) e **iLugares** (guia turístico).

[inunde.app](https://inunde.app) · [geral@inunde.app](mailto:geral@inunde.app) · [Google Play](https://play.google.com/store/apps/details?id=com.bigtechnologies.inunde) · [App Store](https://apps.apple.com/sn/app/inunde/id6444089011)

---

<div align="center">
  <sub>INUNDE OPS — Construído com foco em qualidade, segurança e escalabilidade · INUNDE SARL © 2026</sub>
</div>
