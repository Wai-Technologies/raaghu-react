import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_FileManagement_Files_FileUploadPreInfoRequest } from '../../proxy/index';

import { Volo_FileManagement_Files_MoveFileInput } from '../../proxy/index';

import { Volo_FileManagement_Files_RenameFileInput } from '../../proxy/index';

let FileDescriptorsService: any;
(async () => {
  const module = await import("../../proxy");
  if ("FileDescriptorsService" in module) {
    FileDescriptorsService = module.FileDescriptorsService;
  }
})();

export const getFileDescriptorRequest = createAsyncThunk(
  'filedescriptors/getFileDescriptorRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await FileDescriptorsService.getFileDescriptor({
      id,
    });
    return response;
  }
);

export const postFileDescriptorRequest = createAsyncThunk(
  'filedescriptors/postFileDescriptorRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_FileManagement_Files_RenameFileInput,
  }) => {
    const response = await FileDescriptorsService.postFileDescriptor({
      id,
      requestBody,
    });
    return response;
  }
);

export const deleteFileDescriptorRequest = createAsyncThunk(
  'filedescriptors/deleteFileDescriptorRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await FileDescriptorsService.deleteFileDescriptor({
      id,
    });
    return response;
  }
);

export const getFileDescriptor1Request = createAsyncThunk(
  'filedescriptors/getFileDescriptor1Request',
  async ({
    directoryId,
  }: {
    directoryId?: string,
  }) => {
    const response = await FileDescriptorsService.getFileDescriptor1({
      directoryId,
    });
    return response;
  }
);

export const postFileDescriptorUploadRequest = createAsyncThunk(
  'filedescriptors/postFileDescriptorUploadRequest',
  async ({
    name,
    directoryId,
    extraProperties,
    formData,
  }: {
    name: string,
    directoryId?: string,
    extraProperties?: Record<string, any>,
    formData?: {
      File?: Blob;
    },
  }) => {
    const response = await FileDescriptorsService.postFileDescriptorUpload({
      name,
      directoryId,
      extraProperties,
      formData,
    });
    return response;
  }
);

export const postFileDescriptorMoveRequest = createAsyncThunk(
  'filedescriptors/postFileDescriptorMoveRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_FileManagement_Files_MoveFileInput,
  }) => {
    const response = await FileDescriptorsService.postFileDescriptorMove({
      requestBody,
    });
    return response;
  }
);

export const postFileDescriptorPreUploadInfoRequest = createAsyncThunk(
  'filedescriptors/postFileDescriptorPreUploadInfoRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Array<Volo_FileManagement_Files_FileUploadPreInfoRequest>,
  }) => {
    const response = await FileDescriptorsService.postFileDescriptorPreUploadInfo({
      requestBody,
    });
    return response;
  }
);

export const getFileDescriptorContentRequest = createAsyncThunk(
  'filedescriptors/getFileDescriptorContentRequest',
  async ({
    id,
  }: {
    id?: string,
  }) => {
    const response = await FileDescriptorsService.getFileDescriptorContent({
      id,
    });
    return response;
  }
);

export const getFileDescriptorDownloadTokenRequest = createAsyncThunk(
  'filedescriptors/getFileDescriptorDownloadTokenRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await FileDescriptorsService.getFileDescriptorDownloadToken({
      id,
    });
    return response;
  }
);

export const getFileDescriptorDownloadRequest = createAsyncThunk(
  "FileManagement/fetchFileDownloadDescriptor",
  (data: any) => {
    const token = localStorage.getItem("accessToken");

    return fetch(`${localStorage.getItem("REACT_APP_API_URL")}/api/file-management/file-descriptor/download/${data.id}?token=${data.token}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((response: any) => {
      return response
    })
  }
);

export interface FileDescriptorsState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getFileDescriptor: any;
  editFile: any;

  getFileDescriptor1: any;

  getFileDescriptorContent: any;

  getFileDescriptorDownloadToken: any;

  getFileDescriptorDownload: any;
};


const initialState: FileDescriptorsState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getFileDescriptor: {},
  editFile: null,
  getFileDescriptor1: {},

  getFileDescriptorContent: {},

  getFileDescriptorDownloadToken: {},

  getFileDescriptorDownload: {},
};

const filedescriptorsSlice = createSlice({
  name: "filedescriptors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getFileDescriptorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFileDescriptorRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getFileDescriptor = action.payload
    });
    builder.addCase(getFileDescriptorRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postFileDescriptorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postFileDescriptorRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.editFile = action.payload;

    });
    builder.addCase(postFileDescriptorRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteFileDescriptorRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteFileDescriptorRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteFileDescriptorRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getFileDescriptor1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFileDescriptor1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getFileDescriptor1 = action.payload
    });
    builder.addCase(getFileDescriptor1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postFileDescriptorUploadRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postFileDescriptorUploadRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postFileDescriptorUploadRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postFileDescriptorMoveRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postFileDescriptorMoveRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postFileDescriptorMoveRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(postFileDescriptorPreUploadInfoRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postFileDescriptorPreUploadInfoRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postFileDescriptorPreUploadInfoRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getFileDescriptorContentRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFileDescriptorContentRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getFileDescriptorContent = action.payload
    });
    builder.addCase(getFileDescriptorContentRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getFileDescriptorDownloadTokenRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFileDescriptorDownloadTokenRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getFileDescriptorDownloadToken = action.payload
    });
    builder.addCase(getFileDescriptorDownloadTokenRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getFileDescriptorDownloadRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFileDescriptorDownloadRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getFileDescriptorDownload = action.payload
    });
    builder.addCase(getFileDescriptorDownloadRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default filedescriptorsSlice.reducer;
