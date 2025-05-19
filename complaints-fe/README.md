# Complaints Management System

A modern, user-friendly web application for managing and tracking complaints and service requests. Built with React, TypeScript, and Vite, this system provides a robust platform for institutions to handle customer complaints efficiently and transparently.

## 🎯 Core Features

### 📊 Interactive Dashboard
- Real-time overview of complaint statistics
- Visual representation of ticket status distribution
- Performance metrics for institutions and staff
- Quick access to critical tickets
```typescript
// Example dashboard metrics
interface DashboardMetrics {
  totalTickets: number;
  openTickets: number;
  resolvedThisWeek: number;
  averageResolutionTime: string;
  ticketsByPriority: Record<Priority, number>;
  ticketsByStatus: Record<Status, number>;
}
```

### 📝 Comprehensive Ticket Management
- Create and track complaints with detailed information
- Real-time status updates (OPEN, ANSWERED, REOPENED, CLOSED)
- Priority-based routing (LOW, MEDIUM, HIGH, CRITICAL)
- Category and institution assignment
- Staff assignment and workload management

### 📜 Detailed Audit History
- Complete timeline of all ticket changes
- Track modifications to:
  ```typescript
  interface AuditLog {
    ticketId: string;
    action: 'STATUS_CHANGE' | 'ASSIGNMENT_CHANGE' | 'PRIORITY_CHANGE';
    oldValue: any;
    newValue: any;
    changedBy: User;
    timestamp: Date;
  }
  ```
- User accountability and action tracking
- Visual timeline representation
- Side-by-side comparison of changes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### First-Time Setup

1. **Clone and Install**
   ```bash
   # Clone the repository
   git clone [repository-url]
   cd complaints-fe

   # Install dependencies
   npm install
   # or
   yarn install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_TIMEOUT=30000

   # Authentication
   VITE_AUTH_TOKEN_KEY=auth_token
   VITE_REFRESH_TOKEN_KEY=refresh_token

   # Feature Flags
   VITE_ENABLE_AUDIT_LOGS=true
   VITE_ENABLE_DASHBOARD=true

   # Optional: Analytics
   VITE_ENABLE_ANALYTICS=false
   VITE_ANALYTICS_ID=your-analytics-id
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the Application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
src/
├── api/            # API integration and services
├── components/     # Reusable UI components
├── containers/     # Complex components with business logic
├── hooks/          # Custom React hooks
├── pages/          # Application pages
│   ├── dashboard/  # Dashboard components
│   ├── tickets/    # Ticket management
│   └── audit/      # Audit logs
├── states/         # Redux state management
├── types/          # TypeScript definitions
└── usecases/       # Business logic implementation
```

## 🛠️ Development

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Key Technologies
- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Notifications**: Sonner

## 🔒 Security

- Role-based access control (RBAC)
- JWT-based authentication
- Protected routes
- Secure API communication
- Comprehensive audit logging

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px, 1440px, 1024px)
- Tablet (768px)
- Mobile (480px, 320px)

## 🤝 Support

For technical support or feature requests, please contact:
- Email: [princeelysee@gmail.com](mailto:princeelysee@gmail.com)

## 📈 Roadmap

- Advanced analytics dashboard
- Real-time notifications
- Mobile application
- External system integrations
- Enhanced reporting capabilities
