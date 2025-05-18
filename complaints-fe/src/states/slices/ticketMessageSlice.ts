import { createSlice } from '@reduxjs/toolkit'
import { TicketMessage } from '@/types/ticketMessage.type';

interface TicketMessageState {
  ticketMessagesList: TicketMessage[];
  selectedTicketMessage?: TicketMessage;
  ticketMessage?: TicketMessage;
}

const initialState: TicketMessageState = {
  ticketMessagesList: [],
  selectedTicketMessage: undefined,
  ticketMessage: undefined,
}

const ticketMessageSlice = createSlice({
  name: 'ticketMessage',
  initialState,
  reducers: {
    setTicketMessagesList: (state, action) => {
      state.ticketMessagesList = action.payload;
    },
    setSelectedTicketMessage: (state, action) => {
      state.selectedTicketMessage = action.payload;
    },
    setTicketMessage: (state, action) => {
      state.ticketMessage = action.payload;
    },
  },
});

export const {
  setTicketMessagesList,
  setSelectedTicketMessage,
  setTicketMessage,
} = ticketMessageSlice.actions;

export default ticketMessageSlice.reducer;