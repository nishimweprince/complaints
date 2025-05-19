import { Heading } from '@/components/inputs/TextInputs';
import AppLayout from '@/containers/navigation/AppLayout';
import { DashboardCard } from '@/containers/dashboard/DashboardCard';
import DashboardGraph from '@/containers/dashboard/DashboardGraph';
import { useNavigate } from 'react-router-dom';
import { capitalizeString } from '@/helpers/strings.helper';
import { TicketStatus } from '@/constants/ticket.constants';
import { useCountTicketsByStatus } from '@/usecases/dashboard/dashboard.hooks';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '@/states/hooks';

const InstitutionAdminDashboard = () => {
  /**
   * STATE VARIABLES
   */
  const { user } = useAppSelector((state) => state.auth);

  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

  // TICKET STATUS DATA
  const ticketsData = useMemo(
    () => [
      TicketStatus.OPEN,
      TicketStatus.ANSWERED,
      TicketStatus.REOPENED,
      TicketStatus.CLOSED,
    ],
    []
  );

  // Generate sample data for response time trends
  const generateResponseTimeData = () => {
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Generate random but realistic response times (in hours)
      const baseValue = 48; // Base response time in hours
      const randomVariation = Math.random() * 24 - 12; // Random variation between -12 and +12 hours
      const value = Math.max(12, Math.min(72, baseValue + randomVariation)); // Keep between 12-72 hours

      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: Number((value / 24).toFixed(1)), // Convert to days
      });
    }

    return data;
  };

  const responseTimeData = generateResponseTimeData();

  /**
   * USE CASES
   */

  // COUNT TICKETS BY STATUS
  const {
    countTicketsByStatus,
    countTicketsByStatusIsFetching,
    ticketsByStatusData,
  } = useCountTicketsByStatus();

  useEffect(() => {
    countTicketsByStatus({
      institutionId: user?.institutionId,
      statuses: ticketsData?.join(','),
    });
  }, [countTicketsByStatus, ticketsData, user?.institutionId]);

  console.log(ticketsByStatusData);

  return (
    <AppLayout>
      <main className="p-6 space-y-6">
        <header>
          <Heading
            type="h1"
            className="text-2xl font-semibold text-gray-900 mb-6"
          >
            Institution Overview
          </Heading>
        </header>

        <section>
          <header className="mb-4">
            <Heading type="h2" className="text-lg font-semibold text-gray-900">
              Ticket Status
            </Heading>
            <p className="text-sm text-gray-600">
              Current distribution of tickets by status
            </p>
          </header>
          <section className="grid grid-cols-4 gap-4">
            {ticketsData?.map((ticket) => (
              <DashboardCard
                key={ticket}
                label={ticket}
                isLoading={countTicketsByStatusIsFetching}
                value={
                  ticketsByStatusData?.find((t) => t.label === ticket)?.value ??
                  0
                }
                onActionClick={(e) => {
                  e.preventDefault();
                  navigate(`/tickets?status=${ticket}`);
                }}
                actionLabel={`View ${capitalizeString(ticket)}`}
              />
            ))}
          </section>
        </section>

        <section>
          <header className="mb-4">
            <Heading type="h2" className="text-lg font-semibold text-gray-900">
              Response Time Trend
            </Heading>
            <p className="text-sm text-gray-600">
              Average ticket resolution time over the last 7 days
            </p>
          </header>
          <figure className="h-[300px]">
            <DashboardGraph
              data={responseTimeData}
              dataKey="date"
              height="100%"
              fill="#FEF3C7"
              strokeWidth={2}
            />
          </figure>
        </section>
      </main>
    </AppLayout>
  );
};

export default InstitutionAdminDashboard;
