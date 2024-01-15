import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let AuditLogsService: any;
(async () => {
const module = await import("../../proxy");
if ("AuditLogsService" in module) {
    AuditLogsService = module.AuditLogsService;
}
})();

type initialState = {
    loading: boolean;
    audits: { items: any[], totalCount: number | null };
    entityChange: { items: any[], totalCount: number | null };
    entityChangesTableData: { items: any[], totalCount: number | null };
    entityChangesFullHistoryTableData: { items: any[], totalCount: number | null };
    error: string;
};

const initialState: initialState = {
    loading: false,
    audits: { items: [], totalCount: null },
    entityChange: { items: [], totalCount: null },
    entityChangesTableData: { items: [], totalCount: null },
    entityChangesFullHistoryTableData: { items: [], totalCount: null },
    error: "",
};


export const fetchAuditLogsData = createAsyncThunk("audit/fetchAuditLogsData", (data: any) => {
    return AuditLogsService?.getAuditLogs(data).then((result: any) => {
        return result;
    })
});

export const auditActionData = createAsyncThunk(
    "audit/auditActionData",
    (id: any) => {
        return AuditLogsService?.getAuditLogs1({ id: id }).then((result: any) => {
            return result;
        });
    }
);

export const fetchEntityChanges = createAsyncThunk("audit/fetchEntityChanges", (data: any) => {
    return AuditLogsService?.getAuditLogsEntityChanges(data).then((result: any) => {
        return result;
    })
});

export const entityActionData = createAsyncThunk(
    "audit/entityActionData",
    (entityChangeId: any) => {
        return AuditLogsService?.getAuditLogsEntityChangeWithUsername({ entityChangeId: entityChangeId }).then((result: any) => {
            console.log("slice file data:-", result)
            return result;
        });
    }
);

export const entityFullActionData = createAsyncThunk(
    "audit/entityFullActionData",
    (data: any) => {
        return AuditLogsService?.getAuditLogsEntityChangesWithUsername({ entityId: data.entityId, entityTypeFullName: data.entityTypeFullName }).then((result: any) => {
            console.log("slice file two:-", result)
            return result;
        });
    }
);

const auditSlice = createSlice({
    name: "audit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuditLogsData.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchAuditLogsData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.audits = { items: action.payload.items, totalCount: action.payload.totalCount };
                state.error = "";
            }
        );

        builder.addCase(fetchAuditLogsData.rejected, (state, action) => {
            state.loading = false;
            state.audits = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(auditActionData.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            auditActionData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.audits = { items: action.payload.items, totalCount: action.payload.totalCount };
                state.error = "";
            }
        );

        builder.addCase(auditActionData.rejected, (state, action) => {
            state.loading = false;
            state.audits = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(fetchEntityChanges.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchEntityChanges.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.entityChange = action.payload;
                state.error = "";
            }
        );

        builder.addCase(fetchEntityChanges.rejected, (state, action) => {
            state.loading = false;
            state.entityChange = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(
            entityActionData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.entityChangesTableData = { items: action.payload.entityChange.propertyChanges, totalCount: action.payload.totalCount };
                state.error = "";
            }
        );

        builder.addCase(entityActionData.rejected, (state, action) => {
            state.loading = false;
            state.entityChangesTableData = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(
            entityFullActionData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.entityChangesFullHistoryTableData = { items: action.payload[0].entityChange.propertyChanges, totalCount: action.payload.totalCount };
                state.error = "";
            }
        );

        builder.addCase(entityFullActionData.rejected, (state, action) => {
            state.loading = false;
            state.entityChangesFullHistoryTableData = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });
    },
});

export default auditSlice.reducer;
