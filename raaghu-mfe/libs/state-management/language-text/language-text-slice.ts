import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";

let LanguagesService: any;
let LanguageTextsService: any;
(async () => {
    const module = await import("../../proxy");

    if ("LanguagesService" in module) {
        LanguagesService = module.LanguagesService;
    }
    if ("LanguageTextsService" in module) {
        LanguageTextsService = module.LanguageTextsService;
    }
})();

type InitialState = {
    loading: boolean;
    languagesText: any;
    resources: any;
    languagesTextEdit: any;
    error: string;
};
export const languageTextState: InitialState = {
    loading: false,
    languagesText: [],
    resources: [],
    languagesTextEdit: {},
    error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchLanguagesText = createAsyncThunk(
    "languageText/fetchLanguagesText",
    (data: any) => {
        return LanguageTextsService?.getLanguageTexts({
            resourceName: data.resourceName,
            baseCultureName: data.baseCultureName,
            targetCultureName: data.targetCultureName,
            getOnlyEmptyValues: data.getOnlyEmptyValues,
            sorting: "name asc",
            skipCount: data.skipCount,
            maxResultCount: data.maxResultCount,
        }).then((result: any) => {
            return result;
        });
    }
);

export const fetchResources = createAsyncThunk(
    "languageText/fetchResources",
    async () => {
        return await LanguagesService?.getLanguagesResources().then((result: any) => {
            return result;
        });
    }
);

export const putLanguages = createAsyncThunk(
    "languageText/putLanguages",
    async ({
        resourceName,
        cultureName,
        Name,
        value,
    }: {
        resourceName: any;
        cultureName: any;
        Name: any;
        value: any;
    }) => {
        return await LanguageTextsService?.putLanguageTexts({ resourceName: resourceName, cultureName: cultureName, name: Name, value: value })
            .then((result: any) => {
                return result;
            });
    }
);

export const restore = createAsyncThunk(
    "languageText/restore",
    async ({
        resourceName,
        cultureName,
        Name,
    }: {
        resourceName: any;
        cultureName: any;
        Name: any;
    }) => {
        return await LanguageTextsService?.putLanguageTextsRestore({ resourceName: resourceName, cultureName: cultureName, name: Name })
            .then((result: any) => {
                return result;
            });
    }
);

const languageTextSlice = createSlice({
    name: "languageText",
    initialState: languageTextState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLanguagesText.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchLanguagesText.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.languagesText = action.payload;
                state.error = "";
            }
        );

        builder.addCase(fetchLanguagesText.rejected, (state, action) => {
            state.loading = false;
            state.languagesText = [];
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchResources.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchResources.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.resources = action.payload;
                state.error = "";
            }
        );

        builder.addCase(fetchResources.rejected, (state, action) => {
            state.loading = false;
            state.resources = [];
            state.error = action.error.message || "Something went wrong";
        });
    },
});

export default languageTextSlice.reducer;
