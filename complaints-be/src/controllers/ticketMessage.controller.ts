import { NextFunction, Request, Response } from 'express';
import { TicketMessageService } from '../services/ticketMessage.service';
import { AuthenticatedRequest } from '../types/auth.types';
import { UUID } from '../types';

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

  /**
   * CREATE TICKET MESSAGE
   */
  async createTicketMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as AuthenticatedRequest;

      const ticketMessage = await ticketMessageService.createTicketMessage({
        ...req.body,
        createdById: user?.id as UUID,
      });

      return res.status(201).json({
        message: 'Ticket message created successfully',
        data: ticketMessage,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE TICKET MESSAGE
   */
  async deleteTicketMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { user } = req as AuthenticatedRequest;

      await ticketMessageService.deleteTicketMessage(id as UUID, {
        createdById: user?.id as UUID,
      });

      return res.status(204).json({
        message: 'Ticket message deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
