import { AbstractEntity } from ".";

export interface Institution extends AbstractEntity {
  name: string;
  description?: string;
  categories?: string[];
}
