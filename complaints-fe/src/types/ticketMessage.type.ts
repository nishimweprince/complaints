import { AbstractEntity, UUID } from ".";
import { User } from "./user.type";
import { Ticket } from "./ticket.type";

export interface TicketMessage extends AbstractEntity {
  message: string;
  createdById: UUID;
  ticketId: UUID;
  
  createdBy?: User;
  ticket?: Ticket;
}
