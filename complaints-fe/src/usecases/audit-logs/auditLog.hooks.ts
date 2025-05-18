import { useLazyFetchEntityHistoryQuery } from '@/api/queies/apiQuerySlice';
import { usePagination } from '@/hooks/common/pagination.hooks';
import { useAppDispatch } from '@/states/hooks';
import { setAuditLogsList } from '@/states/slices/auditLogSlice';
import { useEffect } from 'react';

export const useFetchEntityHistory = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  // PAGINATION
  const {
    page,
    size,
    setPage,
    setSize,
    totalCount,
    setTotalCount,
    totalPages,
    setTotalPages,
  } = usePagination();

  const [
    fetchEntityHistory,
    {
      isFetching: entityHistoryIsFetching,
      isError: entityHistoryIsError,
      data: entityHistoryData,
    },
  ] = useLazyFetchEntityHistoryQuery();

  useEffect(() => {
    if (entityHistoryData) {
      dispatch(setAuditLogsList(entityHistoryData?.data?.rows));
    }
  }, [entityHistoryData, dispatch]);

  return {
    fetchEntityHistory,
    entityHistoryIsFetching,
    entityHistoryIsError,
    page,
    size,
    setPage,
    setSize,
    totalCount,
    setTotalCount,
    totalPages,
    setTotalPages,
  };
};
