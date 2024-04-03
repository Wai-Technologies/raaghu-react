
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 

import { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../../proxy/index';

import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../../proxy/index';

import { Volo_CmsKit_Admin_Polls_CreatePollDto } from '../../proxy/index';

import { Volo_CmsKit_Admin_Polls_GetResultDto } from '../../proxy/index';

import { Volo_CmsKit_Admin_Polls_PollWithDetailsDto } from '../../proxy/index';

import { Volo_CmsKit_Admin_Polls_UpdatePollDto } from '../../proxy/index';

let PollAdminService:any;
(async () => {
const module = await import("../../proxy");
if ("PollAdminService" in module) {
  PollAdminService = module.PollAdminService;
}
})();



export const getPollRequest = createAsyncThunk(
      'polladmin/getPollRequest',
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
          const response = await PollAdminService.getPoll({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const postPollRequest = createAsyncThunk(
      'polladmin/postPollRequest',
      async ({
        requestBody,
    }:{
        requestBody?: Volo_CmsKit_Admin_Polls_CreatePollDto,
    }) => {
          const response = await PollAdminService.postPoll({
        requestBody,
    });
          return response;
      }
    );

export const getPoll1Request = createAsyncThunk(
      'polladmin/getPoll1Request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await PollAdminService.getPoll1({
        id,
    });
          return response;
      }
    );

export const putPollRequest = createAsyncThunk(
      'polladmin/putPollRequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_CmsKit_Admin_Polls_UpdatePollDto,
    }) => {
          const response = await PollAdminService.putPoll({
        id,
        requestBody,
    });
          return response;
      }
    );

export const deletePollRequest = createAsyncThunk(
      'polladmin/deletePollRequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await PollAdminService.deletePoll({
        id,
    });
          return response;
      }
    );

export const getPollWidgetsRequest = createAsyncThunk(
    'polladmin/getPollWidgetsRequest',
    async () => {
        const response = await PollAdminService.getPollWidgets();
        return response;
    }
  );

export const getPollResultRequest = createAsyncThunk(
      'polladmin/getPollResultRequest',
      async ({
        id,
    }:{
        id?: string,
    }) => {
          const response = await PollAdminService.getPollResult({
        id,
    });
          return response;
      }
    );

export interface PollAdminState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getPoll:any;

getPoll1:any;

getPollWidgets:any;

getPollResult:any;
};


const initialState: PollAdminState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getPoll:{},

getPoll1:{},

getPollWidgets:{},

getPollResult:{},
};

const polladminSlice = createSlice({
  name: "polladmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  builder.addCase(getPollRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPollRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPoll = action.payload
      });
  builder.addCase(getPollRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(postPollRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(postPollRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(postPollRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getPoll1Request.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPoll1Request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPoll1 = action.payload
      });
  builder.addCase(getPoll1Request.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putPollRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putPollRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putPollRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(deletePollRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(deletePollRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(deletePollRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getPollWidgetsRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPollWidgetsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPollWidgets = action.payload
      });
  builder.addCase(getPollWidgetsRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getPollResultRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getPollResultRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getPollResult = action.payload
      });
  builder.addCase(getPollResultRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default polladminSlice.reducer;
