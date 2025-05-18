import { Router } from 'express';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import institutionRoutes from './institution.routes';
import ticketRoutes from './ticket.routes';
import ticketMessageRoutes from './ticketMessage.routes';
import auditLogRoutes from './auditLog.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/institutions', institutionRoutes);
router.use('/categories', categoryRoutes);
router.use('/tickets', ticketRoutes);
router.use('/ticket-messages', ticketMessageRoutes);
router.use('/audit-logs', auditLogRoutes);

export default router;
