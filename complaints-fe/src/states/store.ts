import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "@/api/mutations/apiSlice";
import sidebarSlice from "./slices/sidebarSlice";
import { apiQuerySlice } from "@/api/queies/apiQuerySlice";
import institutionSlice from "./slices/institutionSlice";
import categorySlice from "./slices/categorySlice";
import ticketSlice from "./slices/ticketSlice";
import ticketMessageSlice from "./slices/ticketMessageSlice";
import auditLogSlice from "./slices/auditLogSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar: sidebarSlice,
    institution: institutionSlice,
    category: categorySlice,
    ticket: ticketSlice,
    ticketMessage: ticketMessageSlice,
    auditLog: auditLogSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiQuerySlice.reducerPath]: apiQuerySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      apiQuerySlice.middleware
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
