import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

// LOAD CONTROLLERS
const authController = new AuthController();

const authRoutes = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/signup", authController.signup);

export default authRoutes;
