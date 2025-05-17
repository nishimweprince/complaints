import { useAppSelector } from "@/states/hooks";
import SuperAdminDashboard from "./SuperAdminDashboard";
import { PermissionNames } from "@/constants/permission.constants";

const Dashboard = () => {
  /**
   * STATE VARIABLES
   */
  const { permissions } = useAppSelector((state) => state.auth);

  /**
   * SWITCH DASHBOARD
   */

  if (permissions?.length === Object.values(PermissionNames).length) {
    return <SuperAdminDashboard />;
  }

  return <div>index</div>;
};

export default Dashboard;
