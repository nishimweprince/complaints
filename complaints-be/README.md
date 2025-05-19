# Citizen Complaints and Engagement System - Backend

This is the backend service for the Citizen Complaints and Engagement System, built with Node.js, Express, TypeScript, and TypeORM. The system provides a robust API for managing citizen complaints, with AI-powered ticket routing and comprehensive audit logging. This is a sub-project of the Citizen Complaints and Engagement System.

## Key Features

- 🔍 **AI-Powered Ticket Routing**: Intelligent categorization and routing of tickets using Claude AI
- 📊 **Real-time Dashboard**: Analytics and insights for ticket management
- 📝 **Comprehensive Audit Logging**: Track all system activities and changes
- 🔐 **Role-Based Access Control**: Granular permissions system
- 📧 **Email Notifications**: Automated email notifications using SendGrid
- 📈 **Ticket Management**: Full lifecycle management of citizen complaints

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager
- Anthropic API key (for AI features)
- SendGrid API key (for email notifications)

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=complaints_db

# JWT Configuration
JWT_SECRET=your_jwt_secret

# AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_SEND_FROM=your_verified_sender_email

# Server Configuration
PORT=8080
NODE_ENV=development
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
│   ├── auditLog.constants.ts    # Audit log entity types
│   ├── logs.constants.ts        # Log types and references
│   ├── permission.constants.ts  # Permission definitions
│   ├── role.constants.ts        # Role status definitions
│   └── ticket.constants.ts      # Ticket status and priority
├── controllers/       # Request handlers
├── decorators/       # Custom TypeScript decorators
│   └── auditLog.decorator.ts    # Audit logging decorators
├── entities/         # TypeORM entity definitions
│   ├── ticket.entity.ts         # Ticket model
│   ├── user.entity.ts           # User model
│   └── ...
├── helpers/          # Utility functions
│   ├── claude.helper.ts         # AI integration
│   ├── emails.helper.ts         # Email service
│   └── logger.helper.ts         # Logging service
├── middlewares/      # Express middlewares
├── routes/           # API route definitions
├── services/         # Business logic
├── templates/        # Email and ticket templates
├── types/            # TypeScript type definitions
├── validations/      # Request validation schemas
├── app.ts           # Express application setup
├── data-source.ts   # TypeORM database configuration
└── server.ts        # Server entry point
```

## Core Features

### AI-Powered Ticket Routing

The system uses Claude AI to automatically analyze and route tickets:

```typescript
// Example ticket creation with AI routing
const ticket = await ticketService.createTicket({
  title: "Road Maintenance Issue",
  message: "There are potholes on Main Street that need urgent attention."
});

// The system will:
// 1. Analyze the content using Claude AI
// 2. Determine appropriate category (e.g., "Infrastructure")
// 3. Route to relevant institution (e.g., "Department of Public Works")
// 4. Set appropriate priority based on content
```

### Audit Logging

Comprehensive audit logging tracks all system activities:

```typescript
// Example audit log entry
{
  timestamp: "2024-03-20T10:30:00Z",
  userId: "user-uuid",
  action: "UPDATE",
  entityType: "TICKET",
  entityId: "ticket-uuid",
  previousState: { status: "OPEN" },
  newState: { status: "RESOLVED" },
  metadata: { reason: "Issue fixed" }
}
```

## API Routes

### Authentication
- `POST /auth/login` - User login

### Tickets
- `POST /tickets` - Create new ticket
- `GET /tickets` - List tickets
- `GET /tickets/:id` - Get ticket details
- `DELETE /tickets/:id` - Delete ticket

### Ticket Messages
- `POST /ticket-messages` - Add message to ticket
- `GET /ticket-messages` - List ticket messages
- `DELETE /ticket-messages/:id` - Delete message

### Dashboard
- `GET /dashboard/tickets/count-by-status` - Get ticket counts by status
- `GET /dashboard/tickets/trends` - Get ticket trends

### Audit Logs
- `GET /audit-logs` - List audit logs
- `GET /audit-logs/entity/:entityId` - Get entity history

### Institutions
- `GET /institutions` - List institutions

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Input validation using class-validator and Joi
- Role-based access control
- Comprehensive audit logging

## Error Handling

The system implements centralized error handling with proper HTTP status codes and detailed error messages. All errors are logged and can be tracked through the audit system.

## Logging

Winston logger is used for application logging with different log levels:
- `error.log` - Error level logs
- `activities.log` - Success level logs
- `critical.log` - Warning level logs

## Development

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the TypeScript project
- `npm start`: Start the production server

## License

ISC 

## Initial Data Seeding

The system automatically seeds initial data on startup, including:

### Default Super Admin User
```bash
Email: admin@complaints.rw
Password: Complaints@123
```

### Roles and Permissions
The system creates the following initial roles and permissions:

1. **SUPER_ADMIN Role**
   - Has all system permissions
   - Automatically assigned to the default admin user

2. **Default Permissions**
   - `USER_CREATE` - Create new users
   - `USER_READ` - View user information
   - `USER_UPDATE` - Update user details
   - `USER_DELETE` - Delete users

### Ticket Statuses
The system supports the following ticket statuses:
- `OPEN` - New ticket
- `PENDING` - Under review
- `ON_HOLD` - Temporarily paused
- `ANSWERED` - Response provided
- `RESOLVED` - Issue resolved
- `CLOSED` - Ticket closed
- `REOPENED` - Reopened after closure

### Ticket Priorities
Tickets can be assigned the following priorities:
- `LOW` - Non-urgent issues
- `MEDIUM` - Standard priority
- `HIGH` - Urgent issues

### Audit Log Entity Types
The system tracks changes for the following entities:
- `INSTITUTION`
- `CATEGORY`
- `ROLE`
- `USER`
- `TICKET`
- `TICKET_MESSAGE`

> **Security Note**: It is recommended to change the default admin password after first login. 