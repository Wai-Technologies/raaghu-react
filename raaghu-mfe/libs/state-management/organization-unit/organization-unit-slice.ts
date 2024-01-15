
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Abp_Identity_OrganizationUnitCreateDto } from '../../proxy/index';

import { Volo_Abp_Identity_OrganizationUnitMoveInput } from '../../proxy/index';

import { Volo_Abp_Identity_OrganizationUnitRoleInput } from '../../proxy/index';

import { Volo_Abp_Identity_OrganizationUnitUpdateDto } from '../../proxy/index';

import { Volo_Abp_Identity_OrganizationUnitUserInput } from '../../proxy/index';


let OrganizationUnitService: any;
(async () => {
  const module = await import("../../proxy");
  if ("OrganizationUnitService" in module) {
    OrganizationUnitService = module.OrganizationUnitService;
  }
})();




export const putOrganizationUnitsRolesRequest = createAsyncThunk(
  'organizationunit/putOrganizationUnitsRolesRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_OrganizationUnitRoleInput,
  }) => {
    const response = await OrganizationUnitService.putOrganizationUnitsRoles({
      id,
      requestBody,
    });
    return response;
  }
);

export const getOrganizationUnitsRolesRequest = createAsyncThunk(
  'organizationunit/getOrganizationUnitsRolesRequest',
  async ({
    id,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    id: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await OrganizationUnitService.getOrganizationUnitsRoles({
      id,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const putOrganizationUnitsMembersRequest = createAsyncThunk(
  'organizationunit/putOrganizationUnitsMembersRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_OrganizationUnitUserInput,
  }) => {
    const response = await OrganizationUnitService.putOrganizationUnitsMembers({
      id,
      requestBody,
    });
    return response;
  }
);

export const getOrganizationUnitsMembersRequest = createAsyncThunk(
  'organizationunit/getOrganizationUnitsMembersRequest',
  async ({
    id,
    filter,
    roleId,
    organizationUnitId,
    userName,
    phoneNumber,
    emailAddress,
    name,
    surname,
    isLockedOut,
    notActive,
    emailConfirmed,
    isExternal,
    maxCreationTime,
    minCreationTime,
    maxModifitionTime,
    minModifitionTime,
    sorting,
    skipCount,
    maxResultCount,
    extraProperties,
  }: {
    id: string,
    filter?: string,
    roleId?: string,
    organizationUnitId?: string,
    userName?: string,
    phoneNumber?: string,
    emailAddress?: string,
    name?: string,
    surname?: string,
    isLockedOut?: boolean,
    notActive?: boolean,
    emailConfirmed?: boolean,
    isExternal?: boolean,
    maxCreationTime?: string,
    minCreationTime?: string,
    maxModifitionTime?: string,
    minModifitionTime?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
    extraProperties?: Record<string, any>,
  }) => {
    const response = await OrganizationUnitService.getOrganizationUnitsMembers({
      id,
      filter,
      roleId,
      organizationUnitId,
      userName,
      phoneNumber,
      emailAddress,
      name,
      surname,
      isLockedOut,
      notActive,
      emailConfirmed,
      isExternal,
      maxCreationTime,
      minCreationTime,
      maxModifitionTime,
      minModifitionTime,
      sorting,
      skipCount,
      maxResultCount,
      extraProperties,
    });
    return response;
  }
);

export const postOrganizationUnitsRequest = createAsyncThunk(
  'organizationunit/postOrganizationUnitsRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Identity_OrganizationUnitCreateDto,
  }) => {
    const response = await OrganizationUnitService.postOrganizationUnits({
      requestBody,
    });
    return response;
  }
);

export const deleteOrganizationUnitsRequest = createAsyncThunk(
  'organizationunit/deleteOrganizationUnitsRequest',
  async ({
    id,
  }: {
    id?: string,
  }) => {
    const response = await OrganizationUnitService.deleteOrganizationUnits({
      id,
    });
    return response;
  }
);

export const getOrganizationUnitsRequest = createAsyncThunk(
  'organizationunit/getOrganizationUnitsRequest',
  async ({
    filter,
    sorting,
    skipCount,
    maxResultCount,
    extraProperties,
  }: {
    filter?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
    extraProperties?: Record<string, any>,
  }) => {
    const response = await OrganizationUnitService.getOrganizationUnits({
      filter,
      sorting,
      skipCount,
      maxResultCount,
      extraProperties,
    });
    return response;
  }
);

export const getOrganizationUnits1Request = createAsyncThunk(
  'organizationunit/getOrganizationUnits1Request',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await OrganizationUnitService.getOrganizationUnits1({
      id,
    });
    return response;
  }
);

export const putOrganizationUnitsRequest = createAsyncThunk(
  'organizationunit/putOrganizationUnitsRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_OrganizationUnitUpdateDto,
  }) => {
    const response = await OrganizationUnitService.putOrganizationUnits({
      id,
      requestBody,
    });
    return response;
  }
);

export const getOrganizationUnitsAllRequest = createAsyncThunk(
  'organizationunit/getOrganizationUnitsAllRequest',
  async () => {
    const response = await OrganizationUnitService.getOrganizationUnitsAll();
    return response;
  }
);

export const putOrganizationUnitsMoveRequest = createAsyncThunk(
  'organizationunit/putOrganizationUnitsMoveRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_OrganizationUnitMoveInput,
  }) => {
    const response = await OrganizationUnitService.putOrganizationUnitsMove({
      id,
      requestBody,
    });
    return response;
  }
);

export const getOrganizationUnitsAvailableUsersRequest = createAsyncThunk(
  'organizationunit/getOrganizationUnitsAvailableUsersRequest',
  async ({
    filter,
    id,
    sorting,
    skipCount,
    maxResultCount,
    extraProperties,
  }: {
    filter?: string,
    id?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
    extraProperties?: Record<string, any>,
  }) => {
    const response = await OrganizationUnitService.getOrganizationUnitsAvailableUsers({
      filter,
      id,
      sorting,
      skipCount,
      maxResultCount,
      extraProperties,
    });
    return response;
  }
);

export const getOrganizationUnitsAvailableRolesRequest = createAsyncThunk(
  'organizationunit/getOrganizationUnitsAvailableRolesRequest',
  async ({
    filter,
    id,
    sorting,
    skipCount,
    maxResultCount,
    extraProperties,
  }: {
    filter?: string,
    id?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
    extraProperties?: Record<string, any>,
  }) => {
    const response = await OrganizationUnitService.getOrganizationUnitsAvailableRoles({
      filter,
      id,
      sorting,
      skipCount,
      maxResultCount,
      extraProperties,
    });
    return response;
  }
);

export const deleteOrganizationUnitsMembersRequest = createAsyncThunk(
  'organizationunit/deleteOrganizationUnitsMembersRequest',
  async ({
    id,
    memberId,
  }: {
    id: string,
    memberId: string,
  }) => {
    const response = await OrganizationUnitService.deleteOrganizationUnitsMembers({
      id,
      memberId,
    });
    return response;
  }
);

export const deleteOrganizationUnitsRolesRequest = createAsyncThunk(
  'organizationunit/deleteOrganizationUnitsRolesRequest',
  async ({
    id,
    roleId,
  }: {
    id: string,
    roleId: string,
  }) => {
    const response = await OrganizationUnitService.deleteOrganizationUnitsRoles({
      id,
      roleId,
    });
    return response;
  }
);

export interface OrganizationUnitState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getOrganizationUnitsRoles: any;

  getOrganizationUnitsMembers: any;

  getOrganizationUnits: any;

  getOrganizationUnits1: any;

  getOrganizationUnitsAll: any;

  getOrganizationUnitsAvailableUsers: any;

  getOrganizationUnitsAvailableRoles: any;
};


const initialState: OrganizationUnitState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getOrganizationUnitsRoles: {},

  getOrganizationUnitsMembers: {},

  getOrganizationUnits: {},

  getOrganizationUnits1: {},

  getOrganizationUnitsAll: {},

  getOrganizationUnitsAvailableUsers: {},

  getOrganizationUnitsAvailableRoles: {},
};

const organizationunitSlice = createSlice({
  name: "organizationunit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(putOrganizationUnitsRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putOrganizationUnitsRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putOrganizationUnitsRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnitsRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnitsRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnitsRoles = action.payload
    });
    builder.addCase(getOrganizationUnitsRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putOrganizationUnitsMembersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putOrganizationUnitsMembersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putOrganizationUnitsMembersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnitsMembersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnitsMembersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnitsMembers = action.payload
    });
    builder.addCase(getOrganizationUnitsMembersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnits = action.payload
    });
    builder.addCase(getOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnits1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnits1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnits1 = action.payload
    });
    builder.addCase(getOrganizationUnits1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnitsAllRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnitsAllRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnitsAll = action.payload
    });
    builder.addCase(getOrganizationUnitsAllRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putOrganizationUnitsMoveRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putOrganizationUnitsMoveRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putOrganizationUnitsMoveRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnitsAvailableUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnitsAvailableUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnitsAvailableUsers = action.payload
    });
    builder.addCase(getOrganizationUnitsAvailableUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getOrganizationUnitsAvailableRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getOrganizationUnitsAvailableRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getOrganizationUnitsAvailableRoles = action.payload
    });
    builder.addCase(getOrganizationUnitsAvailableRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteOrganizationUnitsMembersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOrganizationUnitsMembersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteOrganizationUnitsMembersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteOrganizationUnitsRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOrganizationUnitsRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteOrganizationUnitsRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default organizationunitSlice.reducer;
