import { NextFunction, Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { UUID } from '../types';
import { TicketStatus } from '../constants/ticket.constants';

// LOAD SERVICES
const dashboardService = new DashboardService();

export class DashboardController {
  /**
   * COUNT TICKETS BY STATUS
   */
  async countTicketsByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { institutionId, createdById, statuses } = req.query as {
        institutionId: UUID;
        createdById: UUID;
        statuses: TicketStatus[];
      };

      const data = await dashboardService.countTicketsByStatus({
        institutionId: institutionId as UUID,
        createdById: createdById as UUID,
        statuses: statuses
          ? ((statuses as unknown as string).split(',') as TicketStatus[])
          : undefined,
      });

      return res.status(200).json({
        message: 'Tickets count fetched successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET TICKETS TREND
   */
  async getTicketsTrend(req: Request, res: Response, next: NextFunction) {
    try {
      const { institutionId, createdById, statuses } = req.query as {
        institutionId: UUID;
        createdById: UUID;
        statuses: TicketStatus[];
      };

      const data = await dashboardService.getTicketsTrend({
        institutionId: institutionId as UUID,
        createdById: createdById as UUID,
        statuses: statuses
          ? ((statuses as unknown as string).split(',') as TicketStatus[])
          : undefined,
      });

      return res.status(200).json({
        message: 'Tickets trend fetched successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
