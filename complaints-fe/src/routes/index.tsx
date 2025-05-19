import { Route, Routes } from 'react-router-dom';
import LandingPage from '@/pages/common/LandingPage';
import Login from '@/pages/auth/Login';
import Dashboard from '@/pages/dashboard';
import InstitutionsPage from '@/pages/institutions/InstitutionsPage';
import TicketsPage from '@/pages/tickets/TicketsPage';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import CreateTicketPage from '@/pages/tickets/CreateTicketPage';
import TicketDetailsPage from '@/pages/tickets/TicketDetailsPage';
import TicketHistoryPage from '@/pages/tickets/TicketHistoryPage';
import Signup from '@/pages/auth/Signup';
import NotFoundPage from '@/pages/common/NotFoundPage';

const Router = () => {
  return (
    <Routes>

      {/**
       * COMMON ROUTES
       */}
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/**
       * AUTH ROUTES
       */}
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/**
       * AUTHENTICATED ROUTES
       */}
      <Route element={<AuthenticatedRoutes />}>
        {/**
         * DASHBOARD ROUTES
         */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/**
         * INSTITUTIONS ROUTES
         */}
        <Route path="/institutions">
          <Route path="" element={<InstitutionsPage />} />
        </Route>

        {/**
         * TICKETS ROUTES
         */}
        <Route path="/tickets">
          <Route path="" element={<TicketsPage />} />
          <Route path="create" element={<CreateTicketPage />} />
          <Route path=":id" element={<TicketDetailsPage />} />
          <Route path=":id/history" element={<TicketHistoryPage />} />
        </Route>

        {/**
         * AUDIT LOGS ROUTES
         */}
        <Route path="/audit-logs">
          <Route path="" element={<TicketHistoryPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
