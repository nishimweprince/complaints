import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { PermissionNames } from "../constants/permission.constants";

interface AuthenticationRequest extends Request {
  user: User | JwtPayload | undefined;
  permissions: PermissionNames[] | undefined;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as AuthenticationRequest).user = (decoded as {
      user: User;
      permissions: PermissionNames[];
    })?.user as
      | User
      | JwtPayload
      | undefined;

    (req as AuthenticationRequest).permissions =
      (decoded as {
        user: User;
        permissions: PermissionNames[];
      })?.permissions as PermissionNames[] | undefined;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      (req as AuthenticationRequest).user = undefined;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as AuthenticationRequest).user = decoded as
      | User
      | JwtPayload
      | undefined;
    next();
  } catch (error) {
    (req as AuthenticationRequest).user = undefined;
    next();
  }
};
