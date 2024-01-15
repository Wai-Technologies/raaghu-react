import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";

let MenuItemAdminService: any;
(async () => {
    const module = await import("../../proxy");
    if ("MenuItemAdminService" in module) {
        MenuItemAdminService = module.MenuItemAdminService;
    }
})();

type MenuState = {
    loading: boolean;
    menus: any;
    pages: { items: any[], totalCount: number | null };
    error: string;
};

export const MenusState: MenuState = {
    loading: false,
    menus: [],
    pages: { items: [], totalCount: null },
    error: "",
};

// Generates pending, fulfilled and rejected action types
export const getAllMenuItems = createAsyncThunk(
    "menu/getAllMenuItems",
    async () => {
        return await MenuItemAdminService?.getMenuItems().then((result: any) => {
            console.log("menus slice data -", result)
            return result;
        });

    }
);
export const getMenuItem = createAsyncThunk(
    "menu/getMenuItem",
    async (id: any) => {
        return await MenuItemAdminService?.getMenuItems1({ id: id }).then((result: any) => {
            return result;
        });

    }
)

export const editMenuItem = createAsyncThunk(
    "menu/editMenuItem",
    async ({ id, model }: { id: any, model: any }) => {
        return await MenuItemAdminService?.putMenuItems({ id: id, requestBody: model }).then((result: any) => {
            return result;
        });

    }
);

export const postMenuItems = createAsyncThunk(
    "menu/postMenuItems",
    (dto: any) => {
        return MenuItemAdminService?.postMenuItems({ requestBody: dto }).then((result: any) => {
            return result;
        });
    }
);

export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    (id: any) => {
        return MenuItemAdminService?.deleteMenuItems({ id: id }).then((result: any) => {
            return result;
        });
    }
);
export const fetchPages = createAsyncThunk(
    "menu/fetchPage",
    (data: any) => {
        return MenuItemAdminService?.getMenuItemsLookupPages(data).then((result: any) => {
            return result;
        });
    }
);

const menuSlice = createSlice({
    name: "menu",
    initialState: MenusState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMenuItems.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            getAllMenuItems.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.menus = action.payload;
                state.error = "";
            }
        );

        builder.addCase(getAllMenuItems.rejected, (state, action) => {
            state.loading = false;
            state.menus = {};
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(postMenuItems.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            postMenuItems.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );

        builder.addCase(postMenuItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(deleteMenuItem.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            deleteMenuItem.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );

        builder.addCase(deleteMenuItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(editMenuItem.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            editMenuItem.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );

        builder.addCase(editMenuItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchPages.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchPages.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.pages = { items: action.payload.items, totalCount: action.payload.totalCount };;
                state.error = "";
            }
        );

        builder.addCase(fetchPages.rejected, (state, action) => {
            state.loading = false;
            state.pages = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });
    },
});

export default menuSlice.reducer;
