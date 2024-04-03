import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as module from "../../proxy/index";

let SecurityLogService: any = module.SecurityLogService;
export interface SecurityLogsState {
  loading: boolean;
  securityLogs: any;
  error: string;
}

export const securityLogsState: SecurityLogsState = {
  loading: false,
  securityLogs: null,
  error: "",
};

export const fetchSecurityLogs = createAsyncThunk(
  "securityLogs/fetchSecurityLogs",
  (data: any) => {
    return SecurityLogService?.getSecurityLogs(data).then((result: any) => {
      return result;
    });
  }
);

const securityLogs = createSlice({
  name: "securityLogs",
  initialState: securityLogsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSecurityLogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSecurityLogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.securityLogs = action.payload;
      }
    );
    builder.addCase(fetchSecurityLogs.rejected, (state, action) => {
      state.loading = false;
      state.securityLogs = { items: [], totalCount: null };
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default securityLogs.reducer;
