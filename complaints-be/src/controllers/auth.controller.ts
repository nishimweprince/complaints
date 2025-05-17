import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

// LOAD SERVICES
const authService = new AuthService();

export class AuthController {
  /**
   * LOGIN
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await authService.login({ username, password });
      return res.status(200).json({ message: "Login successful", data: user });
    } catch (error) {
      next(error);
    }
  }

  /**
   * SIGNUP
   */
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const newUser = await authService.signup({ username, password });
      return res
        .status(201)
        .json({ message: "Signup successful", data: newUser });
    } catch (error) {
      next(error);
    }
  }
}
