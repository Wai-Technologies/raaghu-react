import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

export interface PageNotFoundInitialState {
    loading: boolean;
    PageNotFounds: any;
    error: string;
};

export const PageNotFoundState: PageNotFoundInitialState = {
    loading: false,
    PageNotFounds: {},
    error: "",
};

// Add your Api call here
const PageNotFoundSlice = createSlice({
    name: "PageNotFound",
    initialState: PageNotFoundState,
    reducers: {},
    extraReducers: (builder) => {
        // Add your extraReducers here
    }
})

export default PageNotFoundSlice.reducer;