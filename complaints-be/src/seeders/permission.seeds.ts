import { PermissionNames } from "../constants/permission.constants";
import { PermissionsService } from "../services/permission.service";
import logger from "../helpers/logger.helper";

// LOAD SERVICES
const permissionsService = new PermissionsService();

export const seedPermissions = async () => {
  // GET ALL PERMISSION NAMES FROM THE ENUM
  const permissionNames = Object.values(PermissionNames);

  // CREATE PERMISSIONS IF THEY DON'T EXIST
  for (const name of permissionNames) {
    await permissionsService.createPermission({
      name,
      description: `Permission to ${name.toLowerCase().replace(/_/g, " ")}`,
    });
  }

  logger.info(`Permissions seeded successfully`);
};
