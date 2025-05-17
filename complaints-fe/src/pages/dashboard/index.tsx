import { useAppSelector } from "@/states/hooks";
import SuperAdminDashboard from "./SuperAdminDashboard";
import { PermissionNames } from "@/constants/permission.constants";
import InstitutionAdminDashboard from "./InstitutionAdminDashboard";
import AppLayout from "@/containers/navigation/AppLayout";
import { Heading } from "@/components/inputs/TextInputs";

const Dashboard = () => {
  /**
   * STATE VARIABLES
   */
  const { permissions, user } = useAppSelector((state) => state.auth);

  console.log(user);

  /**
   * SWITCH DASHBOARD
   */

  // INSTITUTION ADMIN DASHBOARD
  if (user?.institution) {
    return <InstitutionAdminDashboard />;
  }

  // SUPER ADMIN DASHBOARD
  if (permissions?.length === Object.values(PermissionNames).length) {
    return <SuperAdminDashboard />;
  }

  return (
    <AppLayout>
      <main className="w-full h-full flex items-center justify-center">
        <Heading type="h1">Index Dashboard</Heading>
      </main>
    </AppLayout>
  );
};

export default Dashboard;
