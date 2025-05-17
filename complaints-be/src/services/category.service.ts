import { Request } from "express";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
import { NotFoundError } from "../helpers/errors.helper";
import { UUID } from "../types";
import { AuditDelete, AuditUpdate } from "../decorators/auditLog.decorator";
import { AuditLogEntityTypes } from "../constants/auditLog.constants";

export class CategoryService {
  private readonly categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  /**
   *
   * CREATE CATEGORY
   */
  async createCategory(category: Partial<Category>): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  /**
   *
   * GET CATEGORY BY ID
   */
  async getCategoryById(id: UUID): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return category;
  }

  /**
   *
   * UPDATE CATEGORY
   */
  @AuditUpdate({
    entityType: AuditLogEntityTypes.CATEGORY,
    getEntityId: (args) => args[0]?.id,
    getEntity: (args) => args[0]?.category,
    getUserId: (args) => args[0]?.metadata.createdById,
  })
  async updateCategory({
    id,
    category,
    metadata,
  }: {
    id: UUID;
    category: Partial<Category>;
    metadata: {
      createdById: UUID;
    };
  }): Promise<Category> {
    const categoryExists = await this.getCategoryById(id);
    return this.categoryRepository.save({ ...categoryExists, ...category });
  }

  /**
   *
   * DELETE CATEGORY
   */
  @AuditDelete({
    entityType: AuditLogEntityTypes.CATEGORY,
    getEntityId: (args) => args[0]?.id,
    getUserId: (args) => args[1]?.metadata.createdById,
  })
  async deleteCategory(
    id: UUID,
    metadata: { createdById: UUID }
  ): Promise<void> {
    const category = await this.getCategoryById(id);
    await this.categoryRepository.remove(category);
  }

  /**
   *
   * LIST CATEGORIES
   */
  async fetchCategories({
    params,
  }: {
    params: Request["query"];
  }): Promise<Category[]> {
    // GET PARAMS
    const { searchQuery } = params || {};

    // INITIALIZE CONDITION
    let condition: FindOptionsWhere<Category> | FindOptionsWhere<Category>[] =
      {};

    if (searchQuery) {
      condition = [
        { name: ILike(`%${searchQuery}%`) },
        { description: ILike(`%${searchQuery}%`) },
      ];
    }

    return this.categoryRepository.find({
      where: condition,
    });
  }
}
