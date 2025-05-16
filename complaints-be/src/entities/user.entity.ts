import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./index";

@Entity("users")
export class User extends AbstractEntity {
  // NAME
  @Column({ type: "varchar", length: 255 })
  name: string;
}
