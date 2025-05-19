import {
  useLazyCountTicketsByStatusQuery,
  useLazyGetTicketsTrendsQuery,
} from '@/api/queies/apiQuerySlice';
import { useEffect, useState } from 'react';

/**
 * COUNT TICKETS BY STATUS
 * @returns {Object} - Object containing the count tickets by status function, its loading state, error state, success state, and the data
 */
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

/**
 * GET TICKETS TREND
 * @returns {Object} - Object containing the get tickets trend function, its loading state, error state, success state, and the data
 */
export const useGetTicketsTrends = () => {
  /**
   * STATE VARIABLES
   */
  const [ticketsTrendData, setTicketsTrendData] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  const [
    getTicketsTrend,
    {
      isFetching: getTicketsTrendIsFetching,
      isError: getTicketsTrendIsError,
      isSuccess: getTicketsTrendIsSuccess,
      data: getTicketsTrendData,
    },
  ] = useLazyGetTicketsTrendsQuery();

  useEffect(() => {
    if (getTicketsTrendIsSuccess) {
      setTicketsTrendData(getTicketsTrendData?.data);
    }
  }, [getTicketsTrendIsSuccess, getTicketsTrendData]);

  return {
    getTicketsTrend,
    getTicketsTrendIsFetching,
    getTicketsTrendIsError,
    getTicketsTrendIsSuccess,
    ticketsTrendData,
    setTicketsTrendData,
  };
};
