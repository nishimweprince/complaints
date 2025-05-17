import { seedPermissions } from "./permission.seeds";
import { seedRoles } from "./role.seeds";
import { seedUsers } from "./user.seeds";

export const seed = async () => {
  await seedPermissions();
  await seedRoles();
  await seedUsers();
};
