# Infinite Studio - Backend Integration Master Specification

## Project Overview

**Infinite Studio** is an AI filmmaking education platform that teaches creators how to produce professional-quality films using AI tools (Gemini, Nano Banana, Veo). This document provides the complete technical specification for full backend integration.

---

## 1. Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Runtime | Node.js | 20.x |
| Language | TypeScript | 5.x |
| Framework | Express.js | 4.x |
| Database | PostgreSQL | 15.x |
| ORM | Drizzle ORM | Latest |
| Authentication | express-session + bcryptjs | Session-based |
| Validation | Zod | Latest |
| Frontend State | TanStack Query | v5 |

---

## 2. Database Schema

### 2.1 Users Table
```typescript
users = {
  id: varchar (UUID, primary key, auto-generated),
  username: text (unique, required),
  password: text (hashed with bcrypt, required),
  email: text (unique, required),
  createdAt: timestamp (auto-generated)
}
```

### 2.2 Courses Table
```typescript
courses = {
  id: varchar (UUID, primary key, auto-generated),
  title: text (required),
  slug: text (unique, required) // e.g., "level-1", "level-2"
  description: text (required),
  shortDescription: text (required),
  price: numeric(10,2) (required),
  level: text (required), // "01", "02"
  duration: text (required), // "4.5 HOURS"
  lessonsCount: integer (required),
  badge: text (optional), // "NEW", "POPULAR"
  color: text (required) // "electricBlue", "signalOrange"
}
```

### 2.3 Lessons Table
```typescript
lessons = {
  id: varchar (UUID, primary key, auto-generated),
  courseId: varchar (foreign key -> courses.id, required),
  moduleNumber: integer (required),
  moduleName: text (required),
  lessonNumber: integer (required),
  title: text (required),
  videoUrl: text (optional),
  duration: integer (minutes, optional)
}
```

### 2.4 Enrollments Table
```typescript
enrollments = {
  id: varchar (UUID, primary key, auto-generated),
  userId: varchar (foreign key -> users.id, required),
  courseId: varchar (foreign key -> courses.id, required),
  enrolledAt: timestamp (auto-generated)
}
```

### 2.5 Lesson Progress Table
```typescript
lessonProgress = {
  id: varchar (UUID, primary key, auto-generated),
  enrollmentId: varchar (foreign key -> enrollments.id, required),
  lessonId: varchar (foreign key -> lessons.id, required),
  completed: boolean (default false),
  completedAt: timestamp (optional)
}
```

### 2.6 Assets Table
```typescript
assets = {
  id: varchar (UUID, primary key, auto-generated),
  title: text (required),
  description: text (required),
  price: numeric(10,2) (required),
  category: text (required), // "textures", "characters", "luts", "sound"
  badge: text (optional), // "NEW", "POPULAR"
  imageUrl: text (optional),
  fileFormat: text (required), // "PNG", "ZIP", "CUBE"
  fileSize: text (optional),
  color: text (required) // "purple-500"
}
```

### 2.7 Orders Table
```typescript
orders = {
  id: varchar (UUID, primary key, auto-generated),
  userId: varchar (foreign key -> users.id, required),
  totalAmount: numeric(10,2) (required),
  status: text (default "pending"), // "pending", "completed", "failed"
  createdAt: timestamp (auto-generated)
}
```

### 2.8 Order Items Table
```typescript
orderItems = {
  id: varchar (UUID, primary key, auto-generated),
  orderId: varchar (foreign key -> orders.id, required),
  itemType: text (required), // "course" or "asset"
  itemId: varchar (required), // course.id or asset.id
  price: numeric(10,2) (required)
}
```

---

## 3. API Endpoints

### 3.1 Authentication (IMPLEMENTED)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

#### Request/Response Examples:

**POST /api/auth/register**
```json
// Request
{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response (201)
{
  "user": {
    "id": "uuid",
    "username": "johnsmith",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

**POST /api/auth/login**
```json
// Request
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response (200)
{
  "user": {
    "id": "uuid",
    "username": "johnsmith",
    "email": "john@example.com"
  }
}
```

---

### 3.2 Courses (IMPLEMENTED)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courses` | Get all courses | No |
| GET | `/api/courses/:slug` | Get course by slug with lessons | No |

#### Request/Response Examples:

**GET /api/courses**
```json
// Response (200)
{
  "courses": [
    {
      "id": "uuid",
      "title": "MASTER THE GOOGLE ECOSYSTEM",
      "slug": "level-1",
      "description": "The foundational course...",
      "shortDescription": "Learn Gemini, Nano Banana, and Veo",
      "price": "149.00",
      "level": "01",
      "duration": "4.5 HOURS",
      "lessonsCount": 24,
      "badge": null,
      "color": "electricBlue"
    }
  ]
}
```

**GET /api/courses/level-1**
```json
// Response (200)
{
  "course": { /* course object */ },
  "lessons": [
    {
      "id": "uuid",
      "courseId": "uuid",
      "moduleNumber": 1,
      "moduleName": "Getting Started",
      "lessonNumber": 1,
      "title": "Welcome to the Academy",
      "videoUrl": "https://...",
      "duration": 5
    }
  ]
}
```

---

### 3.3 Enrollments (IMPLEMENTED)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/enrollments` | Get user's enrollments with progress | Yes |
| POST | `/api/enrollments` | Enroll in a course | Yes |

#### Request/Response Examples:

**GET /api/enrollments**
```json
// Response (200)
{
  "enrollments": [
    {
      "id": "uuid",
      "userId": "uuid",
      "courseId": "uuid",
      "enrolledAt": "2025-01-01T00:00:00Z",
      "course": { /* course object */ },
      "progress": {
        "total": 24,
        "completed": 8,
        "percentage": 33
      }
    }
  ]
}
```

**POST /api/enrollments**
```json
// Request
{
  "courseId": "uuid"
}

// Response (201)
{
  "enrollment": {
    "id": "uuid",
    "userId": "uuid",
    "courseId": "uuid",
    "enrolledAt": "2025-01-01T00:00:00Z"
  }
}
```

---

### 3.4 Progress Tracking (IMPLEMENTED)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/enrollments/:enrollmentId/progress` | Get lesson progress | Yes |
| POST | `/api/progress` | Update lesson progress | Yes |

#### Request/Response Examples:

**POST /api/progress**
```json
// Request
{
  "enrollmentId": "uuid",
  "lessonId": "uuid",
  "completed": true
}

// Response (200)
{
  "progress": {
    "id": "uuid",
    "enrollmentId": "uuid",
    "lessonId": "uuid",
    "completed": true,
    "completedAt": "2025-01-01T00:00:00Z"
  }
}
```

---

### 3.5 Assets (IMPLEMENTED)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/assets` | Get all assets | No |
| GET | `/api/assets/:id` | Get asset by ID | No |

#### Request/Response Examples:

**GET /api/assets**
```json
// Response (200)
{
  "assets": [
    {
      "id": "uuid",
      "title": "CYBERPUNK TEXTURES VOL. 1",
      "description": "50+ Nano Banana Generated Surfaces",
      "price": "29.00",
      "category": "textures",
      "badge": "NEW",
      "imageUrl": "https://...",
      "fileFormat": "PNG",
      "fileSize": "2.4 GB",
      "color": "purple-500"
    }
  ]
}
```

---

### 3.6 Orders (IMPLEMENTED)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/orders` | Get user's orders | Yes |
| POST | `/api/orders` | Create order (checkout) | Yes |

#### Request/Response Examples:

**POST /api/orders**
```json
// Request
{
  "items": [
    { "itemType": "course", "itemId": "uuid" },
    { "itemType": "asset", "itemId": "uuid" }
  ]
}

// Response (201)
{
  "order": {
    "id": "uuid",
    "userId": "uuid",
    "totalAmount": "178.00",
    "status": "completed",
    "createdAt": "2025-01-01T00:00:00Z"
  },
  "items": [
    {
      "id": "uuid",
      "orderId": "uuid",
      "itemType": "course",
      "itemId": "uuid",
      "price": "149.00"
    }
  ]
}
```

---

## 4. Seed Data Requirements

### 4.1 Courses to Seed

**Course 1: Level 1**
```json
{
  "title": "MASTER THE GOOGLE ECOSYSTEM",
  "slug": "level-1",
  "description": "The foundational course. Learn the connected workflow of Gemini, Nano Banana (Gemini 3 Pro Preview), and Veo. Stop using fragmented tools. Learn to run a complete Hollywood-style studio from your browser.",
  "shortDescription": "Learn Gemini, Nano Banana, and Veo",
  "price": "149.00",
  "level": "01",
  "duration": "4.5 HOURS",
  "lessonsCount": 24,
  "badge": null,
  "color": "electricBlue"
}
```

**Course 2: Level 2**
```json
{
  "title": "ADVANCED AI CINEMATOGRAPHY",
  "slug": "level-2",
  "description": "Mastering physics, compound camera moves, and the uncanny valley in Veo 3.1. Deep dive into motion control, advanced prompting, and professional-grade AI filmmaking techniques.",
  "shortDescription": "Master Veo 3.1 cinematography",
  "price": "199.00",
  "level": "02",
  "duration": "6.0 HOURS",
  "lessonsCount": 32,
  "badge": null,
  "color": "signalOrange"
}
```

### 4.2 Lessons to Seed (Level 1 Example)

| Module | Module Name | Lessons |
|--------|-------------|---------|
| 1 | The Ecosystem Overview | 1.1 Welcome, 1.2 Setting Up, 1.3 Interface Tour |
| 2 | Mastering Gemini | 2.1 Intro to Nano Banana, 2.2 Prompt Engineering, 2.3 Image Generation |
| 3 | Character Creation | 3.1 Character Sheets, 3.2 Consistency Techniques, 3.3 Digital Actors |
| 4 | Introduction to Veo | 4.1 Veo Interface, 4.2 First Video, 4.3 Ingredients System |
| 5 | The Connected Workflow | 5.1 Full Pipeline, 5.2 Project Walkthrough, 5.3 Final Export |

### 4.3 Assets to Seed

| Title | Category | Price | Format |
|-------|----------|-------|--------|
| CYBERPUNK TEXTURES VOL. 1 | textures | $29 | PNG |
| SCI-FI CHARACTER SHEETS | characters | $49 | PNG |
| CINEMATIC LUTS PACK | luts | $19 | CUBE |
| AMBIENT SOUNDSCAPES | sound | $39 | WAV |
| NEON CITY BACKGROUNDS | textures | $35 | PNG |
| FANTASY CHARACTER PACK | characters | $59 | PNG |

---

## 5. Frontend Integration Points

### 5.1 Pages Requiring API Integration

| Page | Current State | Required API Calls |
|------|---------------|-------------------|
| Homepage | Hardcoded courses | `GET /api/courses` |
| Course Level 1 | Hardcoded content | `GET /api/courses/level-1` |
| Course Level 2 | Hardcoded content | `GET /api/courses/level-2` |
| Asset Store | Hardcoded assets | `GET /api/assets` |
| Dashboard | Partially integrated | `GET /api/enrollments`, `GET /api/orders` |
| Course Player | Hardcoded lessons | `GET /api/courses/:slug`, `POST /api/progress` |
| Checkout | Needs order creation | `POST /api/orders` |

### 5.2 TanStack Query Hooks Needed

```typescript
// Courses
useQuery({ queryKey: ['courses'], queryFn: fetchCourses })
useQuery({ queryKey: ['course', slug], queryFn: () => fetchCourse(slug) })

// Assets
useQuery({ queryKey: ['assets'], queryFn: fetchAssets })

// Enrollments (authenticated)
useQuery({ queryKey: ['enrollments'], queryFn: fetchEnrollments })

// Orders (authenticated)
useQuery({ queryKey: ['orders'], queryFn: fetchOrders })
useMutation({ mutationFn: createOrder, onSuccess: invalidate(['enrollments']) })

// Progress (authenticated)
useMutation({ mutationFn: updateProgress, onSuccess: invalidate(['enrollments']) })
```

---

## 6. Business Logic Rules

### 6.1 Enrollment Rules
- Users must be authenticated to enroll
- Users cannot enroll in the same course twice
- After successful order, auto-enroll in purchased courses

### 6.2 Progress Tracking Rules
- Progress is tracked per enrollment (not per user)
- A lesson can be marked complete/incomplete (toggle)
- Progress percentage = (completed lessons / total lessons) * 100

### 6.3 Order Rules
- Users must be authenticated to checkout
- Order total is calculated server-side from item prices
- After order completion, status = "completed"
- Course purchases trigger automatic enrollment

---

## 7. Remaining Work

### Phase 1: Data Seeding (Priority: HIGH)
- [ ] Seed 2 courses (Level 1 and Level 2)
- [ ] Seed ~50 lessons across both courses
- [ ] Seed 6+ assets for the store

### Phase 2: Frontend Wiring (Priority: HIGH)
- [ ] Connect Homepage to `GET /api/courses`
- [ ] Connect Course Pages to `GET /api/courses/:slug`
- [ ] Connect Asset Store to `GET /api/assets`
- [ ] Connect Course Player to lessons API + progress tracking

### Phase 3: Transaction Flows (Priority: MEDIUM)
- [ ] Wire Checkout to `POST /api/orders`
- [ ] Display order history in Dashboard
- [ ] Implement "Continue Learning" with real progress data

### Phase 4: Testing & Polish (Priority: MEDIUM)
- [ ] End-to-end user flow testing
- [ ] Error handling improvements
- [ ] Loading states and skeleton screens

---

## 8. File Locations

| Purpose | File Path |
|---------|-----------|
| Database Schema | `shared/schema.ts` |
| API Routes | `server/routes.ts` |
| Storage Layer (ORM) | `server/storage.ts` |
| Database Connection | `server/db.ts` |
| Frontend Pages | `client/src/pages/*.tsx` |
| API Client | `client/src/lib/queryClient.ts` |

---

## 9. Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Express session secret (auto-generated) |

---

## 10. Running the Project

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Seed the database (to be created)
npm run db:seed

# Start development server
npm run dev
```

The app runs on `http://localhost:5000`

---

*Document Version: 1.0*
*Last Updated: December 2025*
