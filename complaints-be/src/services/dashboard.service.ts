import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { AppDataSource } from '../data-source';
import { TicketStatus } from '../constants/ticket.constants';
import { UUID } from '../types';

export class DashboardService {
  private readonly ticketRepository: Repository<Ticket>;

  constructor() {
    this.ticketRepository = AppDataSource.getRepository(Ticket);
  }

  /**
   * COUNT TICKETS BY STATUS
   */
  async countTicketsByStatus({
    institutionId,
    createdById,
    statuses,
  }: {
    institutionId?: UUID;
    createdById?: UUID;
    statuses?: TicketStatus[];
  }): Promise<
    Array<{
      label: string;
      value: number;
    }>
  > {
    const queryBuilder = this.ticketRepository.createQueryBuilder('ticket');

    if (institutionId) {
      queryBuilder.andWhere('ticket.assignedInstitutionId = :institutionId', {
        institutionId,
      });
    }

    if (createdById) {
      queryBuilder.andWhere('ticket.createdById = :createdById', {
        createdById,
      });
    }

    if (statuses) {
      queryBuilder.andWhere('ticket.status IN (:...statuses)', { statuses });
    }

    const result = await queryBuilder
      .select('ticket.status', 'status')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('ticket.status')
      .getRawMany();

    return result.map((item) => ({
      label: item.status,
      value: Number(item.count),
    }));
  }

  /**
   * GET TICKETS TREND
   * Groups tickets by 6-hour intervals
   */
  async getTicketsTrend({
    institutionId,
    createdById,
    statuses,
  }: {
    institutionId?: UUID;
    createdById?: UUID;
    statuses?: TicketStatus[];
  }): Promise<
    Array<{
      label: string;
      value: number;
    }>
  > {
    const queryBuilder = this.ticketRepository.createQueryBuilder('ticket');

    if (institutionId) {
      queryBuilder.andWhere('ticket.assignedInstitutionId = :institutionId', {
        institutionId,
      });
    }

    if (createdById) {
      queryBuilder.andWhere('ticket.createdById = :createdById', {
        createdById,
      });
    }

    if (statuses) {
      queryBuilder.andWhere('ticket.status IN (:...statuses)', { statuses });
    }

    const result = await queryBuilder
      .select(
        "DATE_TRUNC('hour', ticket.createdAt) + INTERVAL '6 hours' * FLOOR(EXTRACT(HOUR FROM ticket.createdAt) / 6)",
        'timeInterval'
      )
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy(
        "DATE_TRUNC('hour', ticket.createdAt) + INTERVAL '6 hours' * FLOOR(EXTRACT(HOUR FROM ticket.createdAt) / 6)"
      )
      .orderBy(
        "DATE_TRUNC('hour', ticket.createdAt) + INTERVAL '6 hours' * FLOOR(EXTRACT(HOUR FROM ticket.createdAt) / 6)",
        'ASC'
      )
      .getRawMany();

    return result.map((item) => ({
      label: new Date(item.timeInterval).toISOString(),
      value: Number(item.count),
    }));
  }
}
