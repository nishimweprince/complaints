import { useLazyFetchCategoriesQuery } from "@/api/queies/apiQuerySlice";
import { useAppDispatch } from "@/states/hooks";
import { setCategoriesList } from "@/states/slices/categorySlice";
import { useEffect } from "react";

export const useFetchCategories = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  const [
    fetchCategories,
    {
      data: categoriesData,
      isFetching: categoriesIsFetching,
      isSuccess: categoriesIsSuccess,
    },
  ] = useLazyFetchCategoriesQuery();

  useEffect(() => {
    if (categoriesIsSuccess) {
      dispatch(setCategoriesList(categoriesData?.data || []));
    }
  }, [categoriesIsSuccess, categoriesData, dispatch]);

  return {
    fetchCategories,
    categoriesData,
    categoriesIsFetching,
    categoriesIsSuccess,
  };
};
