import { UUID } from "../types";
import { AbstractEntity } from "./index";
import { Column, Entity } from "typeorm";

@Entity("categories")
export class Category extends AbstractEntity {
  // NAME
  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  // DESCRIPTION
  @Column({ name: "description", type: "varchar", nullable: true })
  description: string;
}
