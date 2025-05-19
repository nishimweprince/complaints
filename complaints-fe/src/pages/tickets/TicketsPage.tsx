import Button from '@/components/inputs/Button';
import { Heading } from '@/components/inputs/TextInputs';
import Table from '@/components/table/Table';
import AppLayout from '@/containers/navigation/AppLayout';
import { useTicketColumns } from '@/hooks/tickets/columns.ticket';
import { useAppSelector } from '@/states/hooks';
import { useFetchTickets } from '@/usecases/tickets/ticket.hooks';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const TicketsPage = () => {
  /**
   * STATE VARIABLES
   */
  const { ticketsList } = useAppSelector((state) => state.ticket);
  const { permissions, user } = useAppSelector((state) => state.auth);

  /**
   * NAVIGATION
   */
  const [searchParams] = useSearchParams();

  /**
   * USE CASES
   */
  const {
    fetchTickets,
    page,
    size,
    totalCount,
    totalPages,
    setPage,
    setSize,
    ticketsIsFetching,
  } = useFetchTickets();

  useEffect(() => {
    let status: string | null = null;
    let createdById: string | null = null;
    let assignedInstitutionId: string | null = null;

    if (searchParams.get('status') && searchParams.get('status') !== 'null') {
      status = searchParams.get('status') as string;
    }

    if (permissions?.length <= 0 && !user?.institution?.id && user?.id) {
      createdById = user?.id;
    }

    if (user?.institution) {
      assignedInstitutionId = user?.institution?.id;
    }

    fetchTickets({ page, size, status, createdById, assignedInstitutionId });
  }, [
    fetchTickets,
    page,
    size,
    searchParams,
    permissions?.length,
    user?.institution,
    user?.id,
  ]);

  // TICKET COLUMNS
  const { ticketColumns } = useTicketColumns();

  return (
    <AppLayout>
      <main className="w-full flex flex-col gap-6">
        <nav className="w-full flex flex-col gap-4">
          <ul className="w-full flex items-center gap-3 justify-between">
            <Heading>Tickets</Heading>
            {permissions?.length <= 0 && !user?.institution && (
              <Button to={`/tickets/create`} icon={faPlus}>
                Create ticket
              </Button>
            )}
          </ul>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <Table
            data={ticketsList}
            columns={ticketColumns}
            noDataMessage={
              <menu className="w-full flex flex-col gap-4 py-4">
                <Heading type="h2">No tickets available</Heading>
                <p className="text-[12px]">
                  There are no tickets available for this status.
                </p>
                {searchParams.get('status') &&
                  searchParams.get('status') !== 'null' && (
                    <Link
                      to={`/tickets`}
                      className="text-[12px] bg-primary text-white px-4 py-2 rounded-md w-fit self-center"
                    >
                      Clear filters
                    </Link>
                  )}
              </menu>
            }
            isLoading={ticketsIsFetching}
            page={page}
            size={size}
            totalCount={totalCount}
            totalPages={totalPages}
            setPage={setPage}
            setSize={setSize}
          />
        </section>
      </main>
    </AppLayout>
  );
};

export default TicketsPage;
