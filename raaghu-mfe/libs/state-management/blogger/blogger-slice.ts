import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let BlogManagementService: any;
// Comment the code because of the Api loading issue
// (async () => {
const module = await import("../../proxy");
if ("BlogManagementService" in module) {
    BlogManagementService = module.BlogManagementService;
}
// })();

type InitialState = {
    allblogs: any,
    blog: any
    loading: boolean,
    error: string,
}

const initialState: InitialState = {
    allblogs: {},
    blog: {},
    loading: false,
    error: "",
};

export const getAllBlogs = createAsyncThunk("Blogs/GetAll", () => {
    return BlogManagementService?.getBlogsAdmin().then((result: any) => {
        return result;
    });
});

export const createNewBlog = createAsyncThunk("Blogs/Create", (data: any) => {
    return BlogManagementService?.postBlogsAdmin({ requestBody: data.data }).then((result: any) => {
        return result;
    });
});

export const getBlogById = createAsyncThunk("Blogs/GetById", (data: any) => {
    return BlogManagementService?.getBlogsAdmin1({ id: data.id }).then((result: any) => {
        return result;
    });
});

export const updateBlog = createAsyncThunk("Blogs/Update", (data: any) => {
    return BlogManagementService?.putBlogsAdmin({ id: data.id, requestBody: data.data }).then((result: any) => {
        return result;
    });
});

export const deleteBlog = createAsyncThunk("Blogs/Delete", (data: any) => {
    return BlogManagementService?.deleteBlogsAdmin({ id: data.id }).then((result: any) => {
        return result;
    });
});

export const clearCache = createAsyncThunk("Blogs/ClearCache", (data: any) => {
    return BlogManagementService?.getBlogsAdminClearCache({ id: data.id }).then((result: any) => {
        return result;
    });
});


const scopeSlice = createSlice({
    name: "Blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBlogs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBlogs.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.allblogs = action.payload;
            state.error = "";
        });
        builder.addCase(getAllBlogs.rejected, (state, action) => {
            state.loading = false;
            state.allblogs = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(createNewBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createNewBlog.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(createNewBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(getBlogById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBlogById.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blog = action.payload;
            state.error = "";
        });
        builder.addCase(getBlogById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });


        builder.addCase(updateBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateBlog.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(deleteBlog.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBlog.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(clearCache.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(clearCache.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(clearCache.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
    },
});

export default scopeSlice.reducer;