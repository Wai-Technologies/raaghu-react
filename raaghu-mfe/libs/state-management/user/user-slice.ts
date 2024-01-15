
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_Abp_Account_DelegateNewUserInput } from '../../proxy/index';

import { Volo_Abp_Account_IsLinkedInput } from '../../proxy/index';

import { Volo_Abp_Account_LinkUserInput } from '../../proxy/index';

import { Volo_Abp_Account_UnLinkUserInput } from '../../proxy/index';

import { Volo_Abp_Account_VerifyLinkLoginTokenInput } from '../../proxy/index';

import { Volo_Abp_Account_VerifyLinkTokenInput } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityUserClaimDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityUserCreateDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityUserUpdateDto } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityUserUpdatePasswordInput } from '../../proxy/index';

import { Volo_Abp_Identity_IdentityUserUpdateRolesDto } from '../../proxy/index';

import { Volo_Abp_Identity_ImportExternalUserInput } from '../../proxy/index';

let UserService: any;
// using this async intial data loading issue 
// (async () => {
const module = await import("../../proxy");
if ("UserService" in module) {
  UserService = module.UserService;
}
// })();

export const getUsersRequest = createAsyncThunk(
  'user/getUsersRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.getUsers({
      id,
    });
    return response;
  }
);

export const putUsersRequest = createAsyncThunk(
  'user/putUsersRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_IdentityUserUpdateDto,
  }) => {
    const response = await UserService.putUsers({
      id,
      requestBody,
    });
    return response;
  }
);

export const deleteUsersRequest = createAsyncThunk(
  'user/deleteUsersRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.deleteUsers({
      id,
    });
    return response;
  }
);

export const getUsers1Request = createAsyncThunk(
  'user/getUsers1Request',
  async ({
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
    const response = await UserService.getUsers1({
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

export const postUsersRequest = createAsyncThunk(
  'user/postUsersRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Identity_IdentityUserCreateDto,
  }) => {
    const response = await UserService.postUsers({
      requestBody,
    });
    return response;
  }
);

export const getUsersRolesRequest = createAsyncThunk(
  'user/getUsersRolesRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.getUsersRoles({
      id,
    });
    return response;
  }
);

export const putUsersRolesRequest = createAsyncThunk(
  'user/putUsersRolesRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_IdentityUserUpdateRolesDto,
  }) => {
    const response = await UserService.putUsersRoles({
      id,
      requestBody,
    });
    return response;
  }
);

export const getUsersAssignableRolesRequest = createAsyncThunk(
  'user/getUsersAssignableRolesRequest',
  async () => {
    const response = await UserService.getUsersAssignableRoles();
    return response;
  }
);

export const getUsersAvailableOrganizationUnitsRequest = createAsyncThunk(
  'user/getUsersAvailableOrganizationUnitsRequest',
  async () => {
    const response = await UserService.getUsersAvailableOrganizationUnits();
    return response;
  }
);

export const getUsersAllClaimTypesRequest = createAsyncThunk(
  'user/getUsersAllClaimTypesRequest',
  async () => {
    const response = await UserService.getUsersAllClaimTypes();
    return response;
  }
);

export const getUsersClaimsRequest = createAsyncThunk(
  'user/getUsersClaimsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.getUsersClaims({
      id,
    });
    return response;
  }
);

export const putUsersClaimsRequest = createAsyncThunk(
  'user/putUsersClaimsRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Array<Volo_Abp_Identity_IdentityUserClaimDto>,
  }) => {
    const response = await UserService.putUsersClaims({
      id,
      requestBody,
    });
    return response;
  }
);

export const getUsersOrganizationUnitsRequest = createAsyncThunk(
  'user/getUsersOrganizationUnitsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.getUsersOrganizationUnits({
      id,
    });
    return response;
  }
);

export const putUsersLockRequest = createAsyncThunk(
  'user/putUsersLockRequest',
  async ({
    id,
    lockoutEnd,
  }: {
    id: string,
    lockoutEnd: string,
  }) => {
    const response = await UserService.putUsersLock({
      id,
      lockoutEnd,
    });
    return response;
  }
);

export const putUsersUnlockRequest = createAsyncThunk(
  'user/putUsersUnlockRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.putUsersUnlock({
      id,
    });
    return response;
  }
);

export const getUsersByUsernameRequest = createAsyncThunk(
  'user/getUsersByUsernameRequest',
  async ({
    username,
  }: {
    username: string,
  }) => {
    const response = await UserService.getUsersByUsername({
      username,
    });
    return response;
  }
);

export const getUsersByEmailRequest = createAsyncThunk(
  'user/getUsersByEmailRequest',
  async ({
    email,
  }: {
    email: string,
  }) => {
    const response = await UserService.getUsersByEmail({
      email,
    });
    return response;
  }
);

export const getUsersTwoFactorEnabledRequest = createAsyncThunk(
  'user/getUsersTwoFactorEnabledRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await UserService.getUsersTwoFactorEnabled({
      id,
    });
    return response;
  }
);

export const putUsersTwoFactorRequest = createAsyncThunk(
  'user/putUsersTwoFactorRequest',
  async ({
    id,
    enabled,
  }: {
    id: string,
    enabled: boolean,
  }) => {
    const response = await UserService.putUsersTwoFactor({
      id,
      enabled,
    });
    return response;
  }
);

export const putUsersChangePasswordRequest = createAsyncThunk(
  'user/putUsersChangePasswordRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_Abp_Identity_IdentityUserUpdatePasswordInput,
  }) => {
    const response = await UserService.putUsersChangePassword({
      id,
      requestBody,
    });
    return response;
  }
);

export const getUsersLookupRolesRequest = createAsyncThunk(
  'user/getUsersLookupRolesRequest',
  async () => {
    const response = await UserService.getUsersLookupRoles();
    return response;
  }
);

export const getUsersLookupOrganizationUnitsRequest = createAsyncThunk(
  'user/getUsersLookupOrganizationUnitsRequest',
  async () => {
    const response = await UserService.getUsersLookupOrganizationUnits();
    return response;
  }
);

export const getUsersExternalLoginProvidersRequest = createAsyncThunk(
  'user/getUsersExternalLoginProvidersRequest',
  async () => {
    const response = await UserService.getUsersExternalLoginProviders();
    return response;
  }
);

export const postUsersImportExternalUserRequest = createAsyncThunk(
  'user/postUsersImportExternalUserRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Identity_ImportExternalUserInput,
  }) => {
    const response = await UserService.postUsersImportExternalUser({
      requestBody,
    });
    return response;
  }
);

export const postLinkUserLinkRequest = createAsyncThunk(
  'user/postLinkUserLinkRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_LinkUserInput,
  }) => {
    const response = await UserService.postLinkUserLink({
      requestBody,
    });
    return response;
  }
);

export const postLinkUserUnlinkRequest = createAsyncThunk(
  'user/postLinkUserUnlinkRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_UnLinkUserInput,
  }) => {
    const response = await UserService.postLinkUserUnlink({
      requestBody,
    });
    return response;
  }
);

export const postLinkUserIsLinkedRequest = createAsyncThunk(
  'user/postLinkUserIsLinkedRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_IsLinkedInput,
  }) => {
    const response = await UserService.postLinkUserIsLinked({
      requestBody,
    });
    return response;
  }
);

export const postLinkUserGenerateLinkTokenRequest = createAsyncThunk(
  'user/postLinkUserGenerateLinkTokenRequest',
  async () => {
    const response = await UserService.postLinkUserGenerateLinkToken();
    return response;
  }
);

export const postLinkUserVerifyLinkTokenRequest = createAsyncThunk(
  'user/postLinkUserVerifyLinkTokenRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_VerifyLinkTokenInput,
  }) => {
    const response = await UserService.postLinkUserVerifyLinkToken({
      requestBody,
    });
    return response;
  }
);

export const postLinkUserGenerateLinkLoginTokenRequest = createAsyncThunk(
  'user/postLinkUserGenerateLinkLoginTokenRequest',
  async () => {
    const response = await UserService.postLinkUserGenerateLinkLoginToken();
    return response;
  }
);

export const postLinkUserVerifyLinkLoginTokenRequest = createAsyncThunk(
  'user/postLinkUserVerifyLinkLoginTokenRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_VerifyLinkLoginTokenInput,
  }) => {
    const response = await UserService.postLinkUserVerifyLinkLoginToken({
      requestBody,
    });
    return response;
  }
);

export const getLinkUserRequest = createAsyncThunk(
  'user/getLinkUserRequest',
  async () => {
    const response = await UserService.getLinkUser();
    return response;
  }
);

export const getUserDelegationDelegatedUsersRequest = createAsyncThunk(
  'user/getUserDelegationDelegatedUsersRequest',
  async () => {
    const response = await UserService.getUserDelegationDelegatedUsers();
    return response;
  }
);

export const getUserDelegationMyDelegatedUsersRequest = createAsyncThunk(
  'user/getUserDelegationMyDelegatedUsersRequest',
  async () => {
    const response = await UserService.getUserDelegationMyDelegatedUsers();
    return response;
  }
);

export const getUserDelegationActiveDelegationsRequest = createAsyncThunk(
  'user/getUserDelegationActiveDelegationsRequest',
  async () => {
    const response = await UserService.getUserDelegationActiveDelegations();
    return response;
  }
);

export const getUserDelegationUserLookupRequest = createAsyncThunk(
  'user/getUserDelegationUserLookupRequest',
  async ({
    filter,
  }: {
    filter?: string,
  }) => {
    const response = await UserService.getUserDelegationUserLookup({
      filter,
    });
    return response;
  }
);

export const postUserDelegationDelegateNewUserRequest = createAsyncThunk(
  'user/postUserDelegationDelegateNewUserRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_DelegateNewUserInput,
  }) => {
    const response = await UserService.postUserDelegationDelegateNewUser({
      requestBody,
    });
    return response;
  }
);

export const postUserDelegationDeleteDelegationRequest = createAsyncThunk(
  'user/postUserDelegationDeleteDelegationRequest',
  async ({
    id,
  }: {
    id?: string,
  }) => {
    const response = await UserService.postUserDelegationDeleteDelegation({
      id,
    });
    return response;
  }
);

export interface UserState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getUsers: any;

  getUsers1: any;

  getUsersRoles: any;

  getUsersAssignableRoles: any;

  getUsersAvailableOrganizationUnits: any;

  getUsersAllClaimTypes: any;

  getUsersClaims: any;

  getUsersOrganizationUnits: any;

  getUsersByUsername: any;

  getUsersByEmail: any;

  getUsersTwoFactorEnabled: any;

  getUsersLookupRoles: any;

  getUsersLookupOrganizationUnits: any;

  getUsersExternalLoginProviders: any;

  getLinkUser: any;

  getUserDelegationDelegatedUsers: any;

  getUserDelegationMyDelegatedUsers: any;

  getUserDelegationActiveDelegations: any;

  getUserDelegationUserLookup: any;
};


const initialState: UserState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getUsers: {},

  getUsers1: {},

  getUsersRoles: {},

  getUsersAssignableRoles: {},

  getUsersAvailableOrganizationUnits: {},

  getUsersAllClaimTypes: {},

  getUsersClaims: {},

  getUsersOrganizationUnits: {},

  getUsersByUsername: {},

  getUsersByEmail: {},

  getUsersTwoFactorEnabled: {},

  getUsersLookupRoles: {},

  getUsersLookupOrganizationUnits: {},

  getUsersExternalLoginProviders: {},

  getLinkUser: {},

  getUserDelegationDelegatedUsers: {},

  getUserDelegationMyDelegatedUsers: {},

  getUserDelegationActiveDelegations: {},

  getUserDelegationUserLookup: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsers = action.payload
    });
    builder.addCase(getUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsers1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsers1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsers1 = action.payload
    });
    builder.addCase(getUsers1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(getUsersRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersRoles = action.payload
    });

    builder.addCase(getUsersRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(putUsersRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putUsersRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersAssignableRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersAssignableRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersAssignableRoles = action.payload
    });
    builder.addCase(getUsersAssignableRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersAvailableOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersAvailableOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersAvailableOrganizationUnits = action.payload
    });
    builder.addCase(getUsersAvailableOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersAllClaimTypesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersAllClaimTypesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersAllClaimTypes = action.payload
    });
    builder.addCase(getUsersAllClaimTypesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersClaimsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersClaimsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersClaims = action.payload
    });
    builder.addCase(getUsersClaimsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putUsersClaimsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersClaimsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putUsersClaimsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersOrganizationUnits = action.payload
    });
    builder.addCase(getUsersOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putUsersLockRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersLockRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putUsersLockRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putUsersUnlockRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersUnlockRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putUsersUnlockRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersByUsernameRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersByUsernameRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersByUsername = action.payload
    });
    builder.addCase(getUsersByUsernameRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersByEmailRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersByEmailRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersByEmail = action.payload
    });
    builder.addCase(getUsersByEmailRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersTwoFactorEnabledRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersTwoFactorEnabledRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersTwoFactorEnabled = action.payload
    });
    builder.addCase(getUsersTwoFactorEnabledRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putUsersTwoFactorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersTwoFactorRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putUsersTwoFactorRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putUsersChangePasswordRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putUsersChangePasswordRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.alertMessage = "Password Chaged Successfully";

    });
    builder.addCase(putUsersChangePasswordRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersLookupRolesRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersLookupRolesRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersLookupRoles = action.payload
    });
    builder.addCase(getUsersLookupRolesRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersLookupOrganizationUnitsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersLookupOrganizationUnitsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersLookupOrganizationUnits = action.payload
    });
    builder.addCase(getUsersLookupOrganizationUnitsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUsersExternalLoginProvidersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersExternalLoginProvidersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUsersExternalLoginProviders = action.payload
    });
    builder.addCase(getUsersExternalLoginProvidersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postUsersImportExternalUserRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUsersImportExternalUserRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postUsersImportExternalUserRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserLinkRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserLinkRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserLinkRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserUnlinkRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserUnlinkRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserUnlinkRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserIsLinkedRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserIsLinkedRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserIsLinkedRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserGenerateLinkTokenRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserGenerateLinkTokenRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserGenerateLinkTokenRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserVerifyLinkTokenRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserVerifyLinkTokenRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserVerifyLinkTokenRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserGenerateLinkLoginTokenRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserGenerateLinkLoginTokenRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserGenerateLinkLoginTokenRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postLinkUserVerifyLinkLoginTokenRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postLinkUserVerifyLinkLoginTokenRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postLinkUserVerifyLinkLoginTokenRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getLinkUserRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getLinkUserRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getLinkUser = action.payload
    });
    builder.addCase(getLinkUserRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUserDelegationDelegatedUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDelegationDelegatedUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUserDelegationDelegatedUsers = action.payload
    });
    builder.addCase(getUserDelegationDelegatedUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUserDelegationMyDelegatedUsersRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDelegationMyDelegatedUsersRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUserDelegationMyDelegatedUsers = action.payload
    });
    builder.addCase(getUserDelegationMyDelegatedUsersRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUserDelegationActiveDelegationsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDelegationActiveDelegationsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUserDelegationActiveDelegations = action.payload
    });
    builder.addCase(getUserDelegationActiveDelegationsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getUserDelegationUserLookupRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDelegationUserLookupRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getUserDelegationUserLookup = action.payload
    });
    builder.addCase(getUserDelegationUserLookupRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postUserDelegationDelegateNewUserRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUserDelegationDelegateNewUserRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postUserDelegationDelegateNewUserRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postUserDelegationDeleteDelegationRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUserDelegationDeleteDelegationRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postUserDelegationDeleteDelegationRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default userSlice.reducer;
