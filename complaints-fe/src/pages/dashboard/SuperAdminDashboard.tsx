import { Heading } from "@/components/inputs/TextInputs";
import AppLayout from "@/containers/navigation/AppLayout";

const SuperAdminDashboard = () => {
  return (
    <AppLayout>
      <main className="w-full h-full flex items-center justify-center">
        <Heading type="h1">Super Admin Dashboard</Heading>
      </main>
    </AppLayout>
  );
};

export default SuperAdminDashboard;
