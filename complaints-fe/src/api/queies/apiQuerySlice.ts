import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../root.api';

export const apiQuerySlice = createApi({
  reducerPath: 'apiQuery',
  baseQuery,
  tagTypes: [
    'Institutions',
    'Categories',
    'Tickets',
    'TicketMessages',
    'Dashboard',
  ],
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
      query: ({
        page,
        size,
        searchQuery,
        status,
        createdById,
        assignedInstutionId,
      }) => ({
        url: '/tickets',
        params: {
          page,
          size,
          searchQuery,
          status,
          createdById,
          assignedInstutionId,
        },
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

    /**
     * AUDIT LOGS
     */

    // FETCH AUDIT LOGS
    fetchEntityHistory: builder.query({
      query: ({ entityId, entityType, page, size }) => ({
        url: `/audit-logs/entity/${entityId}`,
        params: { entityType, page, size },
      }),
    }),

    /**
     * DASHBOARD
     */

    // COUNT TICKETS

    // COUNT TICKETS BY STATUS
    countTicketsByStatus: builder.query({
      query: ({ institutionId, createdById, statuses }) => ({
        url: '/dashboard/tickets/count-by-status',
        params: { institutionId, createdById, statuses },
      }),
      providesTags: ['Dashboard'],
    }),

    // GET TICKETS TREND
    getTicketsTrends: builder.query({
      query: ({ institutionId, createdById, statuses }) => ({
        url: '/dashboard/tickets/trends',
        params: { institutionId, createdById, statuses },
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useLazyFetchInstitutionsQuery,
  useLazyFetchCategoriesQuery,
  useLazyFetchTicketsQuery,
  useLazyGetTicketByIdQuery,
  useLazyFetchTicketMessagesQuery,
  useLazyFetchEntityHistoryQuery,
  useLazyCountTicketsByStatusQuery,
  useLazyGetTicketsTrendsQuery,
} = apiQuerySlice;
