import { UUID } from "../types";
import { AbstractEntity } from "./index";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Ticket } from "./ticket.entity";

@Entity("ticket_messages")
export class TicketMessage extends AbstractEntity {
  // MESSAGE
  @Column({ name: "message", type: "text", nullable: false })
  message: string;

  // CREATED BY ID
  @Column({ name: "created_by_id", type: "uuid", nullable: false })
  createdById: UUID;

  // TICKET ID
  @Column({ name: "ticket_id", type: "uuid", nullable: false })
  ticketId: UUID;

  /**
   * RELATIONS
   */

  // CREATED BY
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "created_by_id" })
  createdBy: User;

  // TICKET
  @ManyToOne(() => Ticket, (ticket) => ticket.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "ticket_id" })
  ticket: Ticket;
}
