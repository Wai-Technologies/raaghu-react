import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Volo_CmsKit_Admin_Tags_TagCreateDto } from '../../proxy/index';

import { Volo_CmsKit_Admin_Tags_TagUpdateDto } from '../../proxy/index';

let TagAdminService: any;
(async () => {
  const module = await import("../../proxy");
  if ("TagAdminService" in module) {
    TagAdminService = module.TagAdminService;
  }
})();

export const postTagsRequest = createAsyncThunk(
  'tagadmin/postTagsRequest',
  async ({
    requestBody,
  }: {
    requestBody?: Volo_CmsKit_Admin_Tags_TagCreateDto,
  }) => {
    const response = await TagAdminService.postTags({
      requestBody,
    });
    return response;
  }
);

export const getTagsRequest = createAsyncThunk(
  'tagadmin/getTagsRequest',
  async ({
    filter,
    sorting,
    skipCount,
    maxResultCount,
  }: {
    filter?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  }) => {
    const response = await TagAdminService.getTags({
      filter,
      sorting,
      skipCount,
      maxResultCount,
    });
    return response;
  }
);

export const deleteTagsRequest = createAsyncThunk(
  'tagadmin/deleteTagsRequest',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await TagAdminService.deleteTags({
      id,
    });
    return response;
  }
);

export const getTags1Request = createAsyncThunk(
  'tagadmin/getTags1Request',
  async ({
    id,
  }: {
    id: string,
  }) => {
    const response = await TagAdminService.getTags1({
      id,
    });
    return response;
  }
);

export const putTagsRequest = createAsyncThunk(
  'tagadmin/putTagsRequest',
  async ({
    id,
    requestBody,
  }: {
    id: string,
    requestBody?: Volo_CmsKit_Admin_Tags_TagUpdateDto,
  }) => {
    const response = await TagAdminService.putTags({
      id,
      requestBody,
    });
    return response;
  }
);

export const getTagsTagDefinitionsRequest = createAsyncThunk(
  'tagadmin/getTagsTagDefinitionsRequest',
  async () => {
    const response = await TagAdminService.getTagsTagDefinitions();
    return response;
  }
);

export interface TagAdminState {
  loading: boolean;
  error: string;
  alert: boolean;
  alertMessage: string;
  getTags: any;

  getTags1: any;

  getTagsTagDefinitions: any;
};


const initialState: TagAdminState = {
  loading: false,
  error: "",
  alert: false,
  alertMessage: "",
  getTags: {},

  getTags1: {},

  getTagsTagDefinitions: {},
};

const tagadminSlice = createSlice({
  name: "tagadmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(postTagsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(postTagsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(postTagsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTagsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTagsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTags = action.payload
    });
    builder.addCase(getTagsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(deleteTagsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTagsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(deleteTagsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTags1Request.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTags1Request.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTags1 = action.payload
    });
    builder.addCase(getTags1Request.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(putTagsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(putTagsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

    });
    builder.addCase(putTagsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(getTagsTagDefinitionsRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTagsTagDefinitionsRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.getTagsTagDefinitions = action.payload
    });
    builder.addCase(getTagsTagDefinitionsRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default tagadminSlice.reducer;
