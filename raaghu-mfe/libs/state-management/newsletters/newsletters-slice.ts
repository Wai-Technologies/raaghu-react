import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let NewsletterRecordAdminService: any;
(async () => {
    const module = await import("../../proxy");
    if ("NewsletterRecordAdminService" in module) {
        NewsletterRecordAdminService = module.NewsletterRecordAdminService;
    }
})();

type NewsLettersInitialState = {
    loading: boolean;
    error: string;
    GetAllNewsLetters: any;
    GetNewsLetter: string;
    GetCsvDetails: string;
    preferenceData: string;
    exportCsvData: string;
    alert: boolean;
    alertMessage: string;
    success: boolean;
};

const NewslettersInitialState: NewsLettersInitialState = {
    loading: false,
    GetAllNewsLetters: [],
    GetNewsLetter: "",
    GetCsvDetails: "",
    preferenceData: "",
    exportCsvData: "",
    error: "",
    alert: false,
    alertMessage: "",
    success: false,
};

export const GetAllNewsLetters = createAsyncThunk(
    "newsletters/GetNewsLettersData",
    async (data: any) => {
        return await NewsletterRecordAdminService?.getNewsletter({ preference: data.preference, source: data.source, skipCount: data.skipCount, maxResultCount: data.maxResultCount })
            .then((result: any) => {
                return result;
            });
    }
);

export const csvDetails = createAsyncThunk("newsletters/csvDetails", () => {
    return NewsletterRecordAdminService?.getNewsletterCsvDetail({ preference: undefined, source: undefined })
        .then((result: any) => {
            return result;
        });
});

export const preferencesData = createAsyncThunk(
    "newsletters/preferencesData",
    () => {
        return NewsletterRecordAdminService?.getNewsletterPreferences().then((result: any) => {
            return result;
        });
    }
);

export const exportCsv = createAsyncThunk("NewsLetters/exportCsv", () => {
    return NewsletterRecordAdminService?.getNewsletterExportCsv({ preference: undefined, source: undefined })
        .then((result: any) => {
            return result;
        });
});

export const fetchNewsLetterData = createAsyncThunk(
    "NewsLetters/fetchNewsLetterData",
    (id: any) => {
        return NewsletterRecordAdminService?.getNewsletter1(id).then((result: any) => {
            return result;
        });
    }
);

const newslettersSlice = createSlice({
    name: "newsletters",
    initialState: NewslettersInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllNewsLetters.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            GetAllNewsLetters.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.GetAllNewsLetters = action.payload;
            }
        );
        builder.addCase(GetAllNewsLetters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(fetchNewsLetterData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchNewsLetterData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.GetNewsLetter = action.payload;
            }
        );
        builder.addCase(fetchNewsLetterData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(csvDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            csvDetails.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.GetCsvDetails = action.payload;
            }
        );
        builder.addCase(csvDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(preferencesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            preferencesData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.preferenceData = action.payload;
            }
        );
        builder.addCase(preferencesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(exportCsv.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            exportCsv.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.exportCsvData = action.payload;
            }
        );
        builder.addCase(exportCsv.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
    },
});

export default newslettersSlice.reducer;
