import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
} from "@reduxjs/toolkit";

let AccountService: any;
(async () => {
const module = await import("../../proxy");
if ("AccountService" in module) {
    AccountService = module.AccountService;
}
})();

type hostInitialState = {
    loading: boolean;
    configuration: any;
    callLogin: any;
    currentLanguage: any,
    profilepic: any;
    error: string;
    invalidCredential: any;
    getProfilePicData: any;
    logoImg: any;
    theme: any;
};

const hostInitial: hostInitialState = {
    loading: false,
    configuration: null,
    callLogin: null,
    currentLanguage: "en",
    profilepic: null,
    invalidCredential: { invalid: false, message: "" },
    getProfilePicData: null,
    error: "",
    logoImg: "",
    theme: ""
};

export const callLoginAction = createAction<any>("host/callLoginAction");
export const changeLanguageAction = createAction<any>("host/changeLanguageAction");
export const invalidCredentialAction = createAction<any>(
    "host/invalidCredentialAction"
);
export const setlogoImgAction = createAction<any>("host/setlogoImgAction")
export const setPicSideNav = createAction<any>("host/setPicSideNav");
export const getProfilePictureHost = createAsyncThunk(
    "host/getProfilePictureHost",
    (id: any) => {
        return AccountService?.getProfilePicture({ id: id }).then((result: any) => {
            return result;
        });
    }
);

const hostSlice = createSlice({
    name: "host",
    initialState: hostInitial,
    reducers: {
        callLoginAction: (state: any, action: PayloadAction<any>) => {
            state.callLogin = action.payload;
        },
        setlogoImgAction: (state: any, action: PayloadAction<any>) => {
            state.logoImg = action.payload.logoImg;
            state.theme = action.payload.theme;
        },
        changeLanguageAction: (state: any, action: PayloadAction<any>) => {
            state.currentLanguage = action.payload;
        },
        invalidCredentialAction: (state: any, action: PayloadAction<any>) => {
            state.invalidCredential = action.payload;
        },
        setPicSideNav: (state: any, action: PayloadAction<any>) => {
            state.profilepic = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProfilePictureHost.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            getProfilePictureHost.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.profilepic = action.payload;
            }
        );
        builder.addCase(getProfilePictureHost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
    },
});

export default hostSlice.reducer;
