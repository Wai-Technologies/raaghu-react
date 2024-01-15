import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let PollAdminService: any;
(async () => {
    const module = await import("../../proxy");
    if ("PollAdminService" in module) {
        PollAdminService = module.PollAdminService;
    }
})();

type pollsInitialState = {
    loading: boolean,
    error: string,
    polls: any,
    resultData: any,
    pollsEdit: any,
    alert: boolean;
    alertMessage: string;
    success: boolean;
}

const PollsInitialState: pollsInitialState = {
    loading: false,
    polls: null,
    resultData: null,
    pollsEdit: null,
    error: "",
    alert: false,
    alertMessage: "",
    success: false,
};

export const fetchPolls = createAsyncThunk("Polls/fetchPolls", (data: any) => {
    return PollAdminService?.getPoll({ filter: undefined, sorting: undefined, skipCount: data.skipCount, maxResultCount: data.maxResultCount }).then((result: any) => {

        console.log("result", result);
        return result;
    });
});

export const SavePolls = createAsyncThunk("Polls/SavePolls", (data: any) => {
    return PollAdminService?.postPoll({ requestBody: data }).then((result: any) => {
        return result;
    });
});

export const deletePolls = createAsyncThunk("Polls/deletePolls", (id: any) => {
    return PollAdminService?.deletePoll({ id: id }).then((result: any) => {
        return result;
    });
});

export const Widgets = createAsyncThunk("Polls/Widgets", () => {
    return PollAdminService?.getPollWidgets().then((result: any) => {
        return result;
    });
});

export const getPollDataById = createAsyncThunk("Polls/getPollDataById", (id: any) => {
    return PollAdminService?.getPoll1({ id: id }).then((result: any) => {
        return result;
    });
});

export const resultData = createAsyncThunk("Polls/resultData", (id: any) => {
    return PollAdminService?.getPollResult({ id: id }).then((result: any) => {
        return result;
    });
});

export const UpdatePollsData = createAsyncThunk("Polls/UpdatePollsData", (data: any) => {
    return PollAdminService?.putPoll({ id: data.id, requestBody: data.body }).then((result: any) => {
        return result;
    });
});

const PollsSlice = createSlice({
    name: "polls",
    initialState: PollsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPolls.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPolls.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.polls = action.payload;

        });
        builder.addCase(resultData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resultData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.resultData = action.payload;

        });
        builder.addCase(deletePolls.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deletePolls.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
            state.alert = true;
            state.alertMessage = "Data deleted Successfully";
            state.success = true;
        });
        builder.addCase(deletePolls.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(SavePolls.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(SavePolls.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.alert = true;
            state.alertMessage = "Data added Successfully";
            state.success = true;

        });
        builder.addCase(SavePolls.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(Widgets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(Widgets.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.alert = true;
            state.alertMessage = "Data copied successfully";
            state.success = true;
        });
        builder.addCase(Widgets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(UpdatePollsData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdatePollsData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
            state.alert = true;
            state.alertMessage = "Data edited successfully";
            state.success = true;
        });
        builder.addCase(UpdatePollsData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(getPollDataById.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.pollsEdit = action.payload;
            state.error = "";
        });
        builder.addCase(getPollDataById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(getPollDataById.pending, (state) => {
            state.loading = true;
        });
    },
});

export default PollsSlice.reducer;