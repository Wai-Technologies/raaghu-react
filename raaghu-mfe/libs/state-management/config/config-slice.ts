import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
} from "@reduxjs/toolkit";
import {
    configurationService
} from "../../../../raaghu-react-core/src/index"

type configlInitialState = {
    configuration: any;
    error: string;
    status: "pending" | "loading" | "error" | "success";
};
export const configlInitialState: configlInitialState = {
    configuration: {},
    error: "",
    status: "pending",
};

export const fetchConfiguration = createAsyncThunk(
    "configuration/fetchConfiguration",
    (currLanguage: string) => {
        return configurationService(currLanguage).then(async (result: any) => {
            return result;
        });
    }
);

export const clearConfiguration = createAction<any>("configuration/clearConfiguration");

const configurationslice = createSlice({
    name: "configuration",
    initialState: configlInitialState,
    reducers: {
        clearConfiguration: (state: any) => {
            state.status = "success";
            state.configuration = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConfiguration.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchConfiguration.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.configuration = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchConfiguration.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });
    },
});
export default configurationslice.reducer;