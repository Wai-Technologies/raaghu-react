import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Volo_Abp_Account_UnLinkUserInput, Volo_Abp_Account_VerifyLinkLoginTokenInput, Volo_Abp_Account_VerifyLinkTokenInput } from "../../proxy/index";

let UserService: any;
const module = await import("../../proxy");
if ("UserService" in module) {
  UserService = module.UserService;
}

export interface linkedAccountsInitialState {
  loading: boolean;
  error: string;
  linkUsers: any;
}

export const linkedAccountsState: linkedAccountsInitialState = {
  loading: false,
  error: "",
  linkUsers: null,
};

export const getLinkUserRequest = createAsyncThunk(
  "linkUser/getLinkUserRequest",
  async () => {
    const response = await UserService.getLinkUser();
    return response;
  }
);

export const postLinkUserGenerateLinkTokenRequest = createAsyncThunk(
  "linkUser/postLinkUserGenerateLinkTokenRequest",
  async () => {
    const response = await UserService.postLinkUserGenerateLinkToken();
    return response;
  }
);

export const postLinkUserVerifyLinkTokenRequest = createAsyncThunk(
  "linkUser/postLinkUserVerifyLinkTokenRequest",
  async ({
    requestBody,
  }: {
    requestBody?: Volo_Abp_Account_VerifyLinkTokenInput;
  }) => {
    const response = await UserService.postLinkUserVerifyLinkToken({
      requestBody,
    });
    return response;
  }
);

export const postLinkUserGenerateLinkLoginTokenRequest = createAsyncThunk(
  'linkUser/postLinkUserGenerateLinkLoginTokenRequest',
  async () => {
      const response = await UserService.postLinkUserGenerateLinkLoginToken();
      return response;
  }
);

export const postLinkUserVerifyLinkLoginTokenRequest = createAsyncThunk(
    'linkUser/postLinkUserVerifyLinkLoginTokenRequest',
    async ({
      requestBody,
  }:{
      requestBody?: Volo_Abp_Account_VerifyLinkLoginTokenInput,
  }) => {
        const response = await UserService.postLinkUserVerifyLinkLoginToken({
      requestBody,
  });
        return response;
    }
  );

  export const postLinkUserUnlinkRequest = createAsyncThunk(
    'linkUser/postLinkUserUnlinkRequest',
    async ({
      requestBody,
  }:{
      requestBody?: Volo_Abp_Account_UnLinkUserInput,
  }) => {
        const response = await UserService.postLinkUserUnlink({
      requestBody,
  });
        return response;
    }
  );


// Add your Api call here

const linkedAccountsSlice = createSlice({
  name: "linkedAccounts",
  initialState: linkedAccountsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLinkUserRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLinkUserRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.linkUsers = action.payload;
    });
    builder.addCase(getLinkUserRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(postLinkUserGenerateLinkTokenRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      postLinkUserGenerateLinkTokenRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.linkUsers = action.payload;
      }
    );
    builder.addCase(
      postLinkUserGenerateLinkTokenRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(postLinkUserVerifyLinkTokenRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postLinkUserVerifyLinkTokenRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(
      postLinkUserVerifyLinkTokenRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(postLinkUserGenerateLinkLoginTokenRequest.pending, (state) => {
      state.loading = true;
    });
    
builder.addCase(postLinkUserGenerateLinkLoginTokenRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      
    });
builder.addCase(postLinkUserGenerateLinkLoginTokenRequest.rejected,(state, action)=> {
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
builder.addCase(postLinkUserVerifyLinkLoginTokenRequest.rejected,(state, action)=> {
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
builder.addCase(postLinkUserUnlinkRequest.rejected,(state, action)=> {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default linkedAccountsSlice.reducer;