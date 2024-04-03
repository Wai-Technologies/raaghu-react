
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
//import { RoleService } from '../../proxy/index';
import { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../../proxy/index';

import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../../proxy/index';

import { Volo_Abp_Identity_ClaimTypeDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityRoleClaimDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityRoleCreateDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityRoleDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityRoleUpdateDto } from '../../proxy/index';

let RoleService:any;
(async () => {
const module = await import("../../proxy");
if ("RoleService" in module) {
  RoleService = module.RoleService;
}
})();



export const getRolesRequest = createAsyncThunk(
      'role/getRolesRequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await RoleService.getRoles({
        id,
    });
          return response;
      }
    );

export const putRolesRequest = createAsyncThunk(
      'role/putRolesRequest',
      async ({
        id,
        requestBody,
    }:{
        id: any,
        requestBody?: Volo_Abp_Identity_IdentityRoleUpdateDto,
    }) => {
          const response = await RoleService.putRoles({
        id,
        requestBody,
    });
          return response;
      }
    );

export const deleteRolesRequest = createAsyncThunk(
      'role/deleteRolesRequest',
      async ({
        id,
    }:{
        id: any,
    }) => {
          const response = await RoleService.deleteRoles({
        id,
    });
          return response;
      }
    );

export const postRolesRequest = createAsyncThunk(
      'role/postRolesRequest',
      async ({
        requestBody,
    }:{
        requestBody?: Volo_Abp_Identity_IdentityRoleCreateDto,
    }) => {
          const response = await RoleService.postRoles({
        requestBody,
    });
          return response;
      }
    );

export const getRoles1Request = createAsyncThunk(
      'role/getRoles1Request',
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
          const response = await RoleService.getRoles1({
        filter,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    });
          return response;
      }
    );

export const getRolesAllRequest = createAsyncThunk(
    'role/getRolesAllRequest',
    async () => {
        const response = await RoleService.getRolesAll();
        return response;
    }
  );

export const putRolesClaimsRequest = createAsyncThunk(
      'role/putRolesClaimsRequest',
      async ({
        id,
        requestBody,
    }:{
        id: any,
        requestBody?: Array<Volo_Abp_Identity_IdentityRoleClaimDto>,
    }) => {
          const response = await RoleService.putRolesClaims({
        id,
        requestBody,
    });
          return response;
      }
    );

export const getRolesClaimsRequest = createAsyncThunk(
      'role/getRolesClaimsRequest',
      async ({
        id,
    }:{
        id: any,
    }) => {
          const response = await RoleService.getRolesClaims({
        id,
    });
          return response;
      }
    );

export const getRolesAllClaimTypesRequest = createAsyncThunk(
    'role/getRolesAllClaimTypesRequest',
    async () => {
        const response = await RoleService.getRolesAllClaimTypes();
        return response;
    }
  );

export interface RoleState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getRoles:any;

getRoles1:any;

getRolesAll:any;

getRolesClaims:any;

getRolesAllClaimTypes:any;
};


const initialState: RoleState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getRoles:{},

getRoles1:{},

getRolesAll:{},

getRolesClaims:{},

getRolesAllClaimTypes:{},
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  builder.addCase(getRolesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getRolesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getRoles = action.payload
      });
  builder.addCase(getRolesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putRolesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putRolesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putRolesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(deleteRolesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(deleteRolesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(deleteRolesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(postRolesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(postRolesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(postRolesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getRoles1Request.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getRoles1Request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getRoles1 = action.payload
      });
  builder.addCase(getRoles1Request.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getRolesAllRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getRolesAllRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getRolesAll = action.payload
      });
  builder.addCase(getRolesAllRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(putRolesClaimsRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(putRolesClaimsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        
      });
  builder.addCase(putRolesClaimsRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getRolesClaimsRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getRolesClaimsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getRolesClaims = action.payload
      });
  builder.addCase(getRolesClaimsRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });


  builder.addCase(getRolesAllClaimTypesRequest.pending, (state) => {
        state.loading = true;
      });
      
  builder.addCase(getRolesAllClaimTypesRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getRolesAllClaimTypes = action.payload
      });
  builder.addCase(getRolesAllClaimTypesRequest.rejected,(state, action)=> {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default roleSlice.reducer;
