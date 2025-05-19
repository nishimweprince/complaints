import AppLayout from '@/containers/navigation/AppLayout';
import { DashboardCard } from '@/containers/dashboard/DashboardCard';
import { TicketStatus } from '@/constants/ticket.constants';
import { useNavigate } from 'react-router-dom';
import { capitalizeString, formatDate } from '@/helpers/strings.helper';
import { Heading } from '@/components/inputs/TextInputs';
import DashboardGraph from '@/containers/dashboard/DashboardGraph';
import {
  useCountTicketsByStatus,
  useGetTicketsTrends,
} from '@/usecases/dashboard/dashboard.hooks';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '@/states/hooks';

const CitizenDashboard = () => {
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
      createdById: user?.id,
      statuses: ticketsData?.join(','),
    });
  }, [countTicketsByStatus, ticketsData, user?.id]);

  // GET TICKETS TREND
  const { getTicketsTrend, getTicketsTrendIsFetching, ticketsTrendData } =
    useGetTicketsTrends();

  useEffect(() => {
    getTicketsTrend({
      createdById: user?.id,
      statuses: ticketsData?.join(','),
    });
  }, [getTicketsTrend, ticketsData, user?.id]);

  return (
    <AppLayout>
      <main className="p-6 space-y-6">
        <header>
          <Heading
            type="h1"
            className="text-2xl font-semibold text-gray-900 mb-6"
          >
            Overview
          </Heading>
        </header>

        <section>
          <header className="mb-4">
            <Heading type="h2" className="text-lg font-semibold text-gray-900">
              Ticket Status
            </Heading>
            <p className="text-sm text-gray-600">
              Current distribution of your tickets by status
            </p>
          </header>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
