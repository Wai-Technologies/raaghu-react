import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as module from "../../proxy";

let AccountService: any = module.AccountService;
let ProfileService: any = module.ProfileService;

type InitialStateMyAccount = {
  loading: boolean;
  personalInfo: any;
  changePasswordData: any;
  profilePicture: any;
  twoFactor: boolean;
  error: string;
  getProfilePicData: any;
};

export const initialStateMyAccount: InitialStateMyAccount = {
  loading: false,
  personalInfo: null,
  changePasswordData: null,
  profilePicture: null,
  getProfilePicData: null,
  twoFactor: false,
  error: "",
};

export const fetchMyProfile = createAsyncThunk(
  "myProfile/fetchMyProfile",
  () => {
    return ProfileService?.getMyProfile().then((result: any) => {
      return result;
    });
  }
);

export const saveMyProfile = createAsyncThunk(
  "myProfile/saveMyProfile",
  (data: any) => {
    return ProfileService?.putMyProfile({ requestBody: data }).then(
      (result: any) => {
        return result;
      }
    );
  }
);

export const getProfilePicture = createAsyncThunk(
  "myProfile/getProfilePicture",
  (id: any) => {
    return AccountService?.getProfilePicture({ id }).then((result: any) => {
      return result;
    });
  }
);

export const sendEmailVerifyProfile = createAsyncThunk(
  "myProfile/sendEmailVerifyProfile",
  (data: any) => {
    return AccountService?.postSendEmailConfirmationToken({
      requestBody: data,
    }).then((result: any) => {
      return result;
    });
  }
);

export const changepasswordProfile = createAsyncThunk(
  "myProfile/changepasswordProfile",
  (data: any) => {
    return ProfileService?.postMyProfileChangePassword(data).then(
      (result: any) => {
        return result;
      }
    );
  }
);

export const setProfilePicture = createAsyncThunk(
  "myProfile/setProfilePicture",
  (data: any) => {
    return AccountService?.postProfilePicture(data).then((result: any) => {
      return result;
    });
  }
);

export const setTwoFactorEnabled = createAsyncThunk(
  "myProfile/setTwoFactorEnabled",
  (data: any) => {
    return ProfileService?.postMyProfileSetTwoFactorEnabled(data?.enabled).then(
      (result: any) => {
        return result;
      }
    );
  }
);

const myAccount = createSlice({
  name: "myAccount",
  initialState: initialStateMyAccount,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveMyProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveMyProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.personalInfo = action.payload;
      }
    );
    builder.addCase(saveMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchMyProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchMyProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.personalInfo = action.payload;
      }
    );
    builder.addCase(fetchMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(sendEmailVerifyProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      sendEmailVerifyProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.personalInfo = action.payload;
      }
    );
    builder.addCase(sendEmailVerifyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(changepasswordProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      changepasswordProfile.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.changePasswordData = action.payload;
      }
    );
    builder.addCase(changepasswordProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(setProfilePicture.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      setProfilePicture.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.profilePicture = action.payload;
      }
    );
    builder.addCase(setProfilePicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(setTwoFactorEnabled.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      setTwoFactorEnabled.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.twoFactor = action.payload;
      }
    );
    builder.addCase(setTwoFactorEnabled.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(getProfilePicture.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getProfilePicture.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.getProfilePicData = action.payload;
      }
    );
    builder.addCase(getProfilePicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default myAccount.reducer;
