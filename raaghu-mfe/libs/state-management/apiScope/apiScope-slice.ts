import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let ScopesService: any;
(async () => {
const module = await import("../../proxy");
if ("ScopesService" in module) {
    ScopesService = module.ScopesService;
}
})();

type InitialState = {
    loading: boolean,
    users: { items: any[], totalCount: number | null };
    error: string,
    editScope: any,
}

const initialState: InitialState = {
    loading: false,
    users: { items: [], totalCount: null },
    editScope: {},
    error: "",
};

export const fetchScopesData = createAsyncThunk("Scopes/fetchScopesData", (
    data: any
) => {
    return ScopesService?.getScopes1({ filter: undefined, sorting: "id DESC", skipCount: data.skipCount, maxResultCount: data.maxResultCount }).then((result: any) => {
        console.log("result", result);
        return result;
    });
});

export const editScopesData = createAsyncThunk("Scopes/editScopesData", (id: any) => {
    return ScopesService?.getScopes({ id: id }).then((result: any) => {
        console.log("result", result);
        return result;
    });
});

export const deleteScopesData = createAsyncThunk("Scopes/deleteScopesData", (id: any) => {
    return ScopesService?.deleteScopes({ id: id }).then((result: any) => {
        return result;
    });
});

export const getScopesData = createAsyncThunk("Scopes/getScopesData", (ScopeDto: any) => {
    return ScopesService?.postScopes({ requestBody: ScopeDto }).then((result: any) => {
        return result
    });
});

export const updateScopesData = createAsyncThunk("Scopes/updateScopesData", ({ id, updateScopeDto }: { id: any, updateScopeDto: any }) => {
    return ScopesService?.putScopes({ id: id, requestBody: updateScopeDto }).then((result: any) => {
        return result
    });
});

const scopeSlice = createSlice({
    name: "Scopes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchScopesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchScopesData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = { items: action.payload.items, totalCount: action.payload.totalCount };
            state.error = "";
        });
        builder.addCase(fetchScopesData.rejected, (state, action) => {
            state.loading = false;
            state.users = { items: [], totalCount: null };
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(deleteScopesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteScopesData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(deleteScopesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong"
        });
        builder.addCase(getScopesData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = { items: action.payload.items, totalCount: action.payload.totalCount };
            state.error = "";
        });
        builder.addCase(getScopesData.rejected, (state, action) => {
            state.loading = false;
            state.users = { items: [], totalCount: null };
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(getScopesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateScopesData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = { items: action.payload.items, totalCount: action.payload.totalCount };
            state.error = "";
        });
        builder.addCase(updateScopesData.rejected, (state, action) => {
            state.loading = false;
            state.users = { items: [], totalCount: null };
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(updateScopesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editScopesData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.editScope = action.payload;
            state.error = "";
        });
        builder.addCase(editScopesData.rejected, (state, action) => {
            state.loading = false;
            state.editScope = {};
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(editScopesData.pending, (state) => {
            state.loading = true;
        });
    },
});

export default scopeSlice.reducer;