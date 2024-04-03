import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

let AccountService: any;
(async () => {
const module = await import("../../proxy");
if ("AccountService" in module) {
    AccountService = module.AccountService;
}
})();

export interface registerInitialState {
    loading: boolean;
    registers: any;
    error: string;
}

export const registerState: registerInitialState = {
    loading: false,
    registers: {},
    error: "",
};

// Add your Api call here
export const registerData = createAsyncThunk(
    "register/registerData", (registerDto: any) => {
        return AccountService?.postRegister({ requestBody: registerDto }).then((result: any) => {
            return result.items;
        });
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState: registerState,
    reducers: {},
    extraReducers: (builder) => {
        // Add your extraReducers here
        builder.addCase(registerData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            registerData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.registers = { items: action.payload.items, totalCount: action.payload.totalCount };
                state.error = "";
            });
        builder.addCase(registerData.rejected, (state, action) => {
            state.loading = false;
        });

    }
});

export default registerSlice.reducer;
