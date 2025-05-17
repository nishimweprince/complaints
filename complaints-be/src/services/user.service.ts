import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { hashPassword } from "../helpers/encryption.helper";

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * CREATE USER BY EMAIL
   */
  async createUserByEmail({
    email,
    password,
  }: {
    email: string;
    password?: string;
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

    const newUser = await this.userRepository.save({
      email,
      passwordHash,
    });

    return newUser;
  }
}
