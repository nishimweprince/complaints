import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

// LOAD CONTROLLERS
const dashboardController = new DashboardController();

const dashboardRoutes = Router();

/**
 * COUNT TICKETS BY STATUS
 */
dashboardRoutes.get(
  '/tickets/count-by-status',
  authMiddleware,
  dashboardController.countTicketsByStatus
);

/**
 * GET TICKETS TREND
 */
dashboardRoutes.get(
  '/tickets/trends',
  authMiddleware,
  dashboardController.getTicketsTrend
);

export default dashboardRoutes;
