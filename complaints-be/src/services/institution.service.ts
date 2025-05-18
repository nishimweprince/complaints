import { Request } from "express";
import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { Institution } from "../entities/institution.entity";
import { AppDataSource } from "../data-source";
import { UUID } from "../types";
import { ConflictError, NotFoundError } from "../helpers/errors.helper";
import { LogReferenceTypes } from "../constants/logs.constants";
import { AuditDelete, AuditUpdate } from "../decorators/auditLog.decorator";
import { AuditLogEntityTypes } from "../constants/auditLog.constants";
import { UserService } from "./user.service";
import { User } from "../entities/user.entity";
import { sendEmail } from "../helpers/emails.helper";
import { institutionUserCreatedTemplate } from "../templates/emails/user.templates";
import { generateRandomString } from "../helpers/strings.helper";
import {
  getPagination,
  getPagingData,
  Pagination,
} from "../helpers/pagination.helper";
import logger from "../helpers/logger.helper";

export class InstitutionService {
  private readonly institutionRepository: Repository<Institution>;
  private readonly userService: UserService;

  constructor() {
    this.institutionRepository = AppDataSource.getRepository(Institution);
    this.userService = new UserService();
  }

  /**
   *
   * CREATE INSTITUTION
   */
  async createInstitution({
    institution,
    admin,
  }: {
    institution: Partial<Institution>;
    admin?: {
      email?: string;
    };
  }): Promise<Institution> {
    // CHECK IF INSTITUTION NAME EXISTS
    const existingInstitution = await this.institutionRepository.findOne({
      where: { name: institution.name },
    });

    if (existingInstitution) {
      throw new ConflictError("Institution name already exists", {
        referenceId: institution?.name,
        referenceType: LogReferenceTypes.INSTITUTION,
      });
    }

    // CREATE INSTITUTION
    const newInstitution = await this.institutionRepository.save({
      ...institution,
    });

    // CREATE ADMIN USER
    let newAdmin: User | null = null;
    if (admin?.email) {
      // GENERATE PASSWORD
      const password = generateRandomString();

      newAdmin = await this.userService.createUserByEmail({
        email: admin?.email,
        institutionId: newInstitution?.id,
        password,
      });

      // SEND INSTITUTION USER CREATED EMAIL
      try {
        await sendEmail({
          toEmail: admin?.email,
          subject: "Institution User Created",
          htmlContent: institutionUserCreatedTemplate({
            institution: newInstitution,
            password,
            user: newAdmin,
          }),
        });
      } catch (error) {
        logger.error(error);
      }
    }

    return newInstitution;
  }

  /**
   * GET INSTITUTION BY ID
   */
  async getInstitutionById(id: UUID): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({
      where: { id },
    });

    if (!institution) {
      throw new NotFoundError("Institution not found", {
        referenceId: id,
        referenceType: LogReferenceTypes.INSTITUTION,
      });
    }

    return institution;
  }

  /**
   * UPDATE INSTITUTION
   */
  @AuditUpdate({
    entityType: AuditLogEntityTypes.INSTITUTION,
    getEntityId: (args) => args[0].id,
    getEntity: (args) => args[0].institution,
    getUserId: (args) => args[0]?.metadata?.createdById,
  })
  async updateInstitution({
    id,
    institution,
    metadata,
  }: {
    id: UUID;
    institution: Partial<Institution>;
    metadata?: {
      createdById?: UUID;
    };
  }): Promise<Institution> {
    const existingInstitution = await this.institutionRepository.findOne({
      where: { id },
    });

    if (!existingInstitution) {
      throw new NotFoundError("Institution not found", {
        referenceId: id,
        referenceType: LogReferenceTypes.INSTITUTION,
      });
    }

    return this.institutionRepository.save({
      ...existingInstitution,
      ...institution,
    });
  }

  /**
   * DELETE INSTITUTION
   */
  @AuditDelete({
    entityType: AuditLogEntityTypes.INSTITUTION,
    getEntityId: (args) => args[0],
    getUserId: (args) => args[1]?.metadata?.createdById,
  })
  async deleteInstitution(
    id: UUID,
    metadata?: { createdById?: UUID }
  ): Promise<void> {
    const existingInstitution = await this.institutionRepository.findOne({
      where: { id },
    });

    if (!existingInstitution) {
      throw new NotFoundError("Institution not found", {
        referenceId: id,
        referenceType: LogReferenceTypes.INSTITUTION,
      });
    }

    await this.institutionRepository.delete(id);
  }

  /**
   * FETCH INSTITUTIONS
   */
  async fetchInstitutions({
    params,
  }: {
    params?: Request["query"];
  }): Promise<Pagination<Institution>> {
    // GET PARAMS
    const { page = 0, size = 10, searchQuery, categories } = params || {};

    // GET PAGINATION
    const { skip, take } = getPagination({
      page: Number(page),
      size: Number(size),
    });

    // INITIALIZE CONDITION
    let condition:
      | FindOptionsWhere<Institution>
      | FindOptionsWhere<Institution>[] = {};

    if (categories) {
      condition.categories = In(String(categories).split(","));
    }

    if (searchQuery) {
      condition = [
        {
          name: ILike(`%${searchQuery}%`),
        },
        {
          description: ILike(`%${searchQuery}%`),
        },
      ];
    }

    // GET INSTITUTIONS
    const institutions = await this.institutionRepository.findAndCount({
      skip,
      take,
      where: condition,
    });

    return getPagingData({
      data: institutions,
      page: Number(page),
      size: Number(size),
    });
  }
}
