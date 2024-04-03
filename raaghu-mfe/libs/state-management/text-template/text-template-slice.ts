import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TextTemplateDefinitionsService, TextTemplateContentsService, AbpApplicationConfigurationService } from "../../proxy";
export interface TextTemplateState {
    textTemplate: any;
    templateData: any;
    referenceContent: any;
    targetContent: any;
    languages: any;
    error: string | null;
    loading: boolean;
}

export const textTemplateInitialState: TextTemplateState = {
    textTemplate: { items: [] },
    templateData: null,
    referenceContent: '',
    targetContent: "",
    languages: null,
    error: null,
    loading: false,
};

export const getAllTemplates = createAsyncThunk("TextTemplate/GetAllTemplates", (data: any) => {
    return TextTemplateDefinitionsService?.getTemplateDefinitions(data).then((result: any) => {
        return result;
    });
});

export const getTemplateContent = createAsyncThunk("TextTemplate/getTemplateContent", (data: any) => {
    return TextTemplateContentsService?.getTemplateContents({ templateName: data.template, cultureName: data.culture }).then((result: any) => {
        return result;
    });
});
export const getTemplateContentRef = createAsyncThunk("TextTemplate/getTemplateContentRef", (data: any) => {
    return TextTemplateContentsService?.getTemplateContents({ templateName: data.template, cultureName: data.culture }).then((result: any) => {
        return result.content;
    });
});
export const getTemplateContentTar = createAsyncThunk("TextTemplate/getTemplateContentTar", (data: any) => {
    return TextTemplateContentsService?.getTemplateContents({ templateName: data.template, cultureName: data.culture }).then((result: any) => {
        return result.content;
    });
});

export const updateTemplateContent = createAsyncThunk("TextTemplate/updateTemplateContent", (data: any) => {
    return TextTemplateContentsService?.putTemplateContents({ requestBody: data }).then((result: any) => {
        return result;
    });
});

export const restoreToDefault = createAsyncThunk("TextTemplate/RestoreToDefault", (data: any) => {
    return TextTemplateContentsService?.putTemplateContentsRestoreToDefault({ requestBody: data }).then((result: any) => {
        return result;
    }).then(() => {
        return TextTemplateContentsService?.getTemplateContents({ templateName: data.templateName, cultureName: data.culture }).then((result: any) => {
            return result;
        });
    });
});

export const allLanguagesCulture = createAsyncThunk("TextTemplate/AllLanguagesCulture", () => {
    return AbpApplicationConfigurationService?.getApplicationConfiguration({ includeLocalizationResources: false }).then((result: any) => {
        return result;
    });
});

const textTemplateSlice = createSlice({
    name: "TextTemplate",
    initialState: textTemplateInitialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTemplates.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTemplates.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.textTemplate = action.payload;
        });
        builder.addCase(getAllTemplates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Someting went wrong";
        });

        builder.addCase(getTemplateContent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTemplateContent.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.templateData = action.payload;
        });
        builder.addCase(getTemplateContent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Someting went wrong";
        });
        //ref
        builder.addCase(getTemplateContentRef.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTemplateContentRef.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.referenceContent = action.payload;
        });
        builder.addCase(getTemplateContentRef.rejected, (state, action) => {
            state.loading = false;
            state.referenceContent = '';
            state.error = action.error.message || "Someting went wrong";
        });
        //tar
        builder.addCase(getTemplateContentTar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTemplateContentTar.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.targetContent = action.payload;
        });
        builder.addCase(getTemplateContentTar.rejected, (state, action) => {
            state.loading = false;
            state.targetContent = '';
            state.error = action.error.message || "Someting went wrong";
        });

        builder.addCase(restoreToDefault.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(restoreToDefault.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.templateData = action.payload;
        });
        builder.addCase(restoreToDefault.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Someting went wrong";
        });

        builder.addCase(updateTemplateContent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTemplateContent.fulfilled, (state, action: PayloadAction<any>) => {
            state.templateData = action.payload;
            state.loading = false;
        });
        builder.addCase(updateTemplateContent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Someting went wrong";
        });

        builder.addCase(allLanguagesCulture.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(allLanguagesCulture.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.languages = action.payload;
        });
        builder.addCase(allLanguagesCulture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Someting went wrong";
        });
    }
});

export default textTemplateSlice.reducer;