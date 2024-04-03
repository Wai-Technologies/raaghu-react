
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 

import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../../proxy/index';

import { Volo_Payment_Admin_Plans_GatewayPlanCreateInput } from '../../proxy/index';

import { Volo_Payment_Admin_Plans_GatewayPlanUpdateInput } from '../../proxy/index';

import { Volo_Payment_Admin_Plans_PlanCreateInput } from '../../proxy/index';

import { Volo_Payment_Admin_Plans_PlanUpdateInput } from '../../proxy/index';

import { Volo_Payment_Plans_PlanDto } from '../../proxy/index';

let PlanAdminService:any;
// (async () => {
const module = await import("../../proxy");
if ("PlanAdminService" in module) {
  PlanAdminService = module.PlanAdminService;
}
// })();




export const postPlansRequest = createAsyncThunk(
      'planadmin/postPlansRequest',
      async ({
        requestBody,
    }:{
        requestBody?: Volo_Payment_Admin_Plans_PlanCreateInput,
    }) => {
          const response = await PlanAdminService.postPlans({
        requestBody,
    });
          return response;
      }
    );

export const deletePlansRequest = createAsyncThunk(
      'planadmin/deletePlansRequest',
      async ({
        id,
    }:{
        id?: string,
    }) => {
          const response = await PlanAdminService.deletePlans({
        id,
    });
          return response;
      }
    );

export const getPlansRequest = createAsyncThunk(
      'planadmin/getPlansRequest',
      async ({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await PlanAdminService.getPlans({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const postPlansExternalPlansRequest = createAsyncThunk(
      'planadmin/postPlansExternalPlansRequest',
      async ({
        planId,
        requestBody,
    }:{
        planId: string,
        requestBody?: Volo_Payment_Admin_Plans_GatewayPlanCreateInput,
    }) => {
          const response = await PlanAdminService.postPlansExternalPlans({
        planId,
        requestBody,
    });
          return response;
      }
    );

export const getPlansExternalPlansRequest = createAsyncThunk(
      'planadmin/getPlansExternalPlansRequest',
      async ({
        planId,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        planId: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await PlanAdminService.getPlansExternalPlans({
        planId,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const deletePlansExternalPlansRequest = createAsyncThunk(
      'planadmin/deletePlansExternalPlansRequest',
      async ({
        planId,
        gateway,
    }:{
        planId: string,
        gateway: string,
    }) => {
          const response = await PlanAdminService.deletePlansExternalPlans({
        planId,
        gateway,
    });
          return response;
      }
    );

export const putPlansExternalPlansRequest = createAsyncThunk(
      'planadmin/putPlansExternalPlansRequest',
      async ({
        planId,
        gateway,
        requestBody,
    }:{
        planId: string,
        gateway: string,
        requestBody?: Volo_Payment_Admin_Plans_GatewayPlanUpdateInput,
    }) => {
          const response = await PlanAdminService.putPlansExternalPlans({
        planId,
        gateway,
        requestBody,
    });
          return response;
      }
    );

export const getPlans1Request = createAsyncThunk(
      'planadmin/getPlans1Request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await PlanAdminService.getPlans1({
        id,
    });
          return response;
      }
    );

export const putPlansRequest = createAsyncThunk(
      'planadmin/putPlansRequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Payment_Admin_Plans_PlanUpdateInput,
    }) => {
          const response = await PlanAdminService.putPlans({
        id,
        requestBody,
    });
          return response;
      }
    );

export interface PlanAdminState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getPlans:any;

getPlansExternalPlans:any;

getPlans1:any;
};


const initialState: PlanAdminState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getPlans:{},

getPlansExternalPlans:{},

getPlans1:{},
};

const planadminSlice = createSlice({
  name: "planadmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  builder.addCase(postPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(postPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(postPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(deletePlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(deletePlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(deletePlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPlans = action.payload
      });
  builder.addCase(getPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(postPlansExternalPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(postPlansExternalPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(postPlansExternalPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getPlansExternalPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPlansExternalPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPlansExternalPlans = action.payload
      });
  builder.addCase(getPlansExternalPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(deletePlansExternalPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(deletePlansExternalPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(deletePlansExternalPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putPlansExternalPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putPlansExternalPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putPlansExternalPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getPlans1Request.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPlans1Request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPlans1 = action.payload
      });
  builder.addCase(getPlans1Request.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putPlansRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putPlansRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putPlansRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default planadminSlice.reducer;
