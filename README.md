# Project Manager API

A production-ready NestJS backend for managing users, projects, and tasks with JWT authentication, layered architecture, and SQLite persistence. Built as part of a postgraduate backend project, it emphasizes clean separation of concerns and scalable use cases.

<p align="left">
  <img src="https://img.shields.io/badge/NestJS-11.x-E0234E" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TypeORM-0.3.x-FF5D00" alt="TypeORM" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57" alt="SQLite" />
</p>

## ✨ Highlights

- **JWT authentication** with protected routes and public endpoints
- **Projects and tasks** management with user scoping
- **Clean architecture** layers: domain, gateways, infrastructure
- **Validation-ready** DTOs using `class-validator`
- **SQLite persistence** via TypeORM
- **Test-ready** structure with unit and e2e setup

## 🧱 Architecture Overview

- **Domain**: Entities, interfaces, use cases
- **Gateways**: HTTP controllers and guards
- **Infrastructure**: Auth and database implementations

This separation keeps business rules independent from frameworks and I/O concerns.

## 🧩 Tech Stack

- NestJS 11
- TypeScript 5
- TypeORM + SQLite
- JWT + Bcrypt
- Jest + Supertest

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Run the App

```bash
# development
npm run start

# watch mode
npm run start:dev

# production (after build)
npm run build
npm run start:prod
```

### Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

## 🔐 Authentication

Use the login endpoint to obtain a JWT token. Protected routes expect:

```
Authorization: Bearer <token>
```

> Note: The JWT secret is currently defined in `src/infrastructure/auth/constants.ts`. Change it before production use.

## 📚 API Endpoints

### Auth

- `POST /auth/login` — login with email and password

### Users

- `POST /users` — create user (public)
- `GET /users` — list users
- `GET /users/:id` — get user by id

### Projects

- `GET /projects` — list user projects
- `GET /projects/:id` — get project by id
- `POST /projects` — create project

### Tasks

- `GET /tasks` — list user tasks
- `GET /tasks/:id` — get task by id
- `POST /tasks` — create task

## 🗄️ Database

The project uses SQLite by default. The database file is located at:

```
db/sql.sqlite
```

TypeORM is configured with `synchronize: true` for local development.

## 📁 Project Structure

```
src/
  domain/            # entities, interfaces, use cases
  gateways/          # controllers, guards, DTOs
  infrastructure/    # auth and database adapters
```

## 📄 License

UNLICENSED
