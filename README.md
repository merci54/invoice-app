# Invoice App

A full-stack invoice management application built with Next.js 16 and MongoDB. Create, edit, and track invoices with authentication, a one-click demo mode, and light/dark themes.

## Features

- **Authentication** — email/password sign up and login with JWT sessions stored in httpOnly cookies (bcrypt-hashed passwords)
- **Invoice management** — create, edit, delete invoices with line items, automatic totals, and `Draft` / `Pending` / `Paid` statuses
- **Status filtering** — filter the invoice list by status via URL search params
- **Demo mode** — try the app instantly with a guest session pre-seeded with sample invoices, no signup required
- **Profile dashboard** — invoice stats and revenue summary (total revenue, pending amount)
- **Light / dark theme** — togglable, persisted client-side
- **Route protection** — middleware guards authenticated routes and redirects logged-in users away from auth pages

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Server Actions) + React 19
- **Language:** TypeScript
- **Database:** MongoDB via [Mongoose](https://mongoosejs.com)
- **Auth:** [jose](https://github.com/panva/jose) (JWT) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Forms & validation:** [Formik](https://formik.org) + [Yup](https://github.com/jquense/yup)
- **State:** [Zustand](https://github.com/pmndrs/zustand) (theme)
- **Styling:** SCSS Modules
- **UI helpers:** react-select, react-day-picker, react-hot-toast, date-fns

## Getting Started

### Prerequisites

- Node.js 20+ (developed on Node 24)
- A MongoDB connection string (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas) or a local instance)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=your-long-random-secret
```

> Generate a strong `JWT_SECRET`, for example: `openssl rand -base64 32`

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build for production                 |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```
app/
  (auth)/            # Login & register pages
  (main)/            # Authenticated app
    invoices/        # List, create, view, edit, delete
    profile/         # Profile & stats
components/          # Reusable UI components
lib/
  actions/           # Server Actions (auth, invoices)
  auth/              # Session helpers (JWT cookies)
  db/                # MongoDB connection
  models/            # Mongoose schemas
  stores/            # Zustand stores
types/               # Shared TypeScript types
middleware.ts        # Route protection
```

## License

This project is for portfolio/learning purposes.
