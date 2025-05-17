import { AbstractEntity } from ".";

export interface Category extends AbstractEntity {
  name: string;
  description?: string;
}
