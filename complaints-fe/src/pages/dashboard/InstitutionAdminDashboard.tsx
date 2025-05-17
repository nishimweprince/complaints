import { Heading } from "@/components/inputs/TextInputs";
import AppLayout from "@/containers/navigation/AppLayout";

const InstitutionAdminDashboard = () => {
  return (
    <AppLayout>
      <main className="w-full h-full flex items-center justify-center">
        <Heading type="h1">Institution Admin Dashboard</Heading>
      </main>
    </AppLayout>
  );
};

export default InstitutionAdminDashboard;
