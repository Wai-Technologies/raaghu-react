import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

let GdprRequestService: any;
(async () => {
const module = await import("../../proxy");
if ("GdprRequestService" in module) {
    GdprRequestService = module.GdprRequestService;
}
})();

type InitialState = {
    personalData: { items: any[] };
    downloadData: {}
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialState: InitialState = {
    personalData: { items: [] },
    downloadData: {},
    error: "",
    status: "pending",
};

export const getPersonalData = createAsyncThunk(
    "PersonalData/getPersonalData",
    async (userId: any) => {
        return GdprRequestService?.getRequestsList({ userId, sorting: undefined, skipCount: undefined, maxResultCount: undefined }).then(
            (result: any) => {
                return result;
            }
        );
    }
);

export const requestPersonalData = createAsyncThunk(
    "PersonalData/requestPersonalData",
    async () => {
        return GdprRequestService?.postRequestsPrepareData().then(
            (result: any) => {
                return result.items;
            }
        );
    }
);

export const deletePersonalData = createAsyncThunk(
    "PersonalData/deletePersonalData",
    async () => {
        return GdprRequestService?.deleteRequests().then(
            (result: any) => {
                return result.items;
            }
        );
    }
);

export const downloadTokenPersonalData = createAsyncThunk(
    "PersonalData/downloadTokenPersonalData",
    async (id: any) => {

        return GdprRequestService?.getRequestsDownloadToken({ id: id }).then(
            (result: any) => {
                return result;
            }
        );
    }
);

export const RequestsData = createAsyncThunk(
    "PersonalData/downloadTokenPersonalData",
    (data: any) => {
        const token = localStorage.getItem("accessToken");
        return fetch(`${localStorage.getItem("REACT_APP_API_URL")}/api/gdpr/requests/data/${data.requestId}?token=${data.token}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then((response: any) => {
            return response
        })
    }
);

const PersonalDataSlice = createSlice({
    name: "PersonalData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(requestPersonalData.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            requestPersonalData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.personalData = action.payload;
                state.error = "";
            }
        );
        builder.addCase(requestPersonalData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(getPersonalData.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            getPersonalData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.personalData = action.payload;
                state.error = "";
            }
        );
        builder.addCase(getPersonalData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(deletePersonalData.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            deletePersonalData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.error = "";
            }
        );
        builder.addCase(deletePersonalData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(downloadTokenPersonalData.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            downloadTokenPersonalData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.downloadData = action.payload;
                state.error = "";
            }
        );
        builder.addCase(downloadTokenPersonalData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });
    }
});
export default PersonalDataSlice.reducer;