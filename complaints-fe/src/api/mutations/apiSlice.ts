import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../root.api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    /**
     * AUTH
     */

    // LOGIN
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
