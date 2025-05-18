import { TicketStatus } from "../constants/ticket.constants";
import { TicketPriority } from "../constants/ticket.constants";
import { UUID } from "../types";
import { AbstractEntity } from "./index";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Institution } from "./institution.entity";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { TicketMessage } from "./ticketMessage.entity";

@Entity("tickets")
export class Ticket extends AbstractEntity {
  // TITLE
  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  // REFERENCE ID
  @Column({
    name: "reference_id",
    type: "varchar",
    unique: true,
    nullable: false,
  })
  referenceId: string;

  // STATUS
  @Column({
    name: "status",
    type: "enum",
    enum: TicketStatus,
    nullable: false,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  // PRIORITY
  @Column({
    name: "priority",
    type: "enum",
    enum: TicketPriority,
    nullable: false,
    default: TicketPriority.LOW,
  })
  priority: TicketPriority;

  // CREATED BY ID
  @Column({ name: "created_by_id", type: "uuid", nullable: false })
  createdById: UUID;

  // ASSIGNED INSTITUTION ID
  @Column({ name: "assigned_institution_id", type: "uuid", nullable: true })
  assignedInstitutionId: UUID;

  // ASSIGNED USER ID
  @Column({ name: "assigned_user_id", type: "uuid", nullable: true })
  assignedUserId: UUID;

  // CATEGORY ID
  @Column({ name: "category_id", type: "uuid", nullable: true })
  categoryId: UUID;

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

  // ASSIGNED INSTITUTION
  @ManyToOne(() => Institution, (institution) => institution.id, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "assigned_institution_id" })
  assignedInstitution: Institution;

  // ASSIGNED USER
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "assigned_user_id" })
  assignedUser: User;

  // CATEGORY
  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  // MESSAGES
  @OneToMany(() => TicketMessage, (message) => message.ticket)
  messages: TicketMessage[];
}
