# BM Security Backend

A NestJS backend application for the BM Security management system, built with TypeORM and MySQL.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Job Management** - Create, assign, and track security jobs
- **Location Tracking** - Real-time location updates for security teams
- **Cash Management** - Cash counting and verification system
- **Emergency System** - SOS alerts and emergency response
- **Team Management** - Organize staff into teams with commanders

## 🏗️ Architecture

- **Framework**: NestJS with TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: Class-validator
- **Configuration**: Environment-based config

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to the backend directory:**
   ```bash
   cd bm_backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=impulsep_mybm
   JWT_SECRET=your-secret-key
   ```

4. **Set up the database:**
   - Create the database: `impulsep_mybm`
   - Import the existing schema: `mybm_db.sql`

5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000/api/v1`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/profile` - Get user profile
- `POST /api/v1/auth/refresh` - Refresh JWT token

### Requests (Jobs)
- `GET /api/v1/requests` - Get all requests (role-based)
- `POST /api/v1/requests` - Create new request
- `GET /api/v1/requests/:id` - Get request details
- `PATCH /api/v1/requests/:id/status` - Update request status
- `GET /api/v1/requests/today` - Get today's requests
- `GET /api/v1/requests/status/:status` - Get requests by status

## 👥 User Roles

- **ADMIN** - Full system access
- **SUPERVISOR** - Manage all requests and teams
- **CREW_COMMANDER** - Lead team and manage team requests
- **SECURITY_GUARD** - Complete assigned requests
- **VAULT_OFFICER** - Handle vault operations

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - Staff members with roles and permissions
- **Teams** - Groups of security personnel
- **Requests** - Security jobs and assignments
- **ServiceTypes** - Types of security services
- **CrewLocations** - Real-time location tracking
- **CashCounts** - Cash counting and verification
- **SOS** - Emergency alerts and responses

## 🔧 Development

### Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debugging enabled
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── auth/                 # Authentication module
├── config/              # Configuration files
├── entities/            # TypeORM entities
├── requests/            # Request management module
├── app.module.ts        # Main application module
└── main.ts             # Application entry point
```

## 🔒 Security

- JWT-based authentication
- Role-based authorization
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration

## 📱 Integration with Flutter App

The backend provides RESTful APIs that the Flutter app consumes:

- Authentication endpoints for login/logout
- Request management for job assignments
- Location tracking for real-time updates
- Cash counting for financial operations
- SOS system for emergency alerts

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start the production server:**
   ```bash
   npm run start:prod
   ```

## 📝 License

This project is part of the BM Security management system.

---

**Built with ❤️ using NestJS, TypeORM, and MySQL**