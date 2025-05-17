import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../root.api";

export const apiQuerySlice = createApi({
  reducerPath: "apiQuery",
  baseQuery,
  tagTypes: ["Institutions", "Categories"],
  endpoints: (builder) => ({
    /**
     * INSTITUTIONS
     */

    // FETCH INSTITUTIONS
    fetchInstitutions: builder.query({
      query: ({ page, limit, searchQuery }) => ({
        url: "/institutions",
        params: { page, limit, searchQuery },
      }),
      providesTags: ["Institutions"],
    }),

    /**
     * CATEGORIES
     */

    // FETCH CATEGORIES
    fetchCategories: builder.query({
      query: ({ searchQuery }) => ({
        url: "/categories",
        params: { searchQuery },
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useLazyFetchInstitutionsQuery, useLazyFetchCategoriesQuery } =
  apiQuerySlice;
