
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Abp_PermissionManagement_UpdatePermissionsDto } from '../../proxy/index';

let PermissionsService: any;
(async () => {
  const module = await import("../../proxy");
  if ("PermissionsService" in module) {
    PermissionsService = module.PermissionsService;
  }
})()




export const getPermissionsRequest = createAsyncThunk(
  'permissions/getPermissionsRequest',
  async ({
    providerName,
    providerKey,
  }: {
    providerName?: string,
    providerKey?: string,
  }) => {
    const response = await PermissionsService.getPermissions({
      providerName,
      providerKey,
    });
    return response;
  }
);

export const putPermissionsRequest = createAsyncThunk(
  'permissions/putPermissionsRequest',
  async ({
    providerName,
    providerKey,
    requestBody,
  }: {
    providerName?: string,
    providerKey?: string,
    requestBody?: Volo_Abp_PermissionManagement_UpdatePermissionsDto,
  }) => {
    const response = await PermissionsService.putPermissions({
      providerName,
      providerKey,
      requestBody,
    });
    return response;
  }
);

export interface PermissionsState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getPermissions: any;
  isChangePermission: boolean;
};


const initialState: PermissionsState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getPermissions: {},
  isChangePermission: false
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getPermissionsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPermissionsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getPermissions = action.payload
    });
    builder.addCase(getPermissionsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putPermissionsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putPermissionsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.isChangePermission = !state.isChangePermission;

    });
    builder.addCase(putPermissionsRequest.rejected, (state, action) => {
      state.loading = false;
      state.getPermissions = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default permissionsSlice.reducer;
