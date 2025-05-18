import { Request } from 'express';
import { UUID } from 'crypto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { TicketMessage } from '../entities/ticketMessage.entity';
import {
  getPagination,
  getPagingData,
  Pagination,
} from '../helpers/pagination.helper';
import { AuditDelete } from '../decorators/auditLog.decorator';
import { AuditLogEntityTypes } from '../constants/auditLog.constants';
import { ForbiddenError, NotFoundError } from '../helpers/errors.helper';
import { Ticket } from '../entities/ticket.entity';
import { TicketStatus } from '../constants/ticket.constants';
import { TicketService } from './ticket.service';

export class TicketMessageService {
  private ticketMessageRepository: Repository<TicketMessage>;
  private ticketRepository: Repository<Ticket>;
  private ticketService: TicketService;

  constructor() {
    this.ticketMessageRepository = AppDataSource.getRepository(TicketMessage);
    this.ticketRepository = AppDataSource.getRepository(Ticket);
    this.ticketService = new TicketService();
  }

  /**
   * FETCH TICKET MESSAGES
   */
  async fetchTicketMessages({
    params,
  }: {
    params: Request['query'];
  }): Promise<Pagination<TicketMessage>> {
    // GET PARAMS
    const { ticketId, page = 0, size = 10 } = params;

    // GET PAGINATION
    const { take, skip } = getPagination({
      page: Number(page),
      size: Number(size),
    });

    // INIITIALIZE CONDITION
    let condition:
      | FindOptionsWhere<TicketMessage>
      | FindOptionsWhere<TicketMessage>[] = {};

    // CHECK IF TICKET ID IS PROVIDED
    if (ticketId) {
      condition.ticketId = ticketId as UUID;
    }

    const ticketMessages = await this.ticketMessageRepository.findAndCount({
      where: condition,
      skip,
      take,
      relations: {
        createdBy: true,
      },
    });

    return getPagingData({
      data: ticketMessages,
      page: Number(page),
      size: Number(size),
    });
  }

  /**
   * DELETE TICKET MESSAGE
   */
  @AuditDelete({
    entityType: AuditLogEntityTypes.TICKET_MESSAGE,
    getEntityId: (args) => args[0].id,
    getUserId: (args) => args[1]?.createdById,
  })
  async deleteTicketMessage(
    id: UUID,
    metadata: { createdById: UUID }
  ): Promise<void> {
    // CHECK IF TICKET MESSAGE EXISTS
    const ticketMessage = await this.ticketMessageRepository.findOne({
      where: { id },
    });

    // CHECK IF TICKET MESSAGE EXISTS
    if (!ticketMessage) {
      throw new NotFoundError('Ticket message not found');
    }

    // CHECK IF USER IS THE CREATOR OF THE TICKET MESSAGE
    if (ticketMessage.createdById !== metadata.createdById) {
      throw new ForbiddenError(
        'You are not allowed to delete this ticket message'
      );
    }

    await this.ticketMessageRepository.delete(id);
  }

  /**
   * CREATE TICKET MESSAGE
   */
  async createTicketMessage(
    ticketMessage: Partial<TicketMessage>
  ): Promise<TicketMessage> {
    // CHECK IF TICKET EXISTS
    const ticketExists = await this.ticketRepository.findOne({
      where: { id: ticketMessage.ticketId },
      relations: {
        assignedInstitution: true,
        assignedUser: true,
        createdBy: true,
      },
    });

    if (!ticketExists) {
      throw new NotFoundError('Ticket not found', {
        referenceId: ticketMessage?.ticketId,
      });
    }

    if (
      ['CLOSED', 'ANSWERED'].includes(ticketExists?.status) &&
      ticketMessage?.createdById === ticketExists?.createdById
    ) {
      ticketExists.status = TicketStatus.REOPENED;
    } else if (ticketExists?.assignedUser?.id !== ticketMessage.createdById) {
      ticketExists.status = TicketStatus.ANSWERED;

      if (
        !ticketExists?.assignedUser?.institutionId &&
        ticketMessage?.createdById
      ) {
        ticketExists.assignedUserId = ticketMessage?.createdById;
      }
    }

    // UPDATE TICKET STATUS
    await this.ticketService.updateTicket({
      id: ticketExists.id,
      ticket: {
        ...ticketExists,
      },
      metadata: { createdById: ticketMessage?.createdById as UUID },
    });

    // CREATE TICKET MESSAGE
    return this.ticketMessageRepository.save(ticketMessage);
  }
}
