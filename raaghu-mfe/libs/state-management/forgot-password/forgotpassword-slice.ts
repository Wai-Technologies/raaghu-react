import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let AccountService: any;
(async () => {
    const module = await import("../../proxy");
    if ("AccountService" in module) {
        AccountService = module.AccountService;
    }
})();
export interface ForgotPasswordState {
    title: string,
    message: string,
}

export const forgotPasswordInitialState: ForgotPasswordState = {
    title: "",
    message: "Failed..",

};

const email: any = {};

export const shouldSendPasswordResetCode = createAsyncThunk("sendPasswordResetCode/status",
    async (emailAddress: any) => {
        email.emailAddress = emailAddress;
        const response = await AccountService?.postSendPasswordResetCode(email);
        console.log(response);
        return response;
    }
);

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: forgotPasswordInitialState,
    reducers: {
        getProfilePicture(state) {
            state.message = "loading";
        },

    },
    extraReducers: (builder) => {
        builder.addCase(shouldSendPasswordResetCode.fulfilled, (state, action) => {
            if (action.payload === undefined) {
                state.message = "Failed..";
                state.title = "Error !";
            }
            else {
                state.message = "Email Sent Successfully..";
                state.title = "Success !";
            }
        });
        builder.addCase(shouldSendPasswordResetCode.rejected, (state, action) => {
            state.message = "Failed..";
            state.title = "Error !";
        });

    },
});

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
export const forgotPasswordActions = forgotPasswordSlice.actions;