import { useLazyCountTicketsByStatusQuery } from '@/api/queies/apiQuerySlice';
import { useEffect, useState } from 'react';

export const useCountTicketsByStatus = () => {
  /**
   * STATE VARIABLES
   */
  const [ticketsByStatusData, setTicketsByStatusData] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  const [
    countTicketsByStatus,
    {
      isFetching: countTicketsByStatusIsFetching,
      isError: countTicketsByStatusIsError,
      isSuccess: countTicketsByStatusIsSuccess,
      data: countTicketsByStatusData,
    },
  ] = useLazyCountTicketsByStatusQuery();

  useEffect(() => {
    if (countTicketsByStatusIsSuccess) {
      console.log(countTicketsByStatusData?.data);
      setTicketsByStatusData(countTicketsByStatusData?.data);
    }
  }, [
    countTicketsByStatusIsSuccess,
    countTicketsByStatusData,
    countTicketsByStatus,
  ]);

  return {
    countTicketsByStatus,
    countTicketsByStatusIsFetching,
    countTicketsByStatusIsError,
    countTicketsByStatusIsSuccess,
    ticketsByStatusData,
    setTicketsByStatusData,
  };
};
