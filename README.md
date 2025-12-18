# Infinite Studio

AI Filmmaking Education Platform - Learn to create stunning AI-generated films using cutting-edge tools.

## Overview

Infinite Studio is a full-stack web application that offers:

- **The Academy** - Structured courses teaching AI filmmaking with Gemini, Nano Banana, and Veo
- **Production Showcase** - Horizontal carousel featuring completed AI-generated film projects
- **Asset Store** - Production-ready assets including textures, character sheets, and LUT packs
- **User Dashboard** - Track enrolled courses, progress, and purchased assets

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based auth with Passport.js
- **UI Components**: Radix UI, Lucide Icons, Framer Motion

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | `#2962FF` | Primary actions, educational content |
| Signal Orange | `#FF3D00` | Highlights, experimental content |
| Purple | `#a855f7` | Asset store, process/workflow content |
| Obsidian | `#0A0A0A` | Background |

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npm run db:push
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5000`

## Project Structure

```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities and API client
├── server/           # Express backend
│   ├── routes.ts     # API endpoints
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema definitions
```

## License

All rights reserved.
