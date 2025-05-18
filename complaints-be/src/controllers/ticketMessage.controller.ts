import { NextFunction, Request, Response } from 'express';
import { TicketMessageService } from '../services/ticketMessage.service';

// LOAD SERVICES
const ticketMessageService = new TicketMessageService();

export class TicketMessageController {
  /**
   * FETCH TICKET MESSAGES
   */
  async fetchTicketMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketMessages = await ticketMessageService.fetchTicketMessages({
        params: req.query,
      });

      return res.status(200).json({
        message: 'Ticket messages fetched successfully',
        data: ticketMessages,
      });
    } catch (error) {
      next(error);
    }
  }
}
