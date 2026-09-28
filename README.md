# NestJS Task Management API

A backend REST API built with **NestJS** for user authentication and task management.

## Portfolio Project

This project demonstrates my ability to build and work with **NestJS REST APIs**, including:

- Authentication with JWT
- Authorization and user-specific resource access
- CRUD operations
- DTO-based request validation
- Password hashing with bcrypt
- HTTP exception handling
- Swagger API documentation
- Environment-based configuration
- Clean backend project structure

## Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/AteeqMalkani/nestjs-task-management-api.git
cd nestjs-task-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
JWT_SECRET=your-jwt-secret-here
JWT_EXPIRES_IN=1h
```

### 4. Start the development server

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

## Swagger API Documentation

Interactive API documentation is available at:

```text
http://localhost:3000/api
```

Swagger allows you to explore the endpoints, provide request data, authenticate with a JWT, and test the API directly from the browser.

### Authentication in Swagger

1. Register a user using `POST /users`.
2. Login using `POST /auth/login`.
3. Copy the returned `access_token`.
4. Click **Authorize** in Swagger.
5. Enter:

```text
Bearer YOUR_ACCESS_TOKEN
```

6. You can now test the protected endpoints.

---

# Project Overview

This project is a REST API for managing users and tasks.

The API currently provides:

- User registration and management
- JWT-based authentication
- Password hashing
- Protected endpoints
- Task creation and management
- User-specific task ownership
- Request validation
- Response DTOs
- Swagger documentation

## Tech Stack

- **NestJS**
- **TypeScript**
- **JWT**
- **Passport**
- **bcrypt**
- **class-validator**
- **class-transformer**
- **Swagger / OpenAPI**
- **REST API**

## Project Structure

```text
src/
├── auth/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── tasks/
│   ├── dto/
│   ├── entities/
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
│
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
│
├── app.module.ts
└── main.ts
```

# How the API Works

The application follows a typical NestJS request flow:

```text
Client
  ↓
Controller
  ↓
DTO Validation
  ↓
Guard / Authentication
  ↓
Service
  ↓
Data
  ↓
Response DTO
  ↓
Client
```

Controllers handle incoming HTTP requests, services contain application logic, DTOs define and validate incoming data, and response DTOs control the data returned to the client.

# Authentication

Authentication is implemented using **JWT access tokens**.

The login flow is:

```text
POST /auth/login
       ↓
Find user by email
       ↓
Compare password with bcrypt
       ↓
Generate JWT
       ↓
Return access_token
```

Protected endpoints require the token in the `Authorization` header:

```text
Authorization: Bearer <access_token>
```

## Authorization

Authentication answers:

> Who are you?

Authorization answers:

> Are you allowed to access this resource?

Tasks are associated with the authenticated user's ID.

The API obtains the user ID from the JWT instead of trusting a `userId` supplied by the client.

For example:

```text
JWT
 ↓
JwtStrategy
 ↓
req.user.userId
 ↓
TasksService
 ↓
Only access tasks belonging to that user
```

This prevents one authenticated user from directly accessing another user's tasks.

# DTOs and Validation

DTOs are used to define and validate incoming request data.

For example, creating a task validates:

- Title is required
- Title must be a string
- Title has a maximum length
- Description is optional
- Description must be a string when provided
- Description has a maximum length

Global validation is configured using NestJS `ValidationPipe`.

The application also uses:

```text
whitelist: true
forbidNonWhitelisted: true
transform: true
```

This helps keep incoming request data controlled and predictable.

# Response DTOs

The API uses separate response DTOs rather than returning internal entities directly.

For example, the user response does not expose the user's hashed password.

Response transformation uses `class-transformer` with:

```text
excludeExtraneousValues: true
```

Only explicitly exposed properties are returned.

# API Endpoints

## Authentication

| Method | Endpoint      | Authentication |
| ------ | ------------- | -------------- |
| POST   | `/auth/login` | Public         |

## Users

| Method | Endpoint     | Authentication |
| ------ | ------------ | -------------- |
| POST   | `/users`     | Public         |
| GET    | `/users`     | JWT            |
| GET    | `/users/:id` | API            |
| PATCH  | `/users/:id` | API            |
| DELETE | `/users/:id` | API            |

## Tasks

| Method | Endpoint     | Authentication |
| ------ | ------------ | -------------- |
| POST   | `/tasks`     | JWT            |
| GET    | `/tasks`     | JWT            |
| GET    | `/tasks/:id` | JWT            |
| PATCH  | `/tasks/:id` | JWT            |
| DELETE | `/tasks/:id` | JWT            |

# Example Workflow

### Register

```http
POST /users
```

```json
{
  "name": "ABC",
  "email": "xyz@example.com",
  "password": "123456"
}
```

### Login

```http
POST /auth/login
```

```json
{
  "email": "xyz@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "access_token": "your-jwt-token"
}
```

### Create a Task

Send the JWT in the Authorization header:

```text
Authorization: Bearer your-jwt-token
```

Then:

```http
POST /tasks
```

```json
{
  "title": "Learn NestJS",
  "description": "Complete the authentication module"
}
```

The authenticated user's ID is automatically associated with the task.

# Testing

The project includes automated tests using Jest and NestJS testing utilities.

Run unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run end-to-end tests:

```bash
npm run test:e2e
```

# Current Project Limitation

The current version uses **in-memory storage** for users and tasks.

This means data is reset whenever the application restarts.

This was intentionally kept simple for the initial implementation so the API architecture, authentication, authorization, validation and CRUD functionality could be developed and tested independently.

# Future Improvements

Potential next steps include:

- PostgreSQL or another persistent database
- TypeORM or Prisma integration
- Database migrations
- Refresh tokens
- Role-based authorization
- Pagination
- Search and filtering
- Task status management
- Production deployment
- Automated CI/CD
- More comprehensive test coverage

# What I Learned

This project provided hands-on experience with:

- NestJS modules
- Controllers
- Providers and dependency injection
- Services
- DTOs
- Validation pipes
- Guards
- JWT authentication
- Authorization
- Passport strategies
- Password hashing
- Exception handling
- Response transformation
- Swagger/OpenAPI documentation
- Environment variables
- REST API design
- Automated testing

# Project Status

**Completed:** Core REST API, authentication, authorization, validation, CRUD operations and Swagger documentation.

**Next stage:** Persistent database integration and production-oriented improvements.

# Author

**Ateeq Malkani**

Backend development project focused on NestJS and REST API development.
