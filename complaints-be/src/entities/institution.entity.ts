import { AbstractEntity } from "./index";
import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./user.entity";

@Entity("institutions")
export class Institution extends AbstractEntity {
  // NAME
  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  // DESCRIPTION
  @Column({ name: "description", type: "varchar", nullable: true })
  description: string;

  // CATEGORIES
  @Column({ name: "categories", type: "jsonb", nullable: true })
  categories: string[];

  /**
   * RELATIONS
   */

  // USERS
  @OneToMany(() => User, (user) => user.institution)
  users: User[];
}
