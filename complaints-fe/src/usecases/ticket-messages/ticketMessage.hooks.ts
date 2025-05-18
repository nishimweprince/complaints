import { useLazyFetchTicketMessagesQuery } from '@/api/queies/apiQuerySlice';
import { usePagination } from '@/hooks/common/pagination.hooks';
import { useAppDispatch } from '@/states/hooks';
import { setTicketMessagesList } from '@/states/slices/ticketMessageSlice';
import { useEffect } from 'react';

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
