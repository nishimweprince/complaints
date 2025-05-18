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

    /**
     * INSTITUTIONS
     */

    // CREATE INSTITUTION
    createInstitution: builder.mutation({
      query: (data) => ({
        url: "/institutions",
        method: "POST",
        body: data,
      }),
    }),

    /**
     * TICKETS
     */

    // CREATE TICKET
    createTicket: builder.mutation({
      query: (data) => ({
        url: "/tickets",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateInstitutionMutation,
  useCreateTicketMutation,
} = apiSlice;
