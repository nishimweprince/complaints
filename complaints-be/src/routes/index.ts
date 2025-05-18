import { Router } from 'express';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import institutionRoutes from './institution.routes';
import ticketRoutes from './ticket.routes';
import ticketMessageRoutes from './ticketMessage.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/institutions', institutionRoutes);
router.use('/categories', categoryRoutes);
router.use('/tickets', ticketRoutes);
router.use('/ticket-messages', ticketMessageRoutes);

export default router;
