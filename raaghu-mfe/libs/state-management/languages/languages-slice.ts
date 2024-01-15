
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Abp_LanguageManagement_Dto_CreateLanguageDto } from '../../proxy/index';

import { Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto } from '../../proxy/index';

let LanguagesService: any;
(async () => {
  const module = await import("../../proxy");
  if ("LanguagesService" in module) {
    LanguagesService = module.LanguagesService;
  }
})();




export const getLanguagesAllRequest = createAsyncThunk(
  'languages/getLanguagesAllRequest',
  async () => {
    const response = await LanguagesService.getLanguagesAll();
    return response;
  }
);

export const getLanguagesRequest = createAsyncThunk(
  'languages/getLanguagesRequest',
  async ({
    filter,
    resourceName,
    baseCultureName,
    targetCultureName,
    getOnlyEmptyValues,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    filter?: string,
    resourceName?: string,
    baseCultureName?: string,
    targetCultureName?: string,
    getOnlyEmptyValues?: boolean,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await LanguagesService.getLanguages({
      filter,
      resourceName,
      baseCultureName,
      targetCultureName,
      getOnlyEmptyValues,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const postLanguagesRequest = createAsyncThunk(
  'languages/postLanguagesRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
  }) => {
    const response = await LanguagesService.postLanguages({
      requestBody,
    });
    return response;
  }
);

export const getLanguages1Request = createAsyncThunk(
  'languages/getLanguages1Request',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await LanguagesService.getLanguages1({
      id,
    });
    return response;
  }
);

export const putLanguagesRequest = createAsyncThunk(
  'languages/putLanguagesRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
  }) => {
    const response = await LanguagesService.putLanguages({
      id,
      requestBody,
    });
    return response;
  }
);

export const deleteLanguagesRequest = createAsyncThunk(
  'languages/deleteLanguagesRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await LanguagesService.deleteLanguages({
      id,
    });
    return response;
  }
);

export const putLanguagesSetAsDefaultRequest = createAsyncThunk(
  'languages/putLanguagesSetAsDefaultRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await LanguagesService.putLanguagesSetAsDefault({
      id,
    });
    return response;
  }
);

export const getLanguagesResourcesRequest = createAsyncThunk(
  'languages/getLanguagesResourcesRequest',
  async () => {
    const response = await LanguagesService.getLanguagesResources();
    return response;
  }
);

export const getLanguagesCultureListRequest = createAsyncThunk(
  'languages/getLanguagesCultureListRequest',
  async () => {
    const response = await LanguagesService.getLanguagesCultureList();
    return response;
  }
);

export const getLanguagesFlagListRequest = createAsyncThunk(
  'languages/getLanguagesFlagListRequest',
  async () => {
    const response = await LanguagesService.getLanguagesFlagList();
    return response;
  }
);

export interface LanguagesState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getLanguagesAll: any;

  getLanguages: any;

  getLanguages1: any;

  getLanguagesResources: any;

  getLanguagesCultureList: any;

  getLanguagesFlagList: any;
};


const initialState: LanguagesState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getLanguagesAll: {},

  getLanguages: {},

  getLanguages1: {},

  getLanguagesResources: {},

  getLanguagesCultureList: {},

  getLanguagesFlagList: {},
};

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getLanguagesAllRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLanguagesAllRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLanguagesAll = action.payload
    });
    builder.addCase(getLanguagesAllRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getLanguagesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLanguagesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLanguages = action.payload
    });
    builder.addCase(getLanguagesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLanguagesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLanguagesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLanguagesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getLanguages1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLanguages1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLanguages1 = action.payload
    });
    builder.addCase(getLanguages1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putLanguagesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putLanguagesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putLanguagesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteLanguagesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteLanguagesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteLanguagesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putLanguagesSetAsDefaultRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putLanguagesSetAsDefaultRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putLanguagesSetAsDefaultRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getLanguagesResourcesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLanguagesResourcesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLanguagesResources = action.payload
    });
    builder.addCase(getLanguagesResourcesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getLanguagesCultureListRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLanguagesCultureListRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLanguagesCultureList = action.payload
    });
    builder.addCase(getLanguagesCultureListRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getLanguagesFlagListRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLanguagesFlagListRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLanguagesFlagList = action.payload
    });
    builder.addCase(getLanguagesFlagListRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default languagesSlice.reducer;
