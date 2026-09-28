# NestJS Task Management API

A beginner-friendly REST API built with **NestJS** and **TypeScript** for managing users and their tasks.

This project was built to learn and demonstrate important backend development concepts such as:

- REST APIs
- CRUD operations
- DTOs
- Request validation
- Response DTOs
- JWT authentication
- Password hashing
- Authentication guards
- User-based authorization
- Swagger API documentation
- Environment variables
- Clean NestJS project structure

> **Current status:** Core API functionality is complete. The project currently uses in-memory storage, so data is reset whenever the server restarts. A database layer can be added later.

---

## Table of Contents

- [What is this project?](#what-is-this-project)
- [What is an API?](#what-is-an-api)
- [What is REST?](#what-is-rest)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How the API Works](#how-the-api-works)
- [Authentication](#authentication)
- [Authorization and Task Ownership](#authorization-and-task-ownership)
- [DTOs](#dtos)
- [Validation](#validation)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Swagger Documentation](#swagger-documentation)
- [API Endpoints](#api-endpoints)
- [Example API Flow](#example-api-flow)
- [Testing](#testing)
- [Current Limitation](#current-limitation)
- [Future Improvements](#future-improvements)
- [What I Learned](#what-i-learned)

---

# What is this project?

This project is a **Task Management REST API**.

A user can:

1. Create an account
2. Log in
3. Receive a JWT access token
4. Create tasks
5. View their tasks
6. View an individual task
7. Update a task
8. Mark a task as completed
9. Delete a task

Each task belongs to the user who created it.

For example:

```text
Ateeq
 ├── Learn NestJS
 ├── Build API
 └── Study JWT

Ali
 ├── Complete assignment
 └── Submit project
```

Ateeq cannot access Ali's tasks, and Ali cannot access Ateeq's tasks.

---

# What is an API?

API stands for **Application Programming Interface**.

An API allows different applications to communicate with each other.

For example:

```text
Frontend
   |
   | HTTP Request
   ↓
NestJS API
   |
   | Process request
   ↓
Service
   |
   ↓
Data
   |
   ↓
HTTP Response
   |
   ↓
Frontend
```

The frontend does not need to know how the backend stores or processes the data. It simply communicates with the API.

---

# What is REST?

REST is a common way of designing APIs using HTTP.

This project uses standard HTTP methods.

| Method   | Purpose     | Example            |
| -------- | ----------- | ------------------ |
| `GET`    | Read data   | Get all tasks      |
| `POST`   | Create data | Create a task      |
| `PATCH`  | Update data | Mark task complete |
| `DELETE` | Delete data | Delete a task      |

For example:

```http
GET /tasks
```

means:

> Give me the tasks available to me.

While:

```http
POST /tasks
```

means:

> Create a new task.

---

# Features

## User Management

- Create users
- Get all users
- Get a user by ID
- Update users
- Delete users
- Prevent duplicate email addresses
- Hash passwords before storing them
- Never return passwords in API responses

## Authentication

- Login using email and password
- Password verification using bcrypt
- JWT access tokens
- JWT strategy using Passport
- Protected routes

## Task Management

- Create tasks
- Get user's tasks
- Get a single task
- Update tasks
- Mark tasks as completed
- Delete tasks
- Tasks automatically belong to the authenticated user

## Validation

Incoming requests are validated using:

- `class-validator`
- `class-transformer`
- NestJS `ValidationPipe`

## API Documentation

Swagger provides an interactive API documentation page where endpoints can be tested directly from a browser.

---

# Tech Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| NestJS            | Backend framework             |
| TypeScript        | Programming language          |
| Node.js           | JavaScript runtime            |
| Passport          | Authentication framework      |
| JWT               | Authentication tokens         |
| bcrypt            | Password hashing              |
| class-validator   | Request validation            |
| class-transformer | Data transformation           |
| Swagger           | API documentation and testing |
| npm               | Package management            |

---

# Project Structure

```text
src/
│
├── auth/
│   ├── dto/
│   │   └── login.dto.ts
│   │
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   │
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   │
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── user-response.dto.ts
│   │
│   ├── entities/
│   │   └── user.entity.ts
│   │
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   ├── update-task.dto.ts
│   │   └── task-response.dto.ts
│   │
│   ├── entities/
│   │   └── task.entity.ts
│   │
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
│
├── app.module.ts
└── main.ts
```

---

# How the API Works

NestJS separates responsibilities into different parts.

A simplified request flow looks like this:

```text
HTTP Request
     |
     ↓
Controller
     |
     ↓
DTO Validation
     |
     ↓
Guard / Authentication
     |
     ↓
Service
     |
     ↓
Data
     |
     ↓
Response DTO
     |
     ↓
HTTP Response
```

## Controller

The controller handles HTTP requests.

For example:

```text
POST /tasks
```

The controller receives the request and passes the required information to the service.

---

## Service

The service contains the application logic.

For example:

```text
Create task
     ↓
Get logged-in user's ID
     ↓
Create task with that user ID
     ↓
Store task
     ↓
Return task
```

---

## Entity

An entity represents the internal structure of our data.

Example:

```ts
export class Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
}
```

---

# Authentication

Authentication answers:

> **Who are you?**

This project uses **JWT authentication**.

The login flow is:

```text
User
  |
  | Email + Password
  ↓
POST /auth/login
  |
  ↓
Find User
  |
  ↓
Compare Password
  |
  ↓
Generate JWT
  |
  ↓
Return Access Token
```

Example response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

The frontend/client then sends this token when accessing protected endpoints.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Authorization and Task Ownership

Authentication and authorization are different concepts.

### Authentication

> Who is this user?

JWT tells us that.

### Authorization

> Is this user allowed to access this resource?

Our task ownership logic handles this.

When a user creates a task, the client does **not** send:

```json
{
  "title": "Learn NestJS",
  "userId": 5
}
```

Instead, the backend gets the user ID from the authenticated JWT:

```text
JWT
 ↓
JwtStrategy
 ↓
req.user
 ↓
req.user.userId
```

The task is then created with that ID.

For example:

```text
Logged-in user ID: 1

Create task
     ↓
Task.userId = 1
```

When retrieving a task, the service checks both:

```text
task.id === requested ID

AND

task.userId === logged-in user's ID
```

Therefore, a user cannot access another user's task simply by changing the task ID.

---

# DTOs

DTO stands for **Data Transfer Object**.

DTOs define the structure of data that enters or leaves the API.

This project uses separate DTOs for different purposes.

## Request DTO

Example:

```text
CreateTaskDto
```

It defines what the client is allowed to send.

```json
{
  "title": "Learn NestJS",
  "description": "Complete authentication"
}
```

---

## Response DTO

Example:

```text
TaskResponseDto
```

It defines what the API returns.

This is useful because the internal entity may contain fields that should not be exposed.

For users, this is especially important because the internal user object contains a password hash, while the API response does not.

---

# Validation

The API uses NestJS's global `ValidationPipe`.

Configured in:

```text
src/main.ts
```

with:

```ts
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
```

### `whitelist`

Removes properties that aren't allowed by the DTO.

### `forbidNonWhitelisted`

Instead of silently accepting unexpected properties, the API rejects them.

### `transform`

Allows NestJS to transform incoming values when appropriate.

---

# Getting Started

## 1. Clone the repository

```bash
git clone <your-repository-url>
```

Then enter the project:

```bash
cd nestjs-task-management-api
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create the environment file

Create:

```text
.env
```

in the project root.

Example:

```env
JWT_SECRET=my-super-secret-key
JWT_EXPIRES_IN=1h
```

> Never commit your real `.env` file to GitHub.

The project includes `.env` in `.gitignore`.

---

## 4. Start the development server

```bash
npm run start:dev
```

The API will run at:

```text
http://localhost:3000
```

---

# Swagger Documentation

Swagger provides interactive API documentation.

After starting the server, open:

```text
http://localhost:3000/api
```

You can:

- View available endpoints
- View request bodies
- View response structures
- Test API endpoints
- Authorize with a JWT
- Test protected routes

---

# Using Swagger

## 1. Create a user

Open:

```text
POST /users
```

Example:

```json
{
  "name": "Ateeq",
  "email": "ateeq@example.com",
  "password": "123456"
}
```

---

## 2. Login

Open:

```text
POST /auth/login
```

Send:

```json
{
  "email": "ateeq@example.com",
  "password": "123456"
}
```

You'll receive:

```json
{
  "access_token": "YOUR_JWT_TOKEN"
}
```

---

## 3. Authorize Swagger

Click the **Authorize 🔒** button at the top of Swagger.

Enter your JWT token.

Swagger will then automatically send the token with protected requests.

---

## 4. Create a task

Open:

```text
POST /tasks
```

Send:

```json
{
  "title": "Learn NestJS",
  "description": "Finish Task Management API"
}
```

The backend automatically associates the task with the logged-in user.

---

# API Endpoints

## Authentication

| Method | Endpoint      | Authentication | Description           |
| ------ | ------------- | -------------- | --------------------- |
| `POST` | `/auth/login` | No             | Login and receive JWT |

---

## Users

| Method   | Endpoint     | Authentication        | Description   |
| -------- | ------------ | --------------------- | ------------- |
| `POST`   | `/users`     | No                    | Create a user |
| `GET`    | `/users`     | Yes                   | Get users     |
| `GET`    | `/users/:id` | Depends on controller | Get user      |
| `PATCH`  | `/users/:id` | Depends on controller | Update user   |
| `DELETE` | `/users/:id` | Depends on controller | Delete user   |

---

## Tasks

| Method   | Endpoint     | Authentication | Description                |
| -------- | ------------ | -------------- | -------------------------- |
| `POST`   | `/tasks`     | Yes            | Create a task              |
| `GET`    | `/tasks`     | Yes            | Get logged-in user's tasks |
| `GET`    | `/tasks/:id` | Yes            | Get one of user's tasks    |
| `PATCH`  | `/tasks/:id` | Yes            | Update a task              |
| `DELETE` | `/tasks/:id` | Yes            | Delete a task              |

---

# Example API Flow

A normal user workflow looks like this:

```text
1. Register
      ↓
POST /users
      ↓
2. Login
      ↓
POST /auth/login
      ↓
3. Receive JWT
      ↓
Access Token
      ↓
4. Authorize
      ↓
Bearer JWT
      ↓
5. Create Task
      ↓
POST /tasks
      ↓
6. Get Tasks
      ↓
GET /tasks
      ↓
7. Update Task
      ↓
PATCH /tasks/:id
      ↓
8. Delete Task
      ↓
DELETE /tasks/:id
```

---

# Example: Creating a Task

The client sends:

```http
POST /tasks
Authorization: Bearer <JWT>
```

Request body:

```json
{
  "title": "Learn NestJS",
  "description": "Study controllers and services"
}
```

The backend gets the user ID from the JWT.

For example:

```text
JWT user ID = 1
```

The resulting task internally becomes:

```json
{
  "id": 1,
  "title": "Learn NestJS",
  "description": "Study controllers and services",
  "completed": false,
  "userId": 1,
  "createdAt": "2026-09-27T16:30:00.000Z"
}
```

The important part is that the client never had to provide:

```json
"userId": 1
```

The backend determines ownership from the authenticated user.

---

# Testing

The API can be tested using:

### Swagger

```text
http://localhost:3000/api
```

### Postman

You can also use Postman to send HTTP requests manually.

For protected endpoints, include:

```http
Authorization: Bearer <JWT>
```

---

# Current Limitation

The current version stores users and tasks in memory.

For example:

```ts
private users: User[] = [];
```

and:

```ts
private tasks: Task[] = [];
```

This means:

```text
Start server
    ↓
Create users/tasks
    ↓
Restart server
    ↓
Data is gone
```

This is intentional for the current learning version.

The next version can replace the in-memory arrays with a real database.

---

# Future Improvements

Possible future improvements include:

- [ ] PostgreSQL database
- [ ] Prisma or TypeORM
- [ ] Persistent users and tasks
- [ ] Refresh tokens
- [ ] Better error handling
- [ ] Pagination
- [ ] Task filtering
- [ ] Task search
- [ ] User profile endpoint
- [ ] Automated tests
- [ ] Docker
- [ ] Production deployment
- [ ] CI/CD
- [ ] Frontend application

These features are intentionally not part of the current MVP.

---

# What I Learned

This project helped me understand the fundamentals of building a backend API with NestJS.

### NestJS

- Modules
- Controllers
- Services
- Dependency Injection
- Guards
- DTOs
- Pipes
- Exception handling

### REST APIs

- HTTP methods
- Routes
- Request bodies
- Parameters
- HTTP status codes
- JSON responses

### Authentication

- Password hashing
- Password verification
- JWT
- Passport
- JWT strategies
- Authentication guards

### Authorization

- Getting the authenticated user's ID
- Associating resources with users
- Preventing users from accessing other users' resources

### Data Validation

- `class-validator`
- `ValidationPipe`
- DTO-based validation

### API Documentation

- Swagger
- Interactive API testing
- Bearer authentication

---

# Project Status

**Core functionality: Complete**

The project currently demonstrates a complete backend authentication and task-management flow.

The next major technical step is replacing in-memory storage with a persistent database.

---

## Author

**Ateeq**

Built as a learning and portfolio project while studying backend development with NestJS and TypeScript.
