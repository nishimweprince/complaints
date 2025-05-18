import { useCreateTicketMessageMutation } from '@/api/mutations/apiSlice';
import { useLazyFetchTicketMessagesQuery } from '@/api/queies/apiQuerySlice';
import { usePagination } from '@/hooks/common/pagination.hooks';
import { useAppDispatch } from '@/states/hooks';
import { setAddToTicketMessagesList, setTicketMessagesList } from '@/states/slices/ticketMessageSlice';
import { useEffect } from 'react';

/**
 * FETCH TICKET MESSAGES
 */
export const useFetchTicketMessages = () => {
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

  // FETCH TICKET MESSAGES
  const [
    fetchTicketMessages,
    {
      data: ticketMessagesData,
      isFetching: ticketMessagesIsFetching,
      isError: ticketMessagesIsError,
    },
  ] = useLazyFetchTicketMessagesQuery();

  useEffect(() => {
    if (ticketMessagesData) {
      dispatch(setTicketMessagesList(ticketMessagesData?.data?.rows));
      setTotalCount(ticketMessagesData?.data?.totalCount);
      setTotalPages(ticketMessagesData?.data?.totalPages);
    }
  }, [ticketMessagesData, dispatch, setTotalCount, setTotalPages]);

  return {
    fetchTicketMessages,
    ticketMessagesIsFetching,
    ticketMessagesIsError,
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
 * CREATE TICKET MESSAGE
 */
export const useCreateTicketMessage = () => {

  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  const [
    createTicketMessage,
    {
      isLoading: createTicketMessageIsLoading,
      isError: createTicketMessageIsError,
      isSuccess: createTicketMessageIsSuccess,
      reset: createTicketMessageReset,
      data: ticketMessageData
    },
  ] = useCreateTicketMessageMutation();

  useEffect(() => {
    if (createTicketMessageIsSuccess) {
      dispatch(setAddToTicketMessagesList(ticketMessageData?.data));
    }
  }, [createTicketMessageIsSuccess, dispatch, ticketMessageData?.data]);

  return {
    createTicketMessage,
    createTicketMessageIsLoading,
    createTicketMessageIsError,
    createTicketMessageIsSuccess,
    createTicketMessageReset,
  };
};
