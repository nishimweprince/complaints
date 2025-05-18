import { Router } from 'express';
import { TicketMessageController } from '../controllers/ticketMessage.controller';

// LOAD CONTROLLERS
const ticketMessageController = new TicketMessageController();

const ticketMessageRoutes = Router();

// FETCH TICKET MESSAGES
ticketMessageRoutes.get('/', ticketMessageController.fetchTicketMessages);

export default ticketMessageRoutes;
