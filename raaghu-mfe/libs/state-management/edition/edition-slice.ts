import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../state-management/hooks";

let FeaturesService: any;
let EditionService: any;
let BlogFeatureAdminService: any;

const module = await import("../../proxy");
if ("FeaturesService" in module) {
  FeaturesService = module.FeaturesService;
}
if ("BlogFeatureAdminService" in module) {
  BlogFeatureAdminService = module.BlogFeatureAdminService;
}
if ("EditionService" in module) {
  EditionService = module.EditionService;
}

type InitialState = {
  loading: boolean;
  users: { items: any[], totalCount: number | null };
  error: string;
  alert: boolean;
  alertMessage: string;
  success: boolean;
  featureIdentitySettings: any;
  getEditionsAll: any;
};

const initialState: InitialState = {
  loading: false,
  users: { items: [], totalCount: null },
  error: "",
  alert: false,
  alertMessage: "",
  success: false,
  featureIdentitySettings: null,
  getEditionsAll: {}
};

export const fetchEditionData = createAsyncThunk(
  "edition/fetchEditionData",
  (data: any) => {
    return EditionService?.getEditions1({ filter: data.filter, sorting: "id DESC", skipCount: data.skipCount, maxResultCount: data.maxResultCount }).then((result: any) => {
      return result;
    });
  }
);

export const deleteEditionData = createAsyncThunk(
  "edition/deleteEditionData",
  (id: string) => {
    return EditionService?.deleteEditions({ id: id }).then((result: any) => {
      return result;
    });
  }
);

export const addEditionData = createAsyncThunk(
  "edition/addEditionData",
  (value: any) => {
    return EditionService?.postEditions(value).then((result: any) => {
      return result;
    });
  }
);

export const editEditionData = createAsyncThunk(
  "edition/editEditionData",
  ({ id, dTo }: { id: any; dTo: any }) => {
    return EditionService?.putEditions({ id: id, requestBody: dTo }).then((result: any) => {
      return result;
    });
  }
);

export const fetchFeaturesEdition = createAsyncThunk(
  "edition/fetchFeaturesEdition",
  (id: any) => {
    return FeaturesService?.getFeatures({ providerName: "E", providerKey: id }).then((result: any) => {
      return result;
    });
  }
);

export const getEditionsAll = createAsyncThunk(
  'editions/all',
  async () => {
    const response = await EditionService.getEditionsAll();
    return response;
  }
);

export const putEditionsMoveAllTenants = createAsyncThunk(
  'edition/putEditionsMoveAllTenants',
  async ({
    id,
    editionId,
  }: {
    id?: string,
    editionId?: string,
  }) => {
    const response = await EditionService.putEditionsMoveAllTenants({
      id,
      editionId,
    });
    return response;
  }
);

export const saveFeaturesEdition = createAsyncThunk(
  "edition/saveFeaturesEdition",
  (data: any) => {
    return FeaturesService.putFeatures({ providerName: "E", providerKey: data.id, requestBody: data.body }).then((result: any) => {
      return result;
    });
  }
)

export const restoreToDefaultFeaturesEdition = createAsyncThunk(
  "edition/restoreToDefaultFeaturesEdition",
  (id: any) => {
    return FeaturesService?.deleteFeatures({ providerName: "E", providerKey: id }).then((result: any) => {
      return result;
    });
  }
);

const editionSlice: any = createSlice({
  name: "edition",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEditionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchEditionData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = { items: action.payload.items, totalCount: action.payload.totalCount };
        state.error = "";
      }
    );
    builder.addCase(fetchEditionData.rejected, (state, action) => {
      state.loading = false;
      state.users = { items: [], totalCount: null },
        state.error = action.error.message || "Something Went Wrong";
    });

    builder.addCase(deleteEditionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteEditionData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
        state.alert = true;
        state.alertMessage = "Edition deleted Successfully";
        state.success = true;
      }
    );
    builder.addCase(deleteEditionData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Unable to delete Edition, It is in use by tenants.";
      state.alert = true;
      state.alertMessage = "Unable to delete Edition, It is in use by tenants.";
      state.success = false;
    });

    builder.addCase(addEditionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addEditionData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = { items: action.payload.items, totalCount: action.payload.totalCount };
        state.error = "";
        state.alert = true;
        state.alertMessage = "Edition added Successfully";
        state.success = true;
      }
    );
    builder.addCase(addEditionData.rejected, (state, action) => {
      state.loading = false;
      state.users = { items: [], totalCount: null },
        state.error = action.error.message || "Something Went Wrong";
      state.alert = true;
      state.alertMessage = "Something Went Wrong";
      state.success = false;
    });

    builder.addCase(editEditionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editEditionData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = { items: action.payload.items, totalCount: action.payload.totalCount };
        state.error = "";
        state.alert = true;
        state.alertMessage = "Edition edited successfully";
        state.success = true;
      }
    );
    builder.addCase(editEditionData.rejected, (state, action) => {
      state.loading = false;
      state.users = { items: [], totalCount: null },
        state.error = action.error.message || "Something Went Wrong";
      state.alert = true;
      state.alertMessage = "Something Went Wrong";
      state.success = false;
    });

    builder.addCase(fetchFeaturesEdition.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchFeaturesEdition.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.featureIdentitySettings = action.payload;
      }
    );
    builder.addCase(fetchFeaturesEdition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(saveFeaturesEdition.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      saveFeaturesEdition.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.featureIdentitySettings = action.payload;
      }
    );
    builder.addCase(saveFeaturesEdition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(restoreToDefaultFeaturesEdition.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      restoreToDefaultFeaturesEdition.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.featureIdentitySettings = action.payload;
        state.error = "";
        state.alert = true;
        state.alertMessage = "Reseted to default";
        state.success = true;
      }
    );
    builder.addCase(
      restoreToDefaultFeaturesEdition.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something Went Wrong";
        state.alert = true;
        state.alertMessage = "Something Went Wrong";
        state.success = false;
      }
    );

    builder.addCase(getEditionsAll.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getEditionsAll = action.payload;
    });

    builder.addCase(getEditionsAll.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getEditionsAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(putEditionsMoveAllTenants.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putEditionsMoveAllTenants.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "All tenant are moved in respective edition";
      state.success = true;

    });

    builder.addCase(putEditionsMoveAllTenants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

  },
});

export default editionSlice.reducer;
