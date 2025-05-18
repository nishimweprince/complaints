import { createSlice } from '@reduxjs/toolkit';
import { AuditLog } from '@/types/auditLog.type';

interface AuditLogState {
  auditLogsList: AuditLog[];
  auditLog?: AuditLog;
  selectedAuditLog?: AuditLog;
}

const initialState: AuditLogState = {
  auditLogsList: [],
  auditLog: undefined,
  selectedAuditLog: undefined,
};

const auditLogSlice = createSlice({
  name: 'auditLog',
  initialState,
  reducers: {
    setAuditLogsList: (state, action) => {
      state.auditLogsList = action.payload;
    },
    setAuditLog: (state, action) => {
      state.auditLog = action.payload;
    },
    setSelectedAuditLog: (state, action) => {
      state.selectedAuditLog = action.payload;
    },
  },
});

export const { setAuditLogsList, setAuditLog, setSelectedAuditLog } =
  auditLogSlice.actions;

export default auditLogSlice.reducer;
