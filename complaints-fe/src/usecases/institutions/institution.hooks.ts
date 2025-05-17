import { useLazyFetchInstitutionsQuery } from "@/api/queies/apiQuerySlice";
import { useCreateInstitutionMutation } from "@/api/mutations/apiSlice";
import { usePagination } from "@/hooks/common/pagination.hooks";
import { useAppDispatch } from "@/states/hooks";
import { setInstitutionsList } from "@/states/slices/institutionSlice";
import { useEffect } from "react";

export const useFetchInstitutions = () => {
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
    fetchInstitutions,
    {
      data: institutionsData,
      isFetching: institutionsIsFetching,
      isError: institutionsIsError,
      isSuccess: institutionsIsSuccess,
    },
  ] = useLazyFetchInstitutionsQuery();

  useEffect(() => {
    if (institutionsIsSuccess) {
      dispatch(setInstitutionsList(institutionsData?.data?.rows));
      setTotalCount(institutionsData?.data?.totalCount);
      setTotalPages(institutionsData?.data?.totalPages);
    }
  }, [
    dispatch,
    institutionsData,
    institutionsIsSuccess,
    setTotalCount,
    setTotalPages,
  ]);

  return {
    fetchInstitutions,
    institutionsIsFetching,
    institutionsIsError,
    institutionsIsSuccess,
    page,
    size,
    totalCount,
    totalPages,
    setPage,
    setSize,
    setTotalPages,
  };
};

/**
 * CREATE INSTITUTION
 */
export const useCreateInstitution = () => {
  const [
    createInstitution,
    {
      isLoading: createInstitutionIsLoading,
      isSuccess: createInstitutionIsSuccess,
    },
  ] = useCreateInstitutionMutation();

  return {
    createInstitution,
    createInstitutionIsLoading,
    createInstitutionIsSuccess,
  };
};
