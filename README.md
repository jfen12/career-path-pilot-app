# TalentPrimer

A SaaS platform to help companies identify and engage top internal talent.

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Hosting**: Vercel
- **Package Management**: pnpm workspaces
- **Build System**: Turborepo

## Project Structure

```
talent-primer/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # API routes
├── packages/         # Shared packages
│   ├── ui/          # Shared UI components
│   ├── config/      # Shared configuration
│   └── database/    # Database schema and types
└── infrastructure/  # Infrastructure as Code
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local` in each app directory
   - Fill in the required environment variables

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Development

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Run linting
- `pnpm format` - Format code with Prettier

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT
