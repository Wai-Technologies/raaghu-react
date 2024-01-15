import { createSlice, createAsyncThunk, PayloadAction, } from "@reduxjs/toolkit";

export interface HomeInitialState {
    loading: boolean;
    Homes: any;
    error: string;
};

export const HomeState: HomeInitialState = {
    loading: false,
    Homes: {},
    error: "",
};

// Add your Api call here
const HomeSlice = createSlice({
    name: "Home",
    initialState: HomeState,
    reducers: {},
    extraReducers: (builder) => {
        // Add your extraReducers here
    }
})

export default HomeSlice.reducer;