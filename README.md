# financial-agent-front

Modern React chat UI for a financial-analysis API. Switch between **Agent** mode (structured investment analysis) and **Search** mode (knowledge-base hits).

## Tech stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS 3** (dark, glassy design)
- **TanStack Query v5** (mutations, retries, cache)
- **Axios** (HTTP with error normalization)
- **lucide-react** icons, `clsx` + `tailwind-merge` helper

## Requirements

- Node.js `>= 20.19` (recommended `22.x`)
- npm `>= 10`

## Getting started

```bash
# 1. install dependencies
npm install

# 2. configure the API base URL
cp .env.example .env
# edit .env if your backend is not on http://localhost:8000

# 3. run the dev server
npm run dev
```

Open http://localhost:5173.

### Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server                |
| `npm run build`   | Type-check and produce a prod build  |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format source with Prettier          |

### Environment variables

| Name                 | Default                  | Description             |
| -------------------- | ------------------------ | ----------------------- |
| `VITE_API_BASE_URL`  | `http://localhost:8000`  | Base URL for the API    |

## API contract

### `POST /agent`

Request:

```json
{ "query": "Should I invest in AAPL?", "limit": 3 }
```

Response: `AgentResponse` with `ticker`, `fundamental_analysis`, `momentum_analysis`, `sentiment_analysis` and `final_recommendation`.

### `POST /search`

Request:

```json
{ "query": "AAPL earnings risks", "limit": 3, "filter": null }
```

Response:

```json
{ "results": [{ "score": 0.87, "text": "…", "metadata": {} }] }
```

Full TypeScript definitions live in [`src/types/api.ts`](src/types/api.ts).

## Project structure

```
src/
├── main.tsx              # bootstrap + React Query + ChatProvider
├── App.tsx
├── index.css             # Tailwind + design tokens
├── lib/
│   ├── cn.ts             # clsx + tailwind-merge helper
│   └── format.ts         # percent, color helpers for badges/bars
├── types/
│   └── api.ts            # API + chat message interfaces
├── services/
│   ├── http.ts           # axios instance + ApiError
│   └── api.ts            # postAgent, postSearch
├── hooks/
│   └── useQueryMode.ts   # unified send() w/ React Query mutations
├── state/
│   └── ChatContext.tsx   # messages, mode, limit (reducer)
└── components/
    ├── chat/             # shell, header, list, composer, bubbles
    ├── agent/            # AgentResult + 4 analysis sections + parts/
    └── search/           # SearchResult, cards, recursive MetadataViewer
```

## Features

- Two modes with an inline `ModeSelect` (Agent / Search) that persists per message via a `ModeBadge`.
- Enter sends, Shift+Enter inserts a newline; send button disabled while pending or empty.
- Configurable `limit` (1-20) sent with every request.
- Auto-scroll to the latest message, animated fade-in bubbles.
- Mode-aware **loading skeletons** and **error bubble** with a one-click retry.
- Empty state with clickable suggestions that pre-fill the composer.
- Agent response rendering:
  - **Ticker header** with action badge + confidence bar + time horizon.
  - **Final recommendation** card (BUY / HOLD / SELL), rationale, risks, opportunities.
  - **Fundamental** section with grade badge (A/B/C/D), confidence bar, thesis, strengths vs concerns.
  - **Momentum** section with pills for momentum / strength / outlook and a bipolar score bar.
  - **Sentiment** section with directional pill, bipolar score bar, news themes, catalysts, outlook.
- Search response rendering:
  - Banner clarifying results are not a final analysis.
  - Per-hit card with rank, score bar, expandable text and collapsible metadata.
  - Recursive **MetadataViewer** for arbitrary JSON metadata.

## Extending

- Add new modes: extend `QueryMode` in `src/types/api.ts`, add an API call in `src/services/api.ts`, and a branch in `useQueryMode.ts` + `AssistantMessage.tsx`.
- Persist history: swap `ChatContext`'s `useReducer` for a store (e.g. Zustand) and add `localStorage` in an effect.
- Server state cache: replace `useMutation` with `useQuery` keyed by `{ mode, query, limit }` if repeatable queries should be cached.
