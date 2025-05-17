import { UserService } from "../services/user.service";
import logger from "../helpers/logger.helper";
import { UserRoleService } from "../services/userRole.service";
import { RoleService } from "../services/role.service";

// LOAD SERVICES
const userService = new UserService();
const userRoleService = new UserRoleService();
const roleService = new RoleService();

export const seedUsers = async () => {
  // CREATE SUPER ADMIN USER
  const superAdminUser = await userService.createUserByEmail({
    email: "admin@complaints.rw",
    password: "Complaints@123",
  });

  // GET SUPER ADMIN ROLE
  const superAdminRole = await roleService.getRoleByName("SUPER_ADMIN");

  if (superAdminRole) {
    // ASSIGN SUPER ADMIN ROLE TO USER
    await userRoleService.createUserRole({
      userId: superAdminUser?.id,
      roleId: superAdminRole?.id,
    });
  }

  logger.info(`Users seeded successfully`);
};
