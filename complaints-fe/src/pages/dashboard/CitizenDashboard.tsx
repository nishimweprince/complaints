import AppLayout from '@/containers/navigation/AppLayout';
import { DashboardCard } from '@/containers/dashboard/DashboardCard';
import { TicketStatus } from '@/constants/ticket.constants';
import { useNavigate } from 'react-router-dom';
import { capitalizeString } from '@/helpers/strings.helper';
import { Heading } from '@/components/inputs/TextInputs';
import DashboardGraph from '@/containers/dashboard/DashboardGraph';

const CitizenDashboard = () => {
  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

  // Mock data - replace with actual data from your API
  const ticketsData = [
    { label: TicketStatus.OPEN, value: 12 },
    { label: TicketStatus.PENDING, value: 8 },
    { label: TicketStatus.RESOLVED, value: 45 },
    { label: TicketStatus.CLOSED, value: 23 },
  ];

  // Generate sample data for the last 7 days
  const generateSampleGraphData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate random but somewhat realistic ticket numbers
      const baseValue = 15; // Base number of tickets
      const randomVariation = Math.floor(Math.random() * 10) - 5; // Random variation between -5 and +5
      const value = Math.max(0, baseValue + randomVariation); // Ensure non-negative
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }), // e.g., "Mon", "Tue"
        value: value
      });
    }
    
    return data;
  };

  const graphData = generateSampleGraphData();

  return (
    <AppLayout>
      <main className="p-6 space-y-6">
        <header>
          <Heading type="h1" className="text-2xl font-semibold text-gray-900 mb-6">
            Overview
          </Heading>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ticketsData &&
            ticketsData.map((ticket) => (
              <DashboardCard
                key={ticket.label}
                label={ticket.label}
                value={ticket.value}
                onActionClick={(e) => {
                  e.preventDefault();
                  navigate(`/tickets?status=${ticket.label}`);
                }}
                actionLabel={`View ${capitalizeString(ticket.label)}`}
              />
            ))}
        </section>

        <section className="bg-white rounded-xl p-6 shadow-md">
          <header className="mb-4">
            <Heading type="h2" className="text-lg font-semibold text-gray-900">
              Ticket Trends
            </Heading>
            <p className="text-sm text-gray-600">
              Number of tickets created over the last 7 days
            </p>
          </header>
          <figure className="h-[300px]">
            <DashboardGraph
              data={graphData}
              dataKey="date"
              height="100%"
              fill="#E0F2FE"
              strokeWidth={2}
            />
          </figure>
        </section>
      </main>
    </AppLayout>
  );
};

export default CitizenDashboard;
