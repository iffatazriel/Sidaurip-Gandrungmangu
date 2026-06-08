# Sidaurip GDM

A Next.js 16 application for village financial transparency reporting.

## Architecture

```
┌────────────────────┐
│   Next.js App      │
│  (app router)      │
└────────┬───────────┘
         │
┌────────▼───────────┐
│  API Routes        │
│  - /api/penduduk   │
└────────┬───────────┘
         │
┌────────▼───────────┐
│  Prisma ORM        │
│  (PostgreSQL)      │
└────────┬───────────┘
         │
┌────────▼───────────┐
│  Supabase Auth     │
└────────────────────┘
```

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |
| `npm test` | Run Jest tests |
| `npm run format` | Format code with Prettier |

## Features

- **Transparency Dashboard**: Real-time financial data visualization with Maplibre GL
- **Resident Management**: CSV import with streaming + batch processing
- **Pagination API**: `/api/penduduk` endpoint for resident data
- **Authentication**: Supabase SSR integration
- **Structured Logging**: Pino-based logging for debugging

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |

## Testing

Tests are located in `__tests__/` directory. Run with:

```bash
npm test
```

## CI/CD

GitHub Actions workflow runs on push/PR to main:
- Lint
- Type check
- Test
- Build

See `.github/workflows/ci.yml`.