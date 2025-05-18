import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../root.api';

export const apiQuerySlice = createApi({
  reducerPath: 'apiQuery',
  baseQuery,
  tagTypes: ['Institutions', 'Categories', 'Tickets', 'TicketMessages'],
  endpoints: (builder) => ({
    /**
     * INSTITUTIONS
     */

    // FETCH INSTITUTIONS
    fetchInstitutions: builder.query({
      query: ({ page, limit, searchQuery }) => ({
        url: '/institutions',
        params: { page, limit, searchQuery },
      }),
      providesTags: ['Institutions'],
    }),

    /**
     * CATEGORIES
     */

    // FETCH CATEGORIES
    fetchCategories: builder.query({
      query: ({ searchQuery }) => ({
        url: '/categories',
        params: { searchQuery },
      }),
      providesTags: ['Categories'],
    }),

    /**
     * TICKETS
     */

    // FETCH TICKETS
    fetchTickets: builder.query({
      query: ({ page, size, searchQuery }) => ({
        url: '/tickets',
        params: { page, size, searchQuery },
      }),
      providesTags: ['Tickets'],
    }),

    // FETCH TICKET
    getTicketById: builder.query({
      query: (id) => ({
        url: `/tickets/${id}`,
      }),
      providesTags: ['Tickets'],
    }),

    /**
     * FETCH TICKET MESSAGES
     */
    fetchTicketMessages: builder.query({
      query: ({ ticketId, page, size }) => ({
        url: `/ticket-messages`,
        params: { ticketId, page, size },
      }),
      providesTags: ['TicketMessages'],
    }),
  }),
});

export const {
  useLazyFetchInstitutionsQuery,
  useLazyFetchCategoriesQuery,
  useLazyFetchTicketsQuery,
  useLazyGetTicketByIdQuery,
  useLazyFetchTicketMessagesQuery,
} = apiQuerySlice;
