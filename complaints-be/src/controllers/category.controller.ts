import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";
import { UUID } from "../types";

// LOAD SERVICES
const categoryService = new CategoryService();

export class CategoryController {
  /**
   * CREATE CATEGORY
   */
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.createCategory(req.body);
      return res
        .status(201)
        .json({ message: "Category created", data: category });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET CATEGORY BY ID
   */
  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id as UUID);
      return res
        .status(200)
        .json({ message: "Category fetched", data: category });
    } catch (error) {
      next(error);
    }
  }

  /**
   * FETCH CATEGORIES
   */
  async fetchCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.fetchCategories({
        params: req.query,
      });
      return res
        .status(200)
        .json({ message: "Categories fetched", data: categories });
    } catch (error) {
      next(error);
    }
  }
}
