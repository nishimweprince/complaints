import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "@/api/mutations/apiSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar: sidebarSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
