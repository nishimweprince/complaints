import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

// LOAD CONTROLLERS
const categoryController = new CategoryController();

const categoryRoutes = Router();

// CREATE CATEGORY
categoryRoutes.post("/", categoryController.createCategory);

// GET CATEGORY BY ID
categoryRoutes.get("/:id", categoryController.getCategoryById);

// FETCH CATEGORIES
categoryRoutes.get("/", categoryController.fetchCategories);

export default categoryRoutes;