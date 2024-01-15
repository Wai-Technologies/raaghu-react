import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let GlobalResourcePublicService: any;
let GlobalResourceAdminService: any;
(async () => {
    const module = await import("../../proxy");
    if ("GlobalResourcePublicService" in module) {
        GlobalResourcePublicService = module.GlobalResourcePublicService;
    }
    if ("GlobalResourceAdminService" in module) {
        GlobalResourceAdminService = module.GlobalResourceAdminService;
    }
})();

type InitialState = {
    style: any;
    script: any;
    globalResources: any;
    loading: boolean,
    error: string,
}

const initialState: InitialState = {
    style: {},
    script: {},
    globalResources: {},
    loading: false,
    error: "",
};

export const getStyle = createAsyncThunk("GlobalResources/GetStyle", () => {
    return GlobalResourcePublicService?.getGlobalResourcesStyle().then((result: any) => {
        return result;
    });
});

export const getScript = createAsyncThunk("GlobalResources/GetScript", () => {
    return GlobalResourcePublicService?.getGlobalResourcesScript().then((result: any) => {
        return result;
    });
});

export const getGlobalResources = createAsyncThunk("GlobalResources/GetGlobalResources", () => {
    return GlobalResourceAdminService?.getGlobalResources().then((result: any) => {
        return result;
    });
});

export const saveGlobalResources = createAsyncThunk("GlobalResources/SaveGlobalResources", (data: any) => {
    return GlobalResourceAdminService?.postGlobalResources({ requestBody: data.body }).then((result: any) => {
        return result;
    });
});

const scopeSlice = createSlice({
    name: "Blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStyle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStyle.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.style = action.payload;
            state.error = "";
        });
        builder.addCase(getStyle.rejected, (state, action) => {
            state.loading = false;
            state.style = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(getScript.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getScript.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.script = action.payload;
            state.error = "";
        });
        builder.addCase(getScript.rejected, (state, action) => {
            state.loading = false;
            state.script = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(saveGlobalResources.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveGlobalResources.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(saveGlobalResources.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(getGlobalResources.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getGlobalResources.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.globalResources = action.payload;
            state.error = "";
        });
        builder.addCase(getGlobalResources.rejected, (state, action) => {
            state.loading = false;
            state.globalResources = {};
            state.error = action.error.message || "Something Went Wrong";
        });

    },
});

export default scopeSlice.reducer;