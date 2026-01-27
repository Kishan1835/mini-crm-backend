# Mini CRM Backend

A production-ready NestJS backend API for managing users, customers, and tasks with JWT authentication and role-based authorization.

## 🚀 Live Demo

- **API URL**: https://mini-crm-backend-qdoo.onrender.com
- **Swagger Documentation**: https://mini-crm-backend-qdoo.onrender.com/api/docs


## 🧪 Test Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin12345`

### Employee Account
- **Email**: `employee@example.com`
- **Password**: `employee123`

## ✨ Features

- ✅ JWT-based authentication with bcrypt password hashing
- ✅ Role-based authorization (ADMIN/EMPLOYEE)
- ✅ User management (Admin only)
- ✅ Customer management with pagination
- ✅ Task management with employee assignments
- ✅ Complete Swagger/OpenAPI documentation
- ✅ Input validation with class-validator
- ✅ Proper error handling with HTTP status codes
- ✅ PostgreSQL database with Prisma ORM
- ✅ **Bonus**: Customer search filter
- ✅ **Bonus**: Deployed on Render with PostgreSQL

## 🛠️ Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt
- **Deployment**: Render

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Users (Admin Only)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user role

### Customers
- `POST /customers` - Create customer (Admin only)
- `GET /customers` - Get all customers with pagination (Admin + Employee)
- `GET /customers?search=query` - Search customers (Bonus feature)
- `GET /customers/:id` - Get customer by ID (Admin + Employee)
- `PATCH /customers/:id` - Update customer (Admin only)
- `DELETE /customers/:id` - Delete customer (Admin only)

### Tasks
- `POST /tasks` - Create task (Admin only)
- `GET /tasks` - Get tasks (Admin sees all, Employee sees assigned only)
- `PATCH /tasks/:id/status` - Update task status

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mini-crm-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mini_crm?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"
PORT=3000
```

4. Run database migrations:
```bash
npx prisma migrate dev --name init
```

5. Generate Prisma Client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## 📖 Testing the API

### Using Swagger UI

1. Open http://localhost:3000/api/docs
2. Register a user via `POST /auth/register`
3. Login via `POST /auth/login` to get JWT token
4. Click "Authorize" button and enter: `Bearer YOUR_TOKEN`
5. Test all endpoints

### Using cURL

#### Register Admin
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin12345",
    "role": "ADMIN"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin12345"
  }'
```

#### Get Customers (with auth)
```bash
curl -X GET "http://localhost:3000/customers?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

Import the included `Mini_CRM_Postman_Collection.json` file into Postman for a complete set of API requests.

## 🗄️ Database Schema

### User
- id (UUID)
- name (String)
- email (String, unique)
- password (String, hashed)
- role (ADMIN | EMPLOYEE)
- createdAt, updatedAt

### Customer
- id (UUID)
- name (String)
- email (String, unique)
- phone (String, unique)
- company (String, optional)
- createdAt, updatedAt

### Task
- id (UUID)
- title (String)
- description (String, optional)
- status (PENDING | IN_PROGRESS | DONE)
- assignedTo (User reference)
- customerId (Customer reference)
- createdAt, updatedAt

## 🔐 Authentication & Authorization

### Authentication Flow
1. User registers or logs in
2. Server returns JWT token
3. Client includes token in Authorization header: `Bearer <token>`
4. Server validates token on protected routes

### Role-Based Access Control

| Endpoint | ADMIN | EMPLOYEE |
|----------|-------|----------|
| GET /users | ✅ | ❌ |
| PATCH /users/:id | ✅ | ❌ |
| POST /customers | ✅ | ❌ |
| GET /customers | ✅ | ✅ |
| PATCH /customers/:id | ✅ | ❌ |
| DELETE /customers/:id | ✅ | ❌ |
| POST /tasks | ✅ | ❌ |
| GET /tasks | ✅ (all) | ✅ (own) |
| PATCH /tasks/:id/status | ✅ | ✅ (own) |

## 📁 Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── decorators/         # Custom decorators (Roles)
│   ├── dto/                # Data transfer objects
│   ├── guards/             # Auth & Role guards
│   ├── strategies/         # JWT strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/                  # Users module
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── customers/              # Customers module
│   ├── dto/
│   ├── customers.controller.ts
│   ├── customers.service.ts
│   └── customers.module.ts
├── tasks/                  # Tasks module
│   ├── dto/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── prisma/                 # Prisma service
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts           # Main app module
└── main.ts                 # Application entry point
```

## 🧪 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success (GET, PATCH)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate email/phone)

## 🚀 Deployment

This application is deployed on Render with:
- Web service running the NestJS application
- PostgreSQL database (managed by Render)
- Automatic deployments from GitHub

### Deploy Your Own

1. Fork this repository
2. Create a Render account
3. Create a PostgreSQL database on Render
4. Create a Web Service connected to your GitHub repo
5. Set environment variables:
   - `DATABASE_URL` (from Render PostgreSQL)
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `NODE_ENV=production`
6. Deploy!

## 🛠️ Available Scripts

```bash
npm run start          # Start application
npm run start:dev      # Start in development mode with hot reload
npm run start:prod     # Start in production mode
npm run build          # Build for production
npm run lint           # Run ESLint
npx prisma studio      # Open Prisma Studio (database GUI)
npx prisma migrate dev # Create and apply migrations
```

## 📦 Dependencies

- @nestjs/core - NestJS framework
- @nestjs/jwt - JWT authentication
- @nestjs/passport - Passport integration
- @nestjs/swagger - API documentation
- @prisma/client - Database ORM
- bcrypt - Password hashing
- class-validator - DTO validation
- passport-jwt - JWT strategy

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Role-based access control
- Input validation on all endpoints
- Unique constraints on sensitive fields
- Protected routes requiring authentication
- SQL injection prevention via Prisma

## 📄 License

This project is created as part of the Prysm Labs Backend Developer Intern Assignment.

## 👤 Author

T S Hayagriva Kishan

## 🙏 Acknowledgments

- Prysm Labs for the assignment opportunity
- NestJS documentation
- Prisma documentation
