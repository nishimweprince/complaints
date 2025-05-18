# Complaints Management System

A modern, user-friendly web application for managing and tracking complaints and service requests. Built with React, TypeScript, and Vite, this system provides a robust platform for institutions to handle customer complaints efficiently and transparently.

## 🌟 Overview

The Complaints Management System is designed to streamline the process of handling customer complaints and service requests. It enables institutions to:

- Receive and track customer complaints
- Assign and manage tickets
- Monitor complaint resolution progress
- Maintain a complete audit trail of all actions
- Provide transparent communication between customers and institutions

## 🚀 Key Features

### 1. Ticket Management
- **Create Tickets**: Users can submit complaints with detailed information
- **Ticket Status Tracking**: Monitor tickets through various stages (OPEN, ANSWERED, REOPENED, CLOSED)
- **Priority Management**: Set and update ticket priorities (LOW, MEDIUM, HIGH, CRITICAL)
- **Category Assignment**: Organize tickets by service categories
- **Institution Assignment**: Route tickets to appropriate institutions
- **User Assignment**: Assign specific staff members to handle tickets

### 2. Audit Logging
- **Complete History**: Track all changes made to tickets
- **Change Tracking**: Monitor modifications to:
  - Ticket status
  - Assigned users
  - Assigned institutions
  - Priority levels
- **User Accountability**: Record who made each change
- **Timeline View**: Visual representation of ticket history
- **Change Comparison**: Side-by-side view of old and new values

### 3. User Management
- **Role-Based Access**: Different access levels for different user types
- **Institution Management**: Organize users by institutions
- **User Profiles**: Detailed user information and activity tracking

### 4. Institution Management
- **Service Categories**: Define service categories for each institution
- **Staff Assignment**: Manage institution staff and their roles
- **Performance Tracking**: Monitor institution response times and resolution rates

## 🛠️ Technical Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd complaints-fe
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update environment variables with your configuration

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
src/
├── adapters/        # Data transformation and API adapters
├── api/            # API integration and services
├── components/     # Reusable UI components
├── constants/      # Application constants and enums
├── containers/     # Complex components and business logic
├── helpers/        # Utility functions and helpers
├── hooks/          # Custom React hooks
├── lib/           # Third-party library configurations
├── pages/         # Application pages and routes
├── routes/        # Route definitions and navigation
├── states/        # State management (Redux)
├── types/         # TypeScript type definitions
└── usecases/      # Business logic and use cases
```

## 🔑 Key Directories Explained

### `/src/components`
Contains reusable UI components like:
- Buttons
- Form inputs
- Status badges
- User labels
- Loading indicators

### `/src/pages`
Main application pages:
- Ticket listing and details
- Audit logs
- User management
- Institution management

### `/src/usecases`
Business logic implementation:
- Ticket management
- Audit logging
- User operations
- Institution operations

### `/src/states`
State management using Redux:
- Authentication state
- Ticket state
- Audit log state
- User state

## 🎨 UI/UX Features

### Modern Design
- Clean and intuitive interface
- Responsive layout for all devices
- Consistent color scheme and typography
- Clear visual hierarchy

### User Experience
- Real-time updates
- Intuitive navigation
- Clear status indicators
- Helpful tooltips and guides
- Smooth transitions and animations

## 🔒 Security Features

- Role-based access control
- Secure authentication
- Protected routes
- Data validation
- Audit logging for all actions

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Development Tools

- **React**: Frontend framework
- **TypeScript**: Type-safe programming
- **Vite**: Fast development and building
- **Redux**: State management
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **ESLint**: Code quality
- **Prettier**: Code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## 👥 Support

For support, please contact [princeelysee@gmail.com](mailto:princeelysee@gmail.com)

## 🔄 Updates and Maintenance

The application is regularly updated with:
- Bug fixes
- Security patches
- New features
- Performance improvements

## 📈 Future Enhancements

Planned features include:
- Advanced reporting
- Analytics dashboard
- Mobile application
- Integration with external systems
- Enhanced notification system
