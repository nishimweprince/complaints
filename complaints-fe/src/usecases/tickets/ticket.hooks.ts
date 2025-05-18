import { useCreateTicketMutation } from "@/api/mutations/apiSlice";
import {
  useLazyFetchTicketsQuery,
  useLazyGetTicketByIdQuery,
} from "@/api/queies/apiQuerySlice";
import { usePagination } from "@/hooks/common/pagination.hooks";
import { useAppDispatch } from "@/states/hooks";
import { setTicket, setTicketsList } from "@/states/slices/ticketSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 *
 * @returns FETCH TICKETS
 */
export const useFetchTickets = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  // PAGINATION
  const {
    page,
    size,
    totalCount,
    totalPages,
    setPage,
    setSize,
    setTotalCount,
    setTotalPages,
  } = usePagination();

  const [
    fetchTickets,
    {
      data: ticketsData,
      isFetching: ticketsIsFetching,
      isSuccess: ticketsIsSuccess,
    },
  ] = useLazyFetchTicketsQuery();

  useEffect(() => {
    if (ticketsIsSuccess) {
      dispatch(setTicketsList(ticketsData?.data?.rows));
      setTotalCount(ticketsData?.data?.totalCount);
      setTotalPages(ticketsData?.data?.totalPages);
    }
  }, [dispatch, setTotalCount, setTotalPages, ticketsData, ticketsIsSuccess]);

  return {
    fetchTickets,
    ticketsData,
    ticketsIsFetching,
    ticketsIsSuccess,
    page,
    size,
    totalCount,
    totalPages,
    setPage,
    setSize,
    setTotalCount,
    setTotalPages,
  };
};

/**
 * GET TICKET BY ID
 */
export const useGetTicketById = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  const [
    getTicketById,
    {
      data: ticketData,
      isFetching: ticketIsFetching,
      isSuccess: ticketIsSuccess,
    },
  ] = useLazyGetTicketByIdQuery();

  useEffect(() => {
    if (ticketIsSuccess) {
      dispatch(setTicket(ticketData?.data));
    }
  }, [dispatch, ticketData, ticketIsSuccess]);

  return {
    getTicketById,
    ticketData,
    ticketIsFetching,
    ticketIsSuccess,
  };
};

/**
 * CREATE TICKET
 */
export const useCreateTicket = () => {
  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

  const [
    createTicket,
    {
      data: createTicketData,
      isLoading: createTicketIsLoading,
      isSuccess: createTicketIsSuccess,
    },
  ] = useCreateTicketMutation();

  useEffect(() => {
    if (createTicketIsSuccess) {
      toast.success(
        `Ticket with ID ${createTicketData?.data?.referenceId} created successfully`
      );
      navigate(`/tickets/${createTicketData?.data?.id}`);
    }
  }, [createTicketData, createTicketIsSuccess, navigate]);

  return {
    createTicket,
    createTicketIsLoading,
    createTicketIsSuccess,
  };
};
