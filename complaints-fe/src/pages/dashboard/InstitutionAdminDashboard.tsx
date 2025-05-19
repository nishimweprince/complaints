import { Heading } from '@/components/inputs/TextInputs';
import AppLayout from '@/containers/navigation/AppLayout';
import { DashboardCard } from '@/containers/dashboard/DashboardCard';
import DashboardGraph from '@/containers/dashboard/DashboardGraph';
import { useNavigate } from 'react-router-dom';
import { capitalizeString, formatDate } from '@/helpers/strings.helper';
import { TicketStatus } from '@/constants/ticket.constants';
import {
  useCountTicketsByStatus,
  useGetTicketsTrends,
} from '@/usecases/dashboard/dashboard.hooks';
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

  // GET TICKETS TREND
  const { getTicketsTrend, getTicketsTrendIsFetching, ticketsTrendData } =
    useGetTicketsTrends();

  // GET TICKETS TREND
  useEffect(() => {
    getTicketsTrend({
      institutionId: user?.institutionId,
      statuses: ticketsData?.join(','),
    });
  }, [getTicketsTrend, ticketsData, user?.institutionId]);

  console.log(ticketsTrendData);

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
              Ticket Volume Trend
            </Heading>
            <p className="text-sm text-gray-600">
              Number of tickets created over the last 7 days
            </p>
          </header>
          <figure className="h-[350px]">
            <DashboardGraph
              isLoading={getTicketsTrendIsFetching}
              data={ticketsTrendData?.map((t) => ({
                date: formatDate(t.label, 'DD/MM HH:mm'),
                value: t.value,
              }))}
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
