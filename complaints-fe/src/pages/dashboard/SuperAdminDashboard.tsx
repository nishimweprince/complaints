import { Heading } from "@/components/inputs/TextInputs";
import AppLayout from "@/containers/navigation/AppLayout";
import { DashboardCard } from '@/containers/dashboard/DashboardCard';
import DashboardGraph from '@/containers/dashboard/DashboardGraph';
import { useNavigate } from 'react-router-dom';
import { capitalizeString } from '@/helpers/strings.helper';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API data
  const systemStats = [
    { label: 'Total Institutions', value: 24 },
    { label: 'Active Users', value: 1567 },
    { label: 'Total Tickets', value: 4589 },
    { label: 'System Health', value: '98.5%' },
  ];

  // Generate sample data for system metrics
  const generateSystemMetricsData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate random but realistic system metrics
      const baseValue = 95; // Base system health percentage
      const randomVariation = (Math.random() * 6) - 3; // Random variation between -3 and +3
      const value = Math.min(100, Math.max(90, baseValue + randomVariation)); // Keep between 90-100
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: Number(value.toFixed(1))
      });
    }
    
    return data;
  };

  const systemMetricsData = generateSystemMetricsData();

  return (
    <AppLayout>
      <main className="p-6 space-y-6">
        <header>
          <Heading type="h1" className="text-2xl font-semibold text-gray-900 mb-6">
            System Overview
          </Heading>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat) => (
            <DashboardCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              onActionClick={(e) => {
                e.preventDefault();
                navigate(`/admin/${stat.label.toLowerCase().replace(/\s+/g, '-')}`);
              }}
              actionLabel={`View ${capitalizeString(stat.label)}`}
            />
          ))}
        </section>

        <section className="bg-white rounded-xl p-6 shadow-md">
          <header className="mb-4">
            <Heading type="h2" className="text-lg font-semibold text-gray-900">
              System Health Trend
            </Heading>
            <p className="text-sm text-gray-600">
              System performance metrics over the last 7 days
            </p>
          </header>
          <figure className="h-[300px]">
            <DashboardGraph
              data={systemMetricsData}
              dataKey="date"
              height="100%"
              fill="#DCFCE7" // Light green fill for health metrics
              strokeWidth={2}
            />
          </figure>
        </section>
      </main>
    </AppLayout>
  );
};

export default SuperAdminDashboard;
