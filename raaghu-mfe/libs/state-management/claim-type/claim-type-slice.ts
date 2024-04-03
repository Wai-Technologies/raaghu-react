
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
//import { ClaimTypeService } from '../../proxy/index';
import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../../proxy/index';

import { Volo_Abp_Identity_ClaimTypeDto } from '../../proxy/index';

import { Volo_Abp_Identity_CreateClaimTypeDto } from '../../proxy/index';

import { Volo_Abp_Identity_UpdateClaimTypeDto } from '../../proxy/index';

let ClaimTypeService:any;
(async () => {
const module = await import("../../proxy");
if ("ClaimTypeService" in module) {
  ClaimTypeService = module.ClaimTypeService;
}
})();




export const getClaimTypesRequest = createAsyncThunk(
      'claimtype/getClaimTypesRequest',
      async ({
        filter,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }:{
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }) => {
          const response = await ClaimTypeService.getClaimTypes({
        filter,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    });
          return response;
      }
    );

export const postClaimTypesRequest = createAsyncThunk(
      'claimtype/postClaimTypesRequest',
      async ({
        requestBody,
    }:{
        requestBody?: Volo_Abp_Identity_CreateClaimTypeDto,
    }) => {
          const response = await ClaimTypeService.postClaimTypes({
        requestBody,
    });
          return response;
      }
    );

export const getClaimTypes1Request = createAsyncThunk(
      'claimtype/getClaimTypes1Request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await ClaimTypeService.getClaimTypes1({
        id,
    });
          return response;
      }
    );

export const putClaimTypesRequest = createAsyncThunk(
      'claimtype/putClaimTypesRequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Abp_Identity_UpdateClaimTypeDto,
    }) => {
          const response = await ClaimTypeService.putClaimTypes({
        id,
        requestBody,
    });
          return response;
      }
    );

export const deleteClaimTypesRequest = createAsyncThunk(
      'claimtype/deleteClaimTypesRequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await ClaimTypeService.deleteClaimTypes({
        id,
    });
          return response;
      }
    );

export interface ClaimTypeState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getClaimTypes:any;

getClaimTypes1:any;
};


const initialState: ClaimTypeState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getClaimTypes:{},

getClaimTypes1:{},
};

const claimtypeSlice = createSlice({
  name: "claimtype",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  builder.addCase(getClaimTypesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getClaimTypesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getClaimTypes = action.payload
      });
  builder.addCase(getClaimTypesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(postClaimTypesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(postClaimTypesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(postClaimTypesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getClaimTypes1Request.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getClaimTypes1Request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getClaimTypes1 = action.payload
      });
  builder.addCase(getClaimTypes1Request.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putClaimTypesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putClaimTypesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putClaimTypesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(deleteClaimTypesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(deleteClaimTypesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(deleteClaimTypesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default claimtypeSlice.reducer;
