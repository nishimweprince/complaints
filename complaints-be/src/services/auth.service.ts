import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { ConflictError, ValidationError } from "../helpers/errors.helper";
import { comparePasswords, hashPassword } from "../helpers/encryption.helper";
import jwt from "jsonwebtoken";
import { UUID } from "../types";

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
    permissions: string[];
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
          id: true,
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
        institution: {
          id: true,
          name: true,
          categories: true,
        },
      },
      relations: {
        institution: true,
        userRoles: {
          role: {
            rolePermissions: {
              permission: true,
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

    const permissions = [
      ...new Set(
        userExists?.userRoles
          .flatMap((userRole) =>
            userRole.role.rolePermissions.map(
              (rolePermission) => rolePermission.permission.name
            )
          )
          .filter((permission) => permission !== null)
      ),
    ];

    const token = jwt.sign(
      {
        user: {
          id: userExists?.id,
          institutionId: userExists?.institution?.id,
        },
        permissions,
      },
      process.env.JWT_SECRET || ""
    );

    return {
      user: {
        ...userExists,
        passwordHash: undefined,
      },
      token,
      permissions,
    };
  }

  /**
   * SIGNUP
   */
  async signup({
    username,
    password,
    institutionId,
    phoneNumber,
  }: {
    username: string;
    password: string;
    institutionId?: UUID;
    phoneNumber?: string;
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
      institutionId,
      phoneNumber,
    });

    const token = jwt.sign(
      {
        user: {
          id: newUser?.id,
        },
      },
      process.env.JWT_SECRET || ""
    );

    return { user: newUser, token };
  }
}
