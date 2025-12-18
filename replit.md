# Infinite Studio

## Overview

Infinite Studio is an AI filmmaking education platform that teaches creators how to produce professional-quality films using AI tools like Gemini, Nano Banana, and Veo. The platform includes structured courses (The Academy), an asset store for production resources, and a user dashboard for tracking progress. The frontend is built with React/TypeScript, and the backend uses Express.js with PostgreSQL via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack Query for server state, local state with React hooks
- **Styling**: Tailwind CSS with custom theme colors (obsidian, electricBlue, signalOrange, neonPurple)
- **UI Components**: Radix UI primitives with shadcn/ui styling, Lucide icons
- **Animations**: Framer Motion for transitions
- **Build Tool**: Vite

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Session Management**: express-session with PostgreSQL store (connect-pg-simple)
- **Authentication**: Session-based auth with bcryptjs for password hashing
- **Database Access**: Storage interface pattern abstracting Drizzle ORM operations

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Tables**: users, courses, lessons, enrollments, lessonProgress, assets, orders, orderItems
- **Migrations**: Managed via `drizzle-kit push`

### Key Design Patterns
1. **Shared Schema**: Database types and validation schemas live in `shared/` for type safety across frontend and backend
2. **Storage Interface**: `server/storage.ts` provides a clean abstraction over database operations
3. **API Client**: `client/src/lib/api.ts` wraps fetch calls with consistent error handling
4. **Query Client**: TanStack Query configured in `client/src/lib/queryClient.ts` for caching and data fetching

### Project Structure
- `client/` - React frontend application
- `server/` - Express backend (routes, storage, db connection)
- `shared/` - Shared types and database schema
- `attached_assets/` - HTML prototypes and design references

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe SQL query builder and schema definition
- **connect-pg-simple**: Session storage in PostgreSQL

### Authentication
- **bcryptjs**: Password hashing
- **express-session**: Session management with secure cookies

### Frontend Libraries
- **TanStack Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Recharts**: Charts for admin dashboard

### Build and Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the codebase