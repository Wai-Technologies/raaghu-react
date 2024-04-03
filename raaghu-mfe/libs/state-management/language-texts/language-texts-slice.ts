import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 

import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../../proxy/index';

import { Volo_Abp_LanguageManagement_Dto_LanguageTextDto } from '../../proxy/index';

let LanguageTextsService:any;
(async () => {
const module = await import("../../proxy");
if ("LanguageTextsService" in module) {
  LanguageTextsService = module.LanguageTextsService;
}
})();

export const getLanguageTextsRequest = createAsyncThunk(
      'languagetexts/getLanguageTextsRequest',
      async ({
        filter,
        resourceName,
        baseCultureName,
        targetCultureName,
        getOnlyEmptyValues,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        filter?: string,
        resourceName?: string,
        baseCultureName?: string,
        targetCultureName?: string,
        getOnlyEmptyValues?: boolean,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await LanguageTextsService.getLanguageTexts({
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

export const getLanguageTexts1Request = createAsyncThunk(
      'languagetexts/getLanguageTexts1Request',
      async ({
        resourceName,
        cultureName,
        name,
        baseCultureName,
    }:{
        resourceName: string,
        cultureName: string,
        name: string,
        baseCultureName?: string,
    }) => {
          const response = await LanguageTextsService.getLanguageTexts1({
        resourceName,
        cultureName,
        name,
        baseCultureName,
    });
          return response;
      }
    );

export const putLanguageTextsRequest = createAsyncThunk(
      'languagetexts/putLanguageTextsRequest',
      async ({
        resourceName,
        cultureName,
        name,
        value,
    }:{
        resourceName: string,
        cultureName: string,
        name: string,
        value?: string,
    }) => {
          const response = await LanguageTextsService.putLanguageTexts({
        resourceName,
        cultureName,
        name,
        value,
    });
          return response;
      }
    );

export const putLanguageTextsRestoreRequest = createAsyncThunk(
      'languagetexts/putLanguageTextsRestoreRequest',
      async ({
        resourceName,
        cultureName,
        name,
    }:{
        resourceName: string,
        cultureName: string,
        name: string,
    }) => {
          const response = await LanguageTextsService.putLanguageTextsRestore({
        resourceName,
        cultureName,
        name,
    });
          return response;
      }
    );

export interface LanguageTextsState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getLanguageTexts:any;

getLanguageTexts1:any;
};


const initialState: LanguageTextsState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getLanguageTexts:{},

getLanguageTexts1:{},
};

const languagetextsSlice = createSlice({
  name: "languagetexts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  builder.addCase(getLanguageTextsRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getLanguageTextsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getLanguageTexts = action.payload
      });
  builder.addCase(getLanguageTextsRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getLanguageTexts1Request.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getLanguageTexts1Request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getLanguageTexts1 = action.payload
      });
  builder.addCase(getLanguageTexts1Request.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putLanguageTextsRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putLanguageTextsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putLanguageTextsRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putLanguageTextsRestoreRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putLanguageTextsRestoreRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putLanguageTextsRestoreRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default languagetextsSlice.reducer;
