import { Router } from 'express';
import { TicketMessageController } from '../controllers/ticketMessage.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

// LOAD CONTROLLERS
const ticketMessageController = new TicketMessageController();

const ticketMessageRoutes = Router();

// FETCH TICKET MESSAGES
ticketMessageRoutes.get('/', ticketMessageController.fetchTicketMessages);

// CREATE TICKET MESSAGE
ticketMessageRoutes.post('/', authMiddleware, ticketMessageController.createTicketMessage);

// DELETE TICKET MESSAGE
ticketMessageRoutes.delete('/:id', ticketMessageController.deleteTicketMessage);

export default ticketMessageRoutes;
