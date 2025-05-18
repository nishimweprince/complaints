import { AbstractEntity, UUID } from ".";
import { Institution } from "./institution.type";
import { User } from "./user.type";
import { Category } from "./category.type";
import { TicketMessage } from "./ticketMessage.type";
import { TicketStatus, TicketPriority } from "../constants/ticket.constants";

export interface Ticket extends AbstractEntity {
  title: string;
  referenceId: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdById: UUID;
  assignedInstitutionId?: UUID;
  assignedUserId?: UUID;
  categoryId?: UUID;
  
  // Relations
  createdBy?: User;
  assignedInstitution?: Institution;
  assignedUser?: User;
  category?: Category;
  messages?: TicketMessage[];
}
