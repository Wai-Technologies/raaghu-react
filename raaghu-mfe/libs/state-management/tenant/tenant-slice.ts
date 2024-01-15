
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto } from '../../proxy/index';

import { Volo_Saas_Host_Dtos_SaasTenantCreateDto } from '../../proxy/index';

import { Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto } from '../../proxy/index';

import { Volo_Saas_Host_Dtos_SaasTenantUpdateDto } from '../../proxy/index';

import { Volo_Saas_TenantActivationState } from '../../proxy/index';

let TenantService: any;
(async () => {
  const module = await import("../../proxy");
  if ("TenantService" in module) {
    TenantService = module.TenantService;
  }
})();

export const getTenantsRequest = createAsyncThunk(
  'tenant/getTenantsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await TenantService.getTenants({
      id,
    });
    return response;
  }
);

export const putTenantsRequest = createAsyncThunk(
  'tenant/putTenantsRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
  }) => {
    const response = await TenantService.putTenants({
      id,
      requestBody,
    });
    return response;
  }
);

export const deleteTenantsRequest = createAsyncThunk(
  'tenant/deleteTenantsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await TenantService.deleteTenants({
      id,
    });
    return response;
  }
);

export const getTenants1Request = createAsyncThunk(
  'tenant/getTenants1Request',
  async ({
    filter,
    getEditionNames,
    editionId,
    expirationDateMin,
    expirationDateMax,
    activationState,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    filter?: string,
    getEditionNames?: boolean,
    editionId?: string,
    expirationDateMin?: string,
    expirationDateMax?: string,
    activationState?: Volo_Saas_TenantActivationState,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await TenantService.getTenants1({
      filter,
      getEditionNames,
      editionId,
      expirationDateMin,
      expirationDateMax,
      activationState,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const postTenantsRequest = createAsyncThunk(
  'tenant/postTenantsRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Saas_Host_Dtos_SaasTenantCreateDto,
  }) => {
    const response = await TenantService.postTenants({
      requestBody,
    });
    return response;
  }
);

export const getTenantsDatabasesRequest = createAsyncThunk(
  'tenant/getTenantsDatabasesRequest',
  async () => {
    const response = await TenantService.getTenantsDatabases();
    return response;
  }
);

export const getTenantsConnectionStringsRequest = createAsyncThunk(
  'tenant/getTenantsConnectionStringsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await TenantService.getTenantsConnectionStrings({
      id,
    });
    return response;
  }
);

export const putTenantsConnectionStringsRequest = createAsyncThunk(
  'tenant/putTenantsConnectionStringsRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto,
  }) => {
    const response = await TenantService.putTenantsConnectionStrings({
      id,
      requestBody,
    });
    return response;
  }
);

export const postTenantsApplyDatabaseMigrationsRequest = createAsyncThunk(
  'tenant/postTenantsApplyDatabaseMigrationsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await TenantService.postTenantsApplyDatabaseMigrations({
      id,
    });
    return response;
  }
);

export const getTenantsLookupEditionsRequest = createAsyncThunk(
  'tenant/getTenantsLookupEditionsRequest',
  async () => {
    const response = await TenantService.getTenantsLookupEditions();
    return response;
  }
);

export const getTenantsCheckConnectionStringRequest = createAsyncThunk(
  'tenant/getTenantsCheckConnectionStringRequest',
  async ({
    connectionString,
  }: {
    connectionString?: string,
  }) => {
    const response = await TenantService.getTenantsCheckConnectionString({
      connectionString,
    });
    return response;
  }
);

export const putTenantsSetPasswordRequest = createAsyncThunk(
  'tenant/putTenantsSetPasswordRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto,
  }) => {
    const response = await TenantService.putTenantsSetPassword({
      id,
      requestBody,
    });
    return response;
  }
);

export interface TenantState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getTenants: any;

  getTenants1: any;

  getTenantsDatabases: any;

  getTenantsConnectionStrings: any;

  getTenantsLookupEditions: any;

  getTenantsCheckConnectionString: any;
};


const initialState: TenantState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getTenants: {},

  getTenants1: {},

  getTenantsDatabases: {},

  getTenantsConnectionStrings: {},

  getTenantsLookupEditions: {},

  getTenantsCheckConnectionString: {},
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getTenantsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTenantsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTenants = action.payload
    });
    builder.addCase(getTenantsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putTenantsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putTenantsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putTenantsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteTenantsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTenantsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteTenantsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTenants1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTenants1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTenants1 = action.payload
    });
    builder.addCase(getTenants1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postTenantsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postTenantsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postTenantsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTenantsDatabasesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTenantsDatabasesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTenantsDatabases = action.payload
    });
    builder.addCase(getTenantsDatabasesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(getTenantsConnectionStringsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTenantsConnectionStringsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTenantsConnectionStrings = action.payload
    });
    builder.addCase(getTenantsConnectionStringsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putTenantsConnectionStringsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putTenantsConnectionStringsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putTenantsConnectionStringsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postTenantsApplyDatabaseMigrationsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postTenantsApplyDatabaseMigrationsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postTenantsApplyDatabaseMigrationsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTenantsLookupEditionsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTenantsLookupEditionsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTenantsLookupEditions = action.payload
    });
    builder.addCase(getTenantsLookupEditionsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTenantsCheckConnectionStringRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTenantsCheckConnectionStringRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTenantsCheckConnectionString = action.payload
    });
    builder.addCase(getTenantsCheckConnectionStringRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putTenantsSetPasswordRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putTenantsSetPasswordRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putTenantsSetPasswordRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default tenantSlice.reducer;
