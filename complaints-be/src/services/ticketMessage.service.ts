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

export class TicketMessageService {
  private ticketMessageRepository: Repository<TicketMessage>;

  constructor() {
    this.ticketMessageRepository = AppDataSource.getRepository(TicketMessage);
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
}
