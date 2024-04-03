import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let PlanAdminService: any;
// (async () => {
const module = await import("../../proxy");
if ("PlanAdminService" in module) {
    PlanAdminService = module.PlanAdminService;
}
// })();

type InitialState = {
    allPaymentPlans: any,
    paymentPlan: any,
    allGatewayPlans: any;
    gatewayPlan: any,
    loading: boolean,
    error: string,
}

const initialState: InitialState = {
    allPaymentPlans: {},
    paymentPlan: {},
    allGatewayPlans: {},
    gatewayPlan: {},
    loading: false,
    error: "",
};

// Plans
export const getAllPaymentPlans = createAsyncThunk("PaymentPlans/GetAll", (data: any) => {
    return PlanAdminService?.getPlans({ filter: data.filter, sorting: data.sorting, skipCount: data.skipCount, maxResultCount: data.maxResultCount }).then((result: any) => {
        return result;
    });
});

export const createNewPlan = createAsyncThunk("PaymentPlans/CreatePlan", (data: any) => {
    return PlanAdminService?.postPlans({ requestBody: data.body }).then((result: any) => {
        return result;
    });
});

export const deletePlan = createAsyncThunk("PaymentPlans/DeletePlan", (data: any) => {
    return PlanAdminService?.deletePlans({ id: data.id }).then((result: any) => {
        return result;
    });
});

export const getPlanById = createAsyncThunk("PaymentPlans/GetPlanById", (data: any) => {
    return PlanAdminService?.getPlans1({ id: data.id }).then((result: any) => {
        return result;
    });
});

export const updatePlan = createAsyncThunk("PaymentPlans/UpdatePlan", (data: any) => {
    return PlanAdminService?.putPlans({ id: data.id, requestBody: data.body }).then((result: any) => {
        return result;
    });
});

// Gateway Plan
export const createGatewayPlan = createAsyncThunk("PaymentPlans/CreateGatewayPlan", (data: any) => {
    return PlanAdminService?.postPlansExternalPlans({ planId: data.planId, requestBody: data.body }).then((result: any) => {
        return result;
    });
});

export const getAllGatewayPlansByPlanId = createAsyncThunk("PaymentPlans/GetAllGatewayPlansByPlanId", (data: any) => {
    return PlanAdminService?.getPlansExternalPlans({ planId: data.planId, filter: data.filter, sorting: data.sorting, skipCount: data.skipCount, maxResultCount: data.maxResultCount }).then((result: any) => {
        return result;
    });
});

export const deleteGatewayPlan = createAsyncThunk("PaymentPlans/DeleteGatewayPlan", (data: any) => {
    return PlanAdminService?.deletePlansExternalPlans({ planId: data.planId, gateway: data.gateway }).then((result: any) => {
        return result;
    });
});

export const updateGatewayPlan = createAsyncThunk("PaymentPlans/UpdateGatewayPlan", (data: any) => {
    return PlanAdminService?.putPlansExternalPlans({ planId: data.planId, gateway: data.gateway, requestBody: data.body }).then((result: any) => {
        return result;
    });
});

const scopeSlice = createSlice({
    name: "PaymentPlans",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Plans
        builder.addCase(getAllPaymentPlans.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPaymentPlans.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.allPaymentPlans = action.payload;
            state.error = "";
        });
        builder.addCase(getAllPaymentPlans.rejected, (state, action) => {
            state.loading = false;
            state.allPaymentPlans = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(createNewPlan.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createNewPlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(createNewPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(deletePlan.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(deletePlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(getPlanById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPlanById.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.paymentPlan = action.payload;
            state.error = "";
        });
        builder.addCase(getPlanById.rejected, (state, action) => {
            state.loading = false;
            state.paymentPlan = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(updatePlan.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatePlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(updatePlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        // Gateway Plan
        builder.addCase(createGatewayPlan.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createGatewayPlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(createGatewayPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(getAllGatewayPlansByPlanId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllGatewayPlansByPlanId.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.allGatewayPlans = action.payload;
            state.error = "";
        });
        builder.addCase(getAllGatewayPlansByPlanId.rejected, (state, action) => {
            state.loading = false;
            state.allGatewayPlans = {};
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(deleteGatewayPlan.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteGatewayPlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(deleteGatewayPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(updateGatewayPlan.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateGatewayPlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(updateGatewayPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });
    },
});

export default scopeSlice.reducer;