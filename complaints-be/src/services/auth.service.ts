import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { ConflictError, ValidationError } from "../helpers/errors.helper";
import { comparePasswords, hashPassword } from "../helpers/encryption.helper";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * LOGIN
   */
  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{
    user: User;
    token: string;
  }> {
    const userExists = await this.userRepository.findOne({
      where: [{ email: username }, { phoneNumber: username }],
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        passwordHash: true,
        userRoles: {
          role: {
            id: true,
            name: true,
            rolePermissions: {
              permission: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!userExists) {
      throw new ValidationError("Email or password is incorrect");
    }

    const passwordMatch = await comparePasswords(
      password,
      userExists?.passwordHash || ""
    );

    if (!passwordMatch) {
      throw new ValidationError("Email or password is incorrect");
    }

    const token = jwt.sign(
      {
        userId: userExists.id,
        permissions: userExists.userRoles
          .flatMap((userRole) =>
            userRole.role.rolePermissions.map(
              (rolePermission) => rolePermission.permission.name
            )
          )
          .filter((permission) => permission !== null),
      },
      process.env.JWT_SECRET || ""
    );

    return { user: userExists, token };
  }

  /**
   * SIGNUP
   */
  async signup({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{
    user: User;
    token: string;
  }> {
    const userExists = await this.userRepository.findOne({
      where: [{ email: username }, { phoneNumber: username }],
    });

    if (userExists) {
      throw new ConflictError("User already exists", {
        userId: userExists.id,
      });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await this.userRepository.save({
      email: username,
      passwordHash,
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      process.env.JWT_SECRET || ""
    );

    return { user: newUser, token };
  }
}
