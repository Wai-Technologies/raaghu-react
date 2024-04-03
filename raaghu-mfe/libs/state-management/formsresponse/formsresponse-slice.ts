import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

export interface formsResponseInitialState {
    loading: boolean;
    formsResponses: any;
    error: string;
};

export const formsResponseState: formsResponseInitialState = {
    loading: false,
    formsResponses: {},
    error: "",
};

// Add your Api call here
const formsResponseSlice = createSlice({
    name: "formsResponse",
    initialState: formsResponseState,
    reducers: {},
    extraReducers: (builder) => {
        // Add your extraReducers here
    }
})

export default formsResponseSlice.reducer;