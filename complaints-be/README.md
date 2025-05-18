# Citizen Complaints and Engagement System - Backend

This is the backend service for the Citizen Complaints and Engagement System, built with Node.js, Express, TypeScript, and TypeORM.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=complaints_db
JWT_SECRET=your_jwt_secret
```

## Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd complaints-be
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── constants/         # Application constants and enums
├── decorators/        # Custom TypeScript decorators
├── entities/          # TypeORM entity definitions
├── helpers/           # Utility functions and helper methods
├── middlewares/       # Express middlewares
├── routes/            # API route definitions
├── services/          # Business logic and service layer
├── templates/         # Email and ticket routing templates
│   ├── emails/       # Email notification templates
│   └── tickets/      # Ticket routing and processing templates
├── types/             # TypeScript type definitions
├── app.ts            # Express application setup
├── data-source.ts    # TypeORM database configuration
└── server.ts         # Server entry point
```

## AI-Powered Ticket Routing

The system implements intelligent ticket routing using AI to automatically:

- Assign tickets to the most appropriate institution based on content analysis
- Categorize tickets using natural language processing
- Optimize ticket distribution for efficient handling

The AI routing system:
- Analyzes ticket content and context
- Matches tickets with the most suitable institution
- Suggests appropriate categories
- Learns from historical routing decisions
- Maintains routing templates for consistent decision-making

### Example: AI-Based Ticket Routing

When a new ticket is created, the system automatically analyzes its content to determine the appropriate institution and category. Here's how it works:

```typescript
// Example ticket creation with AI routing
const ticket = await ticketService.createTicket({
  ticket: {
    title: "Road Maintenance Issue",
    // No category or institution specified - AI will determine these
  },
  ticketMessage: {
    message: "There are potholes on Main Street that need urgent attention. The road is becoming dangerous for drivers."
  }
});

// The system will:
// 1. Analyze the message content
// 2. Use AI to determine the appropriate category (e.g., "Infrastructure")
// 3. Route to the relevant institution (e.g., "Department of Public Works")
```

The routing logic can be found in:
- `src/services/ticket.service.ts` - Main routing implementation
- `src/templates/tickets/routing.templates.ts` - AI prompt templates
- `src/helpers/claude.helper.ts` - AI integration

## Audit Logging

The system implements comprehensive audit logging to track the lifecycle of all entities. Audit logs capture:

- Entity creation
- Entity modifications
- Entity deletions
- User actions
- System events

Each audit log entry includes:
- Timestamp
- User ID (if applicable)
- Action type
- Entity type
- Entity ID
- Previous state (for modifications)
- New state
- Additional metadata

Audit logs are stored in a dedicated table and can be queried for compliance, debugging, and tracking purposes.

## API Documentation

The API documentation is available at `/api-docs` when running the server in development mode.

## Development

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the TypeScript project
- `npm start`: Start the production server

## Database

The application uses PostgreSQL as its database. The database schema is managed through TypeORM entities and migrations.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Input validation using class-validator and Joi
- SSL support for production environments

## Error Handling

The application implements centralized error handling with proper HTTP status codes and error messages.

## Logging

Winston logger is used for application logging, with different log levels for development and production environments.

## License

ISC 