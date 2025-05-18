import Button from "@/components/inputs/Button";
import { Heading } from "@/components/inputs/TextInputs";
import Table from "@/components/table/Table";
import AppLayout from "@/containers/navigation/AppLayout";
import { useTicketColumns } from "@/hooks/tickets/columns.ticket";
import { useAppSelector } from "@/states/hooks";
import { useFetchTickets } from "@/usecases/tickets/ticket.hooks";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const TicketsPage = () => {

    /**
     * STATE VARIABLES
     */
    const { ticketsList } = useAppSelector((state) => state.ticket)
    const { permissions } = useAppSelector((state) => state.auth);

    /**
     * USE CASES
     */
    const { fetchTickets, page, size, totalCount, totalPages, setPage, setSize, ticketsIsFetching } =
      useFetchTickets();

    useEffect(() => {
        fetchTickets({ page, size });
    }, [fetchTickets, page, size]);

    // TICKET COLUMNS
    const { ticketColumns } = useTicketColumns();

  return (
    <AppLayout>
      <main className="w-full flex flex-col gap-6">
        <nav className="w-full flex flex-col gap-4">
          <ul className="w-full flex items-center gap-3 justify-between">
            <Heading>Tickets</Heading>
            {permissions?.length <= 0 && (
              <Button to={`/tickets/create`} icon={faPlus}>Create ticket</Button>
            )}
          </ul>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <Table
            data={ticketsList}
            columns={ticketColumns}
            noDataMessage="No tickets available"
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
