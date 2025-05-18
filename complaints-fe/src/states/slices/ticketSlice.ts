import { createSlice } from '@reduxjs/toolkit'
import { Ticket } from '@/types/ticket.type';

interface TicketState {
  ticketsList: Ticket[];
  ticket?: Ticket;
  selectedTicket?: Ticket;
}

const initialState: TicketState = {
    ticketsList: [],
    selectedTicket: undefined,
    ticket: undefined,
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicketsList: (state, action) => {
      state.ticketsList = action.payload;
    },
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    setTicket: (state, action) => {
      state.ticket = action.payload;
    },
  },
});

export const {
  setTicketsList,
  setSelectedTicket,
  setTicket,
} = ticketSlice.actions;

export default ticketSlice.reducer;