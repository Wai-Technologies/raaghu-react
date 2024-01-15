
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Abp_FeatureManagement_UpdateFeaturesDto } from '../../proxy/index';

let FeaturesService: any;
(async () => {
  const module = await import("../../proxy");
  if ("FeaturesService" in module) {
    FeaturesService = module.FeaturesService;
  }
})();




export const getFeaturesRequest = createAsyncThunk(
  'features/getFeaturesRequest',
  async ({
    providerName,
    providerKey,
  }: {
    providerName?: string,
    providerKey?: string,
  }) => {
    const response = await FeaturesService.getFeatures({
      providerName,
      providerKey,
    });
    return response;
  }
);

export const putFeaturesRequest = createAsyncThunk(
  'features/putFeaturesRequest',
  async ({
    providerName,
    providerKey,
    requestBody,
  }: {
    providerName?: string,
    providerKey?: string,
    requestBody?: Volo_Abp_FeatureManagement_UpdateFeaturesDto,
  }) => {
    const response = await FeaturesService.putFeatures({
      providerName,
      providerKey,
      requestBody,
    });
    return response;
  }
);

export const deleteFeaturesRequest = createAsyncThunk(
  'features/deleteFeaturesRequest',
  async ({
    providerName,
    providerKey,
  }: {
    providerName?: string,
    providerKey?: string,
  }) => {
    const response = await FeaturesService.deleteFeatures({
      providerName,
      providerKey,
    });
    return response;
  }
);

export interface FeaturesState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getFeatures: any;
  success: any;
};


const initialState: FeaturesState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getFeatures: {},
  success: false
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getFeaturesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFeaturesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getFeatures = action.payload;
    });
    builder.addCase(getFeaturesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putFeaturesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putFeaturesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putFeaturesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteFeaturesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteFeaturesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Reseted to default";
      state.success = true;

    });
    builder.addCase(deleteFeaturesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
      state.alert = true;
      state.alertMessage = "Something Went Wrong";
      state.success = false;
    });
  },
});

export default featuresSlice.reducer;
