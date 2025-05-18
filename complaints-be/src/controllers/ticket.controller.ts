import { NextFunction, Response, Request } from "express";
import { TicketService } from "../services/ticket.service";
import { UUID } from "../types";
import { AuthenticatedRequest } from "../types/auth.types";

// LOAD SERVICES
const ticketService = new TicketService();

export class TicketController {
  /**
   * CREATE TICKET
   */
  async createTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as AuthenticatedRequest;
      const { ticket, ticketMessage } = req.body;

      const createdTicket = await ticketService.createTicket({
        ticket: {
          ...ticket,
          createdById: user?.id,
        },
        ticketMessage,
      });

      return res.status(201).json({
        message: "Ticket created successfully",
        data: createdTicket,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET TICKET
   */
  async getTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id as UUID);

      return res.status(200).json({
        message: "Ticket retrieved successfully",
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE TICKET
   */
  async deleteTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as AuthenticatedRequest;

      const ticket = await ticketService.deleteTicket(
        req.params.id as UUID,
        {
          createdById: user?.id,
        }
      );

      return res.status(200).json({
        message: "Ticket deleted successfully",
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * FETCH TICKETS
   */
  async fetchTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await ticketService.fetchTickets({
        params: req.query,
      });

      return res.status(200).json({
        message: "Tickets fetched successfully",
        data: tickets,
      });
    } catch (error) {
      next(error);
    }
  }
}
