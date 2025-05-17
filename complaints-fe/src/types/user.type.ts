import { AbstractEntity } from ".";

export interface User extends AbstractEntity {
  name?: string;
  email?: string;
  passwordHash?: string;
  phoneNumber?: string;
}