import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput } from '../../proxy/index';

import { Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput } from '../../proxy/index';

let ApplicationsService: any;
(async () => {
  const module = await import("../../proxy");
  if ("ApplicationsService" in module) {
    ApplicationsService = module.ApplicationsService;
  }
})();

export interface ApplicationsState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getApplications: any;
  success: boolean;
  getApplications1: any;
};


const initialState: ApplicationsState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getApplications: {},
  success: false,
  getApplications1: {},
};


export const getApplicationsRequest = createAsyncThunk(
  'applications/getApplicationsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await ApplicationsService.getApplications({
      id,
    });
    return response;
  }
);

export const putApplicationsRequest = createAsyncThunk(
  'applications/putApplicationsRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput,
  }) => {
    const response = await ApplicationsService.putApplications({
      id,
      requestBody,
    });
    return response;
  }
);

export const getApplications1Request = createAsyncThunk(
  'applications/getApplications1Request',
  async ({
    filter,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    filter?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await ApplicationsService.getApplications1({
      filter,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const postApplicationsRequest = createAsyncThunk(
  'applications/postApplicationsRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
  }) => {
    const response = await ApplicationsService.postApplications({
      requestBody,
    });
    return response;
  }
);

export const deleteApplicationsRequest = createAsyncThunk(
  'applications/deleteApplicationsRequest',
  async ({
    id,
  }: {
    id?: string,
  }) => {
    const response = await ApplicationsService.deleteApplications({
      id,
    });
    return response;
  }
);



const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getApplicationsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getApplicationsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getApplications = action.payload
    });
    builder.addCase(getApplicationsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putApplicationsRequest.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(putApplicationsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.alert = true;
      state.alertMessage = "Application edited successfully";
      state.success = true;

    });
    builder.addCase(putApplicationsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something Went Wrong";
      state.alert = true;
      state.alertMessage = "Something Went Wrong";
      state.success = false;
    });


    builder.addCase(getApplications1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getApplications1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getApplications1 = action.payload
    });
    builder.addCase(getApplications1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postApplicationsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postApplicationsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Application added successfully";
      state.success = true;

    });
    builder.addCase(postApplicationsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something Went Wrong";
      state.alert = true;
      state.alertMessage = "Something Went Wrong";
      state.success = false;
    });


    builder.addCase(deleteApplicationsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteApplicationsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Application deleted successfully";
      state.success = true;

    });
    builder.addCase(deleteApplicationsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something Went Wrong";
      state.alert = true;
      state.alertMessage = "Something Went Wrong";
      state.success = false;
    });
  },
});

export default applicationsSlice.reducer;
