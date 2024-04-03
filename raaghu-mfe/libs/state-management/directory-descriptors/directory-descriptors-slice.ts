import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as module from "../../proxy/index";

let DirectoryDescriptorsService: any = module.DirectoryDescriptorsService;

export const getDirectoryDescriptorRequest = createAsyncThunk(
  "directorydescriptors/getDirectoryDescriptorRequest",
  async ({ id }: { id: string }) => {
    const response = await DirectoryDescriptorsService.getDirectoryDescriptor({
      id,
    });
    return response;
  }
);

export const postDirectoryDescriptorRequest = createAsyncThunk(
  "directorydescriptors/postDirectoryDescriptorRequest",
  async ({
    id,
    requestBody,
  }: {
    id: string;
    requestBody?: module.Volo_FileManagement_Directories_RenameDirectoryInput;
  }) => {
    const response = await DirectoryDescriptorsService.postDirectoryDescriptor({
      id,
      requestBody,
    });
    return response;
  }
);

export const deleteDirectoryDescriptorRequest = createAsyncThunk(
  "directorydescriptors/deleteDirectoryDescriptorRequest",
   ({ id }: { id: string }) => {
    const response =
       DirectoryDescriptorsService.deleteDirectoryDescriptor({ id});
    return response;
  }
);

export const getDirectoryDescriptorSubDirectoriesRequest = createAsyncThunk(
  "directorydescriptors/getDirectoryDescriptorSubDirectoriesRequest",
  async ({ parentId }: { parentId?: string }) => {
    const response =
      await DirectoryDescriptorsService.getDirectoryDescriptorSubDirectories({
        parentId,
      });
    return response;
  }
);

export const postDirectoryDescriptor1Request = createAsyncThunk(
  "directorydescriptors/postDirectoryDescriptor1Request",
  async ({
    requestBody,
  }: {
    requestBody?: module.Volo_FileManagement_Directories_CreateDirectoryInput;
  }) => {
    const response = await DirectoryDescriptorsService.postDirectoryDescriptor1(
      {
        requestBody,
      }
    );
    return response;
  }
);

export const getDirectoryDescriptor1Request = createAsyncThunk(
  "directorydescriptors/getDirectoryDescriptor1Request",
  async ({
    filter,
    id,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    filter?: string;
    id?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
  }) => {
    const response = await DirectoryDescriptorsService.getDirectoryDescriptor1({
      filter,
      id,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const postDirectoryDescriptorMoveRequest = createAsyncThunk(
  "directorydescriptors/postDirectoryDescriptorMoveRequest",
  async ({
    requestBody,
  }: {
    requestBody?: module.Volo_FileManagement_Directories_MoveDirectoryInput;
  }) => {
    const response =
      await DirectoryDescriptorsService.postDirectoryDescriptorMove({
        requestBody,
      });
    return response;
  }
);

export interface DirectoryDescriptorsState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getDirectoryDescriptor: any;
  moveDirectory: any;
  getDirectoryDescriptorSubDirectories: any;

  getDirectoryDescriptor1: any;
}

const initialState: DirectoryDescriptorsState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  moveDirectory: null,
  getDirectoryDescriptor: {},

  getDirectoryDescriptorSubDirectories: {},

  getDirectoryDescriptor1: {},
};

const directorydescriptorsSlice = createSlice({
  name: "directorydescriptors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDirectoryDescriptorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDirectoryDescriptorRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.getDirectoryDescriptor = action.payload;
      }
    );
    builder.addCase(getDirectoryDescriptorRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(postDirectoryDescriptorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postDirectoryDescriptorRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(
      postDirectoryDescriptorRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(deleteDirectoryDescriptorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteDirectoryDescriptorRequest.fulfilled,
      (state,) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(
      deleteDirectoryDescriptorRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(
      getDirectoryDescriptorSubDirectoriesRequest.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      getDirectoryDescriptorSubDirectoriesRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.getDirectoryDescriptorSubDirectories = action.payload;
      }
    );
    builder.addCase(
      getDirectoryDescriptorSubDirectoriesRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(postDirectoryDescriptor1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postDirectoryDescriptor1Request.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(
      postDirectoryDescriptor1Request.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(getDirectoryDescriptor1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getDirectoryDescriptor1Request.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
        state.getDirectoryDescriptor1 = action.payload;
      }
    );
    builder.addCase(
      getDirectoryDescriptor1Request.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );

    builder.addCase(postDirectoryDescriptorMoveRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postDirectoryDescriptorMoveRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(
      postDirectoryDescriptorMoveRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      }
    );
  },
});

export default directorydescriptorsSlice.reducer;
