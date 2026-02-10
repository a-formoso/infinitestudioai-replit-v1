# Infinite Studio - AI Filmmaking Education Platform

## Overview

Infinite Studio is a full-stack AI filmmaking education platform that teaches creators how to produce professional-quality films using AI tools (Gemini, Nano Banana, Veo). The platform includes an Academy with structured courses, an Asset Store for production-ready materials, a user Dashboard for tracking progress, and an Admin Dashboard for content management.

The frontend UI is largely complete with many pages built out. The primary work remaining is backend completion: database seeding with real course/lesson/asset content, finishing API endpoints, wiring the frontend to live data, and implementing transaction flows (checkout, enrollment, progress tracking).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack Query v5 for server state, with a centralized `queryClient.ts` configuration
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin), with shadcn/ui components (Radix UI primitives + CVA)
- **Animations**: Framer Motion
- **Fonts**: Syncopate (headings) and Inter (body text)
- **Design System**: Dark theme with brand colors — Electric Blue (#2962FF), Signal Orange (#FF3D00), Neon Purple (#D500F9), Gold (#FFD700), Obsidian (#0A0A0A) background
- **API Layer**: Custom `apiFetch` wrapper in `client/src/lib/api.ts` that hits `/api/*` endpoints with credentials included
- **Key Pages**: Home, Academy, Course Detail (Level 1 & 2), Course Player, Dashboard, Asset Store, Checkout, Admin Dashboard, Hire, Support, About, Login, Register, Links, Privacy, Terms, Pipeline (AI Production Control Center)

### Backend Architecture
- **Runtime**: Node.js with TypeScript, using `tsx` for dev execution
- **Framework**: Express.js
- **API Pattern**: RESTful JSON API under `/api/*` prefix
- **Authentication**: Session-based auth using `express-session` with PostgreSQL session store (`connect-pg-simple`). Passwords hashed with `bcryptjs`. Sessions managed directly with `req.session.userId`.
- **Email Verification**: Resend integration sends verification emails on registration. Users must verify email before purchasing courses. `server/email.ts` handles Resend client + branded email templates. Verification flow: register → check email → click link → redirect back to checkout.
- **Session Storage**: PostgreSQL-backed via `connect-pg-simple` (auto-creates session table)
- **Route Registration**: All routes defined in `server/routes.ts` via `registerRoutes()` function
- **Storage Layer**: `server/storage.ts` provides an `IStorage` interface abstracting all database operations (users, courses, lessons, enrollments, progress, assets, orders)
- **Dev Server**: Vite dev server proxied through Express in development (`server/vite.ts`), static files served in production (`server/static.ts`)
- **Build**: Custom build script (`script/build.ts`) using Vite for client and esbuild for server, outputs to `dist/`

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-orm/node-postgres` driver
- **Schema Location**: `shared/schema.ts` — shared between client and server
- **Schema Push**: `npm run db:push` (uses `drizzle-kit push`)
- **Migrations**: Output to `./migrations` directory
- **Tables**:
  - `users` — id (UUID), username, password (hashed), email, emailVerified (bool), verificationToken, createdAt
  - `courses` — id (UUID), title, slug (unique), description, shortDescription, price, level, duration, lessonsCount, badge, color
  - `lessons` — id (UUID), courseId (FK), moduleNumber, moduleName, lessonNumber, title, videoUrl, duration
  - `enrollments` — id (UUID), userId (FK), courseId (FK), enrolledAt
  - `lesson_progress` — id (UUID), enrollmentId (FK), lessonId (FK), completed
  - `assets` — for store items (textures, character sheets, LUT packs)
  - `orders` — purchase records
  - `order_items` — individual items within orders
- **Validation**: Zod schemas auto-generated from Drizzle schema via `drizzle-zod` (`createInsertSchema`)
- **Seeding**: `server/seed.ts` contains seed data for courses, lessons, and assets — needs to be run to populate the database

### Project Structure
```
client/               # Frontend React app
  src/
    components/       # Shared components (navbar, footer, hero, features, ui/)
    hooks/            # Custom hooks (use-toast, use-mobile)
    lib/              # Utilities (api.ts, queryClient.ts, utils.ts)
    pages/            # Page components (one per route)
  public/             # Static assets
  index.html          # HTML entry point
server/               # Backend Express server
  index.ts            # Server entry point, session config, middleware
  routes.ts           # All API route definitions
  storage.ts          # Database access layer (IStorage interface)
  db.ts               # Drizzle + pg Pool setup
  seed.ts             # Database seeding script
  vite.ts             # Vite dev server integration
  static.ts           # Production static file serving
shared/               # Shared code between client and server
  schema.ts           # Drizzle schema + Zod validation schemas
attached_assets/      # HTML prototypes used as design reference
migrations/           # Drizzle migration files
```

### Key Design Decisions

1. **Shared schema**: The Drizzle schema lives in `shared/schema.ts` so both client and server can import types and validation schemas, ensuring type safety across the stack.

2. **Session-based auth over JWT**: Simpler implementation for an education platform where users interact through a browser. Sessions stored in PostgreSQL for persistence across server restarts.

3. **Storage interface pattern**: All database operations go through `server/storage.ts` which defines an `IStorage` interface. This makes it easy to swap implementations or mock for testing.

4. **Vite middleware in dev**: During development, Vite runs as Express middleware for HMR. In production, pre-built static files are served from `dist/public`.

5. **HTML prototypes as reference**: The `attached_assets/` directory contains static HTML mockups for every page. These serve as the design specification — the React components should match these designs.

## External Dependencies

### Database
- **PostgreSQL**: Required. Connected via `DATABASE_URL` environment variable. Used for all application data and session storage.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: ORM and migration tooling for PostgreSQL
- **express-session** + **connect-pg-simple**: Session management with PostgreSQL backing store
- **bcryptjs**: Password hashing
- **zod** + **drizzle-zod**: Runtime validation
- **@tanstack/react-query**: Server state management on the client
- **wouter**: Client-side routing
- **framer-motion**: Animations
- **Radix UI**: Accessible UI primitives (via shadcn/ui)
- **recharts**: Charts for admin dashboard
- **nanoid**: Unique ID generation

### Fonts (External CDN)
- Google Fonts: Inter (body) and Syncopate (headings)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner`: Dev tooling (only in development on Replit)

### No External Payment Provider
- Checkout flow currently simulates payment — no Stripe or other payment gateway is integrated yet. The checkout page collects card details visually but enrollment happens directly via API call.
- Checkout is accessible without login. Pay button redirects to register if not authenticated.
- After registration, email verification is required before purchasing. Successful payment redirects to /course/player.
- Regular login (not from checkout) redirects to /dashboard.