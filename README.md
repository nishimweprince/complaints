# Citizen Complaints and Engagement System

This repository contains a full-stack application for managing citizen complaints and engagement. The system is split into two main components: a frontend application and a backend service.

## Project Structure

```
complaints/
├── complaints-fe/    # Frontend application (React + TypeScript + Vite)
└── complaints-be/    # Backend service (Node.js + Express + TypeScript)
```

## Frontend Application (`complaints-fe`)

The frontend is built with React, TypeScript, and Vite, providing a modern and responsive user interface for citizens to submit and track complaints.

### Documentation
- [Frontend README](./complaints-fe/README.md)
- [Frontend API Documentation](./complaints-fe/src/api/README.md)

### Key Features
- Modern React with TypeScript
- Vite for fast development and building
- ESLint configuration for code quality
- Component-based architecture

## Backend Service (`complaints-be`)

The backend service is built with Node.js, Express, and TypeScript, providing a robust API for managing complaints and user data.

### Documentation
- [Backend README](./complaints-be/README.md)
- API documentation available at `/api-docs` when running the server

### Key Features
- RESTful API architecture
- PostgreSQL database with TypeORM
- JWT-based authentication
- Comprehensive audit logging
- Input validation and security measures

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd complaints
```

2. Set up the backend:
```bash
cd complaints-be
npm install
# Create .env file with required environment variables
npm run dev
```

3. Set up the frontend:
```bash
cd complaints-fe
npm install
npm run dev
```

## Development

Both applications can be run in development mode with hot reloading enabled. See the respective README files for detailed setup instructions and available commands.

## License

ISC 