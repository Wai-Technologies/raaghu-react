import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let BlogPostAdminService: any;
(async () => {
const module = await import("../../proxy");

if ("BlogPostAdminService" in module) {
    BlogPostAdminService = module.BlogPostAdminService;
}
})();


export interface blogPostInitialState {
    loading: boolean;
    error: string;
    allBlogPosts: [];
    blogPost: any;
}

export const blogPostState: blogPostInitialState = {
    loading: false,
    allBlogPosts: [],
    blogPost: {},
    error: "",
};

export const getAllBlogPost = createAsyncThunk(
    "blogPost/getAllBlogPost", (data: any) => {
        return BlogPostAdminService?.getBlogsBlogPosts({
            filter: undefined,
            blogId: undefined,
            authorId: undefined,
            tagId: undefined,
            status: undefined,
            sorting: "creationTime DESC",
            skipCount: data.skipCount,
            maxResultCount: data.maxResultCount,
        }).then((result: any) => {
            return result;
        });
    });
export const getBlogsBlogPosts1 = createAsyncThunk("blogPost/getBlogsBlogPosts1", (id: any) => {
    return BlogPostAdminService?.getBlogsBlogPosts1({ id: id }).then(
        (result: any) => {
            return result;
        }
    );
})

export const addBlogPostData = createAsyncThunk(
    "blogPost/addBlogPostData",
    (data: any) => {
        return BlogPostAdminService?.postBlogsBlogPostsCreateAndPublish({ requestBody: data }).then(
            (result: any) => {
                return result.items;
            }
        );
    }
);

export const postBlogsPostsCreateAndSendToReview = createAsyncThunk(
    "blogPost/postBlogsPostsCreateAndSendToReview",
    (data: any) => {
        return BlogPostAdminService?.postBlogsBlogPostsCreateAndSendToReview({ requestBody: data }).then(
            (result: any) => {
                return result.items;
            }
        );
    }
);

export const postBlogPostsPublish = createAsyncThunk(
    "blogPost/postBlogPostsPublish",
    ({ id }: { id: any; }) => {
        return BlogPostAdminService?.postBlogsBlogPostsPublish({ id }).then((result: any) => {
            return result
        });
    }
);

export const postBlogPostsDraft = createAsyncThunk(
    "blogPost/postBlogPostsDraft",
    ({ id }: { id: any; }) => {
        return BlogPostAdminService?.postBlogsBlogPostsDraft({ id }).then((result: any) => {
            return result
        });
    }
);

export const deleteBlogPosts = createAsyncThunk(
    "blogPost/deleteBlogPosts",
    ({ id }: { id: any; }) => {
        return BlogPostAdminService?.deleteBlogsBlogPosts({ id }).then((result: any) => {
            return result
        });
    }
);

export const editBlogPostData = createAsyncThunk(
    "blogPost/editBlogPostData",
    ({ id, postTypeDto }: { id: any; postTypeDto: any }) => {
        return BlogPostAdminService?.putBlogsBlogPosts({
            id,
            requestBody: postTypeDto,
        }).then((result: any) => {
            return result.items;
        });
    }
);

// Add your Api call here
const blogPostSlice = createSlice({
    name: "blogPost",
    initialState: blogPostState,
    reducers: {},
    extraReducers: (builder) => {
        // Add your extraReducers here
        builder.addCase(getAllBlogPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getAllBlogPost.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.allBlogPosts = action.payload;
                state.error = "";
            }
        );
        builder.addCase(getAllBlogPost.rejected, (state, action) => {
            state.loading = false;
            state.allBlogPosts = [];
            state.error = action.error.message || "Something Went Wrong";
        });

        //get blog post by id
        builder.addCase(getBlogsBlogPosts1.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getBlogsBlogPosts1.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.blogPost = action.payload;
                state.error = "";
            }
        );
        builder.addCase(getBlogsBlogPosts1.rejected, (state, action) => {
            state.loading = false;
            state.blogPost = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(addBlogPostData.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            addBlogPostData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );

        builder.addCase(addBlogPostData.rejected, (state, action) => {
            state.loading = false;
            state.error = "";
        });

        builder.addCase(editBlogPostData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            editBlogPostData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );
        builder.addCase(editBlogPostData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        //Draft
        builder.addCase(postBlogPostsDraft.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            postBlogPostsDraft.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );
        builder.addCase(postBlogPostsDraft.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        //Draft
        builder.addCase(postBlogPostsPublish.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            postBlogPostsPublish.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );
        builder.addCase(postBlogPostsPublish.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        //delete blogs post
        builder.addCase(deleteBlogPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            deleteBlogPosts.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );
        builder.addCase(deleteBlogPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
    },
});

export default blogPostSlice.reducer;