import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./index";
import { IsEmail } from "class-validator";
import { UserRole } from "./userRole.entity";

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
  passwordHash: string;

  // PHONE NUMBER
  @Column({
    name: "phone_number",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phoneNumber?: string;

  /**
   * RELATIONS
   */

  // USER ROLES
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
