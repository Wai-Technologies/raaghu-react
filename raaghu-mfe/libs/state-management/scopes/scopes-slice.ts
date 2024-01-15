
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput } from '../../proxy/index';

import { Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput } from '../../proxy/index';

let ScopesService: any;
const modulePromise = import("../../proxy");
modulePromise.then((module) => {
  if ("ScopesService" in module) {
    ScopesService = module.ScopesService;
  }
});
export interface ScopesState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getScopes: any;

  getScopes1: any;

  getScopesAll: any;
};


const initialState: ScopesState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getScopes: {},

  getScopes1: {},

  getScopesAll: {},
};




export const getScopesRequest = createAsyncThunk(
  'scopes/getScopesRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await ScopesService.getScopes({
      id,
    });
    console.log("scopes data-", response);
    return response;
  }
);

export const putScopesRequest = createAsyncThunk(
  'scopes/putScopesRequest',
  async ({
    id,
    requestBody,
  }: {
    id: any,
    requestBody?: Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
  }) => {
    const response = await ScopesService.putScopes({
      id,
      requestBody,
    });
    return response;
  }
);

export const getScopes1Request = createAsyncThunk(
  'scopes/getScopes1Request',
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
    await modulePromise;
    const response = await ScopesService.getScopes1({
      filter,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const postScopesRequest = createAsyncThunk(
  'scopes/postScopesRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
  }) => {
    const response = await ScopesService.postScopes({
      requestBody,
    });
    return response;
  }
);

export const deleteScopesRequest = createAsyncThunk(
  'scopes/deleteScopesRequest',
  async ({
    id,
  }: {
    id?: any,
  }) => {
    const response = await ScopesService.deleteScopes({
      id,
    });
    return response;
  }
);

export const getScopesAllRequest = createAsyncThunk(
  'scopes/getScopesAllRequest',
  async () => {
    const response = await ScopesService.getScopesAll();
    return response;
  }
);



const scopesSlice = createSlice({
  name: "scopes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getScopesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getScopesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getScopes = action.payload
    });
    builder.addCase(getScopesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putScopesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putScopesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putScopesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getScopes1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getScopes1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getScopes1 = action.payload
    });
    builder.addCase(getScopes1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postScopesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postScopesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postScopesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteScopesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteScopesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteScopesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getScopesAllRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getScopesAllRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getScopesAll = action.payload
    });
    builder.addCase(getScopesAllRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default scopesSlice.reducer;
