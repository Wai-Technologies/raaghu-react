
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let AuditLogsService: any;
(async () => {
  const module = await import("../../proxy");
  if ("AuditLogsService" in module) {
    AuditLogsService = module.AuditLogsService;
  }
})();

export const getAuditLogsRequest = createAsyncThunk(
  'auditlogs/getAuditLogsRequest',
  async ({
    startTime,
    endTime,
    url,
    userName,
    applicationName,
    clientIpAddress,
    correlationId,
    httpMethod,
    httpStatusCode,
    maxExecutionDuration,
    minExecutionDuration,
    hasException,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    startTime?: string,
    endTime?: string,
    url?: string,
    userName?: string,
    applicationName?: string,
    clientIpAddress?: string,
    correlationId?: string,
    httpMethod?: string,
    httpStatusCode?: string,
    maxExecutionDuration?: number,
    minExecutionDuration?: number,
    hasException?: boolean,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await AuditLogsService.getAuditLogs({
      startTime,
      endTime,
      url,
      userName,
      applicationName,
      clientIpAddress,
      correlationId,
      httpMethod,
      httpStatusCode,
      maxExecutionDuration,
      minExecutionDuration,
      hasException,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const getAuditLogs1Request = createAsyncThunk(
  'auditlogs/getAuditLogs1Request',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await AuditLogsService.getAuditLogs1({
      id,
    });
    return response;
  }
);

export const getAuditLogsStatisticsErrorRateRequest = createAsyncThunk(
  'auditlogs/getAuditLogsStatisticsErrorRateRequest',
  async ({
    startDate,
    endDate,
  }: {
    startDate?: string,
    endDate?: string,
  }) => {
    const response = await AuditLogsService.getAuditLogsStatisticsErrorRate({
      startDate,
      endDate,
    });
    return response;
  }
);

export const getAuditLogsStatisticsAverageExecutionDurationPerDayRequest = createAsyncThunk(
  'auditlogs/getAuditLogsStatisticsAverageExecutionDurationPerDayRequest',
  async ({
    startDate,
    endDate,
  }: {
    startDate?: string,
    endDate?: string,
  }) => {
    const response = await AuditLogsService.getAuditLogsStatisticsAverageExecutionDurationPerDay({
      startDate,
      endDate,
    });
    return response;
  }
);

export const getAuditLogsEntityChangesRequest = createAsyncThunk(
  'auditlogs/getAuditLogsEntityChangesRequest',
  async ({
    auditLogId,
    entityChangeType,
    entityId,
    entityTypeFullName,
    startDate,
    endDate,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    auditLogId?: string,
    entityChangeType?: string,
    entityId?: string,
    entityTypeFullName?: string,
    startDate?: string,
    endDate?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await AuditLogsService.getAuditLogsEntityChanges({
      auditLogId,
      entityChangeType,
      entityId,
      entityTypeFullName,
      startDate,
      endDate,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const getAuditLogsEntityChangesWithUsernameRequest = createAsyncThunk(
  'auditlogs/getAuditLogsEntityChangesWithUsernameRequest',
  async ({
    entityId,
    entityTypeFullName,
  }: {
    entityId?: string,
    entityTypeFullName?: string,
  }) => {
    const response = await AuditLogsService.getAuditLogsEntityChangesWithUsername({
      entityId,
      entityTypeFullName,
    });
    return response;
  }
);

export const getAuditLogsEntityChangeWithUsernameRequest = createAsyncThunk(
  'auditlogs/getAuditLogsEntityChangeWithUsernameRequest',
  async ({
    entityChangeId,
  }: {
    entityChangeId: string,
  }) => {
    const response = await AuditLogsService.getAuditLogsEntityChangeWithUsername({
      entityChangeId,
    });
    return response;
  }
);

export const getAuditLogsEntityChanges1Request = createAsyncThunk(
  'auditlogs/getAuditLogsEntityChanges1Request',
  async ({
    entityChangeId,
  }: {
    entityChangeId: string,
  }) => {
    const response = await AuditLogsService.getAuditLogsEntityChanges1({
      entityChangeId,
    });
    return response;
  }
);

export interface AuditLogsState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getAuditLogs: any;

  getAuditLogs1: any;

  getAuditLogsStatisticsErrorRate: any;

  getAuditLogsStatisticsAverageExecutionDurationPerDay: any;

  getAuditLogsEntityChanges: any;

  getAuditLogsEntityChangesWithUsername: any;

  getAuditLogsEntityChangeWithUsername: any;

  getAuditLogsEntityChanges1: any;
};


const initialState: AuditLogsState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getAuditLogs: {},

  getAuditLogs1: {},

  getAuditLogsStatisticsErrorRate: {},

  getAuditLogsStatisticsAverageExecutionDurationPerDay: {},

  getAuditLogsEntityChanges: {},

  getAuditLogsEntityChangesWithUsername: {},

  getAuditLogsEntityChangeWithUsername: {},

  getAuditLogsEntityChanges1: {},
};

const auditlogsSlice = createSlice({
  name: "auditlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getAuditLogsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogs = action.payload
    });
    builder.addCase(getAuditLogsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogs1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogs1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogs1 = action.payload
    });
    builder.addCase(getAuditLogs1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogsStatisticsErrorRateRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsStatisticsErrorRateRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogsStatisticsErrorRate = action.payload
    });
    builder.addCase(getAuditLogsStatisticsErrorRateRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogsStatisticsAverageExecutionDurationPerDayRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsStatisticsAverageExecutionDurationPerDayRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogsStatisticsAverageExecutionDurationPerDay = action.payload
    });
    builder.addCase(getAuditLogsStatisticsAverageExecutionDurationPerDayRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogsEntityChangesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsEntityChangesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogsEntityChanges = action.payload
    });
    builder.addCase(getAuditLogsEntityChangesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogsEntityChangesWithUsernameRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsEntityChangesWithUsernameRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogsEntityChangesWithUsername = action.payload
    });
    builder.addCase(getAuditLogsEntityChangesWithUsernameRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogsEntityChangeWithUsernameRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsEntityChangeWithUsernameRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogsEntityChangeWithUsername = action.payload
    });
    builder.addCase(getAuditLogsEntityChangeWithUsernameRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getAuditLogsEntityChanges1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditLogsEntityChanges1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getAuditLogsEntityChanges1 = action.payload
    });
    builder.addCase(getAuditLogsEntityChanges1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default auditlogsSlice.reducer;
