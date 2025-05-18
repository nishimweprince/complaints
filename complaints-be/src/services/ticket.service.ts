import { Request } from 'express';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Ticket } from '../entities/ticket.entity';
import { generateReferenceID } from '../helpers/strings.helper';
import { UUID } from '../types';
import { NotFoundError } from '../helpers/errors.helper';
import { AuditDelete, AuditUpdate } from '../decorators/auditLog.decorator';
import { AuditLogEntityTypes } from '../constants/auditLog.constants';
import { TicketPriority, TicketStatus } from '../constants/ticket.constants';
import {
  getPagination,
  getPagingData,
  Pagination,
} from '../helpers/pagination.helper';
import { TicketMessage } from '../entities/ticketMessage.entity';

export class TicketService {
  private readonly ticketRepository: Repository<Ticket>;
  private readonly ticketMessageRepository: Repository<TicketMessage>;

  constructor() {
    this.ticketRepository = AppDataSource.getRepository(Ticket);
    this.ticketMessageRepository = AppDataSource.getRepository(TicketMessage);
  }
  /**
   * CREATE TICKET
   */
  async createTicket({
    ticket,
    ticketMessage
  }: {
    ticket: Partial<Ticket>;
    ticketMessage: Partial<TicketMessage>;
  }): Promise<Ticket> {
    // CREATE TICKET

    // GENERATE REFERENCE ID
    let referenceId = generateReferenceID('T', 5);

    // CHECK IF REFERENCE ID EXISTS
    while (
      await this.ticketRepository.findOne({
        where: { referenceId },
      })
    ) {
      referenceId = generateReferenceID('T', 5);
    }

    // SET REFERENCE ID
    ticket.referenceId = referenceId;

    const createdTicket = await this.ticketRepository.save(ticket);

    // CREATE TICKET MESSAGE
    let message: TicketMessage | undefined;
    if (ticketMessage) {
      message = await this.ticketMessageRepository.save({
        ...ticketMessage,
        ticketId: createdTicket?.id,
        createdById: createdTicket?.createdById,
      });
    }

    // RETURN TICKET
    return createdTicket;
  }

  /**
   * UPDATE TICKET
   */
  @AuditUpdate({
    entityType: AuditLogEntityTypes.TICKET,
    getEntityId: (args) => args[0]?.id,
    getEntity: (args) => args[0]?.ticket,
    getUserId: (args) => args[0]?.metadata.createdById,
  })
  async updateTicket({
    id,
    ticket,
    metadata,
  }: {
    id: UUID;
    ticket: Partial<Ticket>;
    metadata: { createdById: UUID };
  }): Promise<Ticket> {
    // FIND TICKET
    const existingTicket = await this.ticketRepository.findOne({
      where: { id },
    });

    // IF TICKET NOT FOUND, THROW ERROR
    if (!existingTicket) {
      throw new NotFoundError('Ticket not found');
    }

    // UPDATE TICKET
    return this.ticketRepository.save({ ...existingTicket, ...ticket });
  }

  /**
   * GET TICKET BY ID
   */
  async getTicketById(id: UUID): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }
    // RETURN TICKET

    return ticket;
  }

  /**
   * DELETE TICKET
   */
  @AuditDelete({
    entityType: AuditLogEntityTypes.TICKET,
    getEntityId: (args) => args[0]?.id,
    getUserId: (args) => args[0]?.metadata.createdById,
  })
  async deleteTicket(
    id: UUID,
    metadata: { createdById: UUID }
  ): Promise<Ticket> {
    // FIND TICKET
    const existingTicket = await this.ticketRepository.findOne({
      where: { id },
    });

    // IF TICKET NOT FOUND, THROW ERROR
    if (!existingTicket) {
      throw new NotFoundError('Ticket not found');
    }

    // DELETE TICKET
    return this.ticketRepository.remove(existingTicket);
  }

  /**
   * FETCH TICKETS
   */
  async fetchTickets({
    params,
  }: {
    params: Request['query'];
  }): Promise<Pagination<Ticket>> {
    // GET QUERY PARAMS
    const {
      status,
      priority,
      assignedUserId,
      categoryId,
      assignedInstitutionId,
      createdById,
      page = 0,
      size = 10,
      searchQuery,
    } = params;

    // GET PAGINATION
    const { take, skip } = getPagination({
      page: Number(page),
      size: Number(size),
    });

    let condition: FindOptionsWhere<Ticket> | FindOptionsWhere<Ticket>[] = {};

    if (status) {
      condition.status = status as TicketStatus;
    }
    if (priority) {
      condition.priority = priority as TicketPriority;
    }
    if (assignedUserId) {
      condition.assignedUserId = assignedUserId as UUID;
    }
    if (assignedInstitutionId) {
      condition.assignedInstitutionId = assignedInstitutionId as UUID;
    }

    if (createdById) {
      condition.createdById = createdById as UUID;
    }

    if (categoryId) {
      condition.categoryId = categoryId as UUID;
    }

    if (searchQuery) {
      condition = [
        {
          referenceId: ILike(`%${searchQuery}%`),
        },
        {
          title: ILike(`%${searchQuery}%`),
        },
        {
          category: {
            name: ILike(`%${searchQuery}%`),
          },
        },
        {
          assignedInstitution: {
            name: ILike(`%${searchQuery}%`),
          },
        },
        {
          assignedUser: {
            name: ILike(`%${searchQuery}%`),
          },
        },
        {
          createdBy: {
            name: ILike(`%${searchQuery}%`),
          },
        },
      ];
    }
    // IF NO CONDITION, SET TO EMPTY OBJECT
    if (Object.keys(condition).length === 0) {
      condition = {};
    }
    // IF NO SEARCH QUERY, SET TO EMPTY ARRAY
    if (searchQuery && Object.keys(condition).length === 0) {
      condition = [];
    }

    // FIND TICKETS
    const tickets = await this.ticketRepository.findAndCount({
      where: condition,
      take,
      skip,
      relations: {
        createdBy: true,
        assignedUser: true,
        assignedInstitution: true,
        category: true,
      },
    });

    return getPagingData({
      data: tickets,
      page: Number(page),
      size: Number(size),
    });
  }
}
