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
import { Category } from '../entities/category.entity';
import { Institution } from '../entities/institution.entity';
import { generateResponse } from '../helpers/claude.helper';
import {
  getCategoryTemplate,
  getInstitutionTemplate,
} from '../templates/tickets/routing.templates';

export class TicketService {
  private readonly ticketRepository: Repository<Ticket>;
  private readonly ticketMessageRepository: Repository<TicketMessage>;
  private readonly categoryRepository: Repository<Category>;
  private readonly institutionRepository: Repository<Institution>;

  constructor() {
    this.ticketRepository = AppDataSource.getRepository(Ticket);
    this.ticketMessageRepository = AppDataSource.getRepository(TicketMessage);
    this.categoryRepository = AppDataSource.getRepository(Category);
    this.institutionRepository = AppDataSource.getRepository(Institution);
  }
  /**
   * CREATE TICKET
   */
  async createTicket({
    ticket,
    ticketMessage,
  }: {
    ticket: Partial<Ticket>;
    ticketMessage: Partial<TicketMessage>;
  }): Promise<Ticket> {
    // GENERATE REFERENCE ID
    let referenceId = generateReferenceID('T', 5);

    // INITIALIZE CATEGORY AND INSTITUTION
    let categoryId: UUID | undefined = ticket?.categoryId;
    let institutionId: UUID | undefined = ticket?.assignedInstitutionId;

    // CHECK IF CATEGORY AND INSTITUTION EXISTS
    if (!categoryId) {
      const categories = await this.categoryRepository.find();

      // IF NO CATEGORY PROVIDED, GENERATE CATEGORY
      if (categories?.length > 0) {
        const categoryTemplate = getCategoryTemplate(
          categories,
          ticketMessage?.message || 'No ticket message provided'
        );

        const category = await generateResponse(categoryTemplate);

        if (category && JSON.parse(category)) {
          const categoryData = JSON.parse(category);
          categoryId = categoryData?.id;
        }
      }
    }

    // CHECK IF INSTITUTION EXISTS
    if (!institutionId) {
      const institutions = await this.institutionRepository.find();

      // IF NO INSTITUTION PROVIDED, GENERATE INSTITUTION
      if (institutions?.length > 0) {
        const institutionTemplate = getInstitutionTemplate(
          institutions,
          ticketMessage?.message || 'No ticket message provided'
        );

        const institution = await generateResponse(institutionTemplate);

        if (institution && JSON.parse(institution)) {
          const institutionData = JSON.parse(institution);
          institutionId = institutionData?.id;
        }
      }
    }

    // SET CATEGORY AND INSTITUTION
    if (categoryId) {
      ticket.categoryId = categoryId;
    }

    if (institutionId) {
      ticket.assignedInstitutionId = institutionId;
    }

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

    if (status && status !== 'null') {
      condition.status = status as TicketStatus;
    }
    if (priority && priority !== 'null') {
      condition.priority = priority as TicketPriority;
    }
    if (assignedUserId && assignedUserId !== 'null') {
      condition.assignedUserId = assignedUserId as UUID;
    }
    if (assignedInstitutionId && assignedInstitutionId !== 'null') {
      condition.assignedInstitutionId = assignedInstitutionId as UUID;
    }

    if (createdById && createdById !== 'null') {
      condition.createdById = createdById as UUID;
    }

    if (categoryId && categoryId !== 'null') {
      condition.categoryId = categoryId as UUID;
    }

    if (searchQuery && searchQuery !== 'null') {
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
