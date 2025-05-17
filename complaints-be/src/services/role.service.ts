import { In, Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { AppDataSource } from "../data-source";
import { UUID } from "../types";
import { NotFoundError } from "../helpers/errors.helper";

export class RoleService {
  private readonly roleRepository: Repository<Role>;

  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  // CREATE ROLE
  async createRole(role: Partial<Role>): Promise<Role> {
    // CHECK IF ROLE EXISTS
    const existingRole = await this.roleRepository.findOne({
      where: { name: role?.name },
    });

    if (existingRole) {
      return existingRole;
    }

    // CREATE ROLE
    return this.roleRepository.save(role);
  }

  // GET ROLE BY ID
  async getRoleById(id: UUID): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    return role;
  }

  // GET ROLE BY NAME
  async getRoleByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({
      where: { name },
    });
  }
}
