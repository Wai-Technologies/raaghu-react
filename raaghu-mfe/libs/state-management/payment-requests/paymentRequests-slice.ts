import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as module from "../../proxy/index";

let PaymentRequestAdminService: any = module.PaymentRequestAdminService;

type InitialState = {
  allPaymentRequests: any;
  paymentRequest: any;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  allPaymentRequests: {},
  paymentRequest: {},
  loading: false,
  error: "",
};

export const getAllPaymentRequests = createAsyncThunk(
  "PaymentRequests/GetAll",
  (data: any) => {
    return PaymentRequestAdminService?.getPaymentRequests({
      filter: data.filter,
      creationDateMax: data.creationDateMax,
      creationDateMin: data.creationDateMin,
      paymentType: data.paymentType,
      status: data.status,
      sorting: data.sorting,
      skipCount: data.skipCount,
      maxResultCount: data.maxResultCount,
    }).then((result: any) => {
      return result;
    });
  }
);

export const getPaymentRequestById = createAsyncThunk(
  "PaymentRequests/GetPaymentRequestById",
  (data: any) => {
    return PaymentRequestAdminService?.getPaymentRequests1(data.id).then(
      (result: any) => {
        return result;
      }
    );
  }
);

const scopeSlice = createSlice({
  name: "PaymentRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPaymentRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllPaymentRequests.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allPaymentRequests = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getAllPaymentRequests.rejected, (state, action) => {
      state.loading = false;
      state.allPaymentRequests = {};
      state.error = action.error.message || "Something Went Wrong";
    });

    builder.addCase(getPaymentRequestById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPaymentRequestById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.paymentRequest = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getPaymentRequestById.rejected, (state, action) => {
      state.loading = false;
      state.paymentRequest = {};
      state.error = action.error.message || "Something Went Wrong";
    });
  },
});

export default scopeSlice.reducer;
