import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import * as module from "../../proxy/index";
const AuthorityDelegationService: any = module.UserService;

export interface authorityDelegationInitialState {
  loading: boolean;
  delegateUsers: any;
  myDelegateUsers: any;
  userLookup: any;
  error: string;
}

export const authorityDelegationState: authorityDelegationInitialState = {
  loading: false,
  delegateUsers: { items: [] },
  myDelegateUsers: { items: [] },
  userLookup: { items: [] },
  error: "",
};

export const getUserDelegationDelegatedUsers = createAsyncThunk(
  "authorityDelegation/getUserDelegationDelegatedUsers",
  () => {
    return AuthorityDelegationService?.getUserDelegationDelegatedUsers().then(
      (result: any) => {
        return result;
      }
    );
  }
);
export const getUserDelegationMyDelegatedUsers = createAsyncThunk(
  "authorityDelegation/getUserDelegationMyDelegatedUsers",
  () => {
    return AuthorityDelegationService?.getUserDelegationMyDelegatedUsers().then(
      (result: any) => {
        return result;
      }
    );
  }
);

export const getUserDelegationActiveDelegations = createAsyncThunk(
  "authorityDelegation/getUserDelegationActiveDelegations",
  () => {
    return AuthorityDelegationService?.getUserDelegationActiveDelegations().then(
      (result: any) => {
        return result;
      }
    );
  }
);
export const getUserDelegationUserLookup = createAsyncThunk(
  "authorityDelegation/getUserDelegationUserLookup",
  ({ filter }: any) => {
    return AuthorityDelegationService?.getUserDelegationUserLookup({
      filter: filter,
    }).then((result: any) => {
      return result;
    });
  }
);
export const postUserDelegationDelegateNewUser = createAsyncThunk(
  "authorityDelegation/postUserDelegationDelegateNewUser",
  (data: any) => {
    return AuthorityDelegationService?.postUserDelegationDelegateNewUser({
      requestBody: data,
    }).then((result: any) => {
      return result;
    });
  }
);

export const postUserDelegationDeleteDelegation = createAsyncThunk(
  "authorityDelegation/postUserDelegationDeleteDelegation",
  (id: any) => {
    return AuthorityDelegationService?.postUserDelegationDeleteDelegation({
      id: id,
    }).then((result: any) => {
      return result;
    });
  }
);

const authorityDelegationSlice = createSlice({
  name: "authorityDelegation",
  initialState: authorityDelegationState,
  reducers: {},
  extraReducers: (builder) => {
    // Add your extraReducers here
    //delegate users
    builder.addCase(getUserDelegationDelegatedUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getUserDelegationDelegatedUsers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.delegateUsers = action.payload;
        state.error = "";
      }
    );

    builder.addCase(
      getUserDelegationDelegatedUsers.rejected,
      (state, action) => {
        state.loading = false;
        state.delegateUsers = { items: [] };
        state.error = action.error.message || "Something went wrong";
      }
    );

    // my delegate users
    builder.addCase(getUserDelegationMyDelegatedUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getUserDelegationMyDelegatedUsers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.myDelegateUsers = action.payload;
        state.error = "";
      }
    );

    builder.addCase(
      getUserDelegationMyDelegatedUsers.rejected,
      (state, action) => {
        state.loading = false;
        state.myDelegateUsers = { items: [] };
        state.error = action.error.message || "Something went wrong";
      }
    );
    // user lookup

    builder.addCase(getUserDelegationUserLookup.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getUserDelegationUserLookup.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userLookup = action.payload;
        state.error = "";
      }
    );

    builder.addCase(getUserDelegationUserLookup.rejected, (state, action) => {
      state.loading = false;
      state.userLookup = { items: [] };
      state.error = action.error.message || "Something went wrong";
    });
    // post delegate new user
    builder.addCase(postUserDelegationDelegateNewUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUserDelegationDelegateNewUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });

    builder.addCase(
      postUserDelegationDelegateNewUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    // delete delegate user
    builder.addCase(postUserDelegationDeleteDelegation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postUserDelegationDeleteDelegation.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });

    builder.addCase(
      postUserDelegationDeleteDelegation.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );
  },
});

export default authorityDelegationSlice.reducer;
