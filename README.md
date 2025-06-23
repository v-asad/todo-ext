# Todo-Ext: Fullstack Task Management App

Todo-Ext is a fullstack productivity application inspired by Microsoft To Do. It is a monorepo (monolithic repository) means both the frontend (client) and backend (server) codebases live in a single repository.It features a modern Next.js frontend and a Node.js/Express backend with Prisma ORM for database management. The app supports user authentication, task lists, categories, and more.

---

## Features
- User authentication (signup/login)
- Task management: create, update, delete, categorize
- Task lists: My Day, Important, Planned, Assigned, Flagged, Backlog, Done
- Responsive, modern UI (Next.js, Tailwind CSS)
- RESTful API (Express, Prisma)
- JWT-based authentication
- Pre-commit linting and formatting (Husky)

---

## Folder Structure
```
client/   # Next.js frontend
server/   # Node.js/Express backend (Prisma, API)
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
```
npm i -g pnpm
```

### 1. Install dependencies
This command to install dependencies for both client and server
```bash
pnpm install
```

### 2. Set up environment variables
create .env file in server  `server/.env` and add these fields
```
PORT = 
DATABASE_URL = 
JWT_SECRET = 
```
create .env file in client  `client/.env` and add these fields
```
NEXT_PUBLIC_API_URL =
```

### 3. Run Todo app
This command will start both client and server
```bash
pnpm dev
```
The API will be available at `http://localhost:8080`<br>Swagger docs: `http://localhost:8080/docs`<br>The app will be available at `http://localhost:3000`

---

## Best Practices
- **Code Quality:**
  - Use `pnpm fe lint` and `pnpm fe format` before committing (enforced by Husky pre-commit hook)
  - Follow the existing folder structure for new features/components
- **Security:**
  - Never commit secrets or real credentials to `.env`
  - Use strong JWT secrets in production
- **Database:**
  - Use Prisma migrations for schema changes
  - Never run `prisma migrate reset` on production data
- **Frontend:**
  - Use functional components and hooks
  - Keep UI logic and API calls separated (see `services/`)
- **Backend:**
  - Use DTOs for request validation
  - Keep business logic in `services/`, not controllers
- **Collaboration:**
  - Write clear commit messages
  - Document new endpoints/components

---

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express Documentation](https://expressjs.com/)

---
