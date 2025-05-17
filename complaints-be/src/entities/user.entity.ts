import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./index";
import { UUID } from "../types";
import { IsEmail } from "class-validator";
import { UserRole } from "./userRole.entity";
import { Institution } from "./institution.entity";

@Entity("users")
export class User extends AbstractEntity {
  // NAME
  @Column({ type: "varchar", length: 255, nullable: true })
  name?: string;

  // EMAIL
  @IsEmail()
  @Column({
    name: "email",
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  // PASSWORD
  @Column({
    name: "password_hash",
    type: "varchar",
    length: 255,
    nullable: true,
    select: false,
  })
  passwordHash?: string;

  // PHONE NUMBER
  @Column({
    name: "phone_number",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phoneNumber?: string;

  // INSTITUTION ID
  @Column({ name: "institution_id", type: "uuid", nullable: true })
  institutionId?: UUID;

  /**
   * RELATIONS
   */

  // INSTITUTION
  @ManyToOne(() => Institution, (institution) => institution.id, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "institution_id" })
  institution: Institution;

  // USER ROLES
  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    cascade: true,
    eager: true,
  })
  userRoles: UserRole[];
}
