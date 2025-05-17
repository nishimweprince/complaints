import { AbstractEntity, UUID } from ".";
import { Institution } from "./institution.type";

export interface User extends AbstractEntity {
  name?: string;
  email?: string;
  passwordHash?: string;
  phoneNumber?: string;
  institutionId?: UUID;
  institution?: Institution;
}