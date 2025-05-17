import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { hashPassword } from "../helpers/encryption.helper";
import { UUID } from "../types";
import { Institution } from "../entities/institution.entity";
import { NotFoundError } from "../helpers/errors.helper";
import { LogReferenceTypes } from "../constants/logs.constants";

export class UserService {
  private readonly userRepository: Repository<User>;
  private readonly institutionRepository: Repository<Institution>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.institutionRepository = AppDataSource.getRepository(Institution);
  }

  /**
   * CREATE USER BY EMAIL
   */
  async createUserByEmail({
    email,
    password,
    institutionId,
  }: {
    email: string;
    password?: string;
    institutionId?: UUID
  }): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return userExists;
    }

    let passwordHash: string | undefined = undefined;

    if (password) {
      passwordHash = await hashPassword(password);
    }

    if (institutionId) {
      const institution = await this.institutionRepository.findOne({
        where: { id: institutionId },
      });

      if (!institution) {
        throw new NotFoundError("Institution not found", {
          referenceId: institutionId,
          referenceType: LogReferenceTypes.INSTITUTION,
        });
      }
    }

    const newUser = await this.userRepository.save({
      email,
      passwordHash,
      institutionId,
    });

    return newUser;
  }
}
