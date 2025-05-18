import { UUID } from "crypto";
import { Request } from "express";
import { PermissionNames } from "../constants/permission.constants";

export interface AuthenticatedRequest extends Request {
  user: {
    id: UUID;
    email: string;
    role: string;
  };
  permissions: PermissionNames[];
}
