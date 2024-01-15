import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FormService } from '../../proxy/index';
import { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../../proxy/index';

import { Volo_Forms_Forms_CreateFormDto } from '../../proxy/index';

import { Volo_Forms_Forms_FormDto } from '../../proxy/index';

import { Volo_Forms_Forms_FormInviteEmailInputDto } from '../../proxy/index';  

import { Volo_Forms_Forms_FormSettingsDto } from '../../proxy/index';

import { Volo_Forms_Forms_FormWithDetailsDto } from '../../proxy/index';

import { Volo_Forms_Forms_UpdateFormDto } from '../../proxy/index';

import { Volo_Forms_Forms_UpdateFormSettingInputDto } from '../../proxy/index';

import { Volo_Forms_Questions_CreateQuestionDto } from '../../proxy/index';

import { Volo_Forms_Questions_GetQuestionListDto } from '../../proxy/index';

import { Volo_Forms_Questions_QuestionDto } from '../../proxy/index';

import { Volo_Forms_Questions_UpdateQuestionDto } from '../../proxy/index';

import { Volo_Forms_Responses_CreateResponseDto } from '../../proxy/index';

import { Volo_Forms_Responses_FormResponseDto } from '../../proxy/index';

import { Volo_Forms_Responses_QuestionWithAnswersDto } from '../../proxy/index';

import { Volo_Forms_Responses_UpdateResponseDto } from '../../proxy/index';

export const getrequest = createAsyncThunk(
      'form/getrequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.get({
        id,
    });
          return response;
      }
    );

export const postrequest = createAsyncThunk(
      'form/postrequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Forms_Responses_UpdateResponseDto,
    }) => {
          const response = await FormService.post({
        id,
        requestBody,
    });
          return response;
      }
    );

export const deleterequest = createAsyncThunk(
      'form/deleterequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.delete({
        id,
    });
          return response;
      }
    );

export const get1request = createAsyncThunk(
      'form/get1request',
      async ({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await FormService.get1({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const post1request = createAsyncThunk(
      'form/post1request',
      async ({
        formId,
        requestBody,
    }:{
        formId?: string,
        requestBody?: Volo_Forms_Responses_CreateResponseDto,
    }) => {
          const response = await FormService.post1({
        formId,
        requestBody,
    });
          return response;
      }
    );

export const getQuestionsWithAnswersrequest = createAsyncThunk(
      'form/getQuestionsWithAnswersrequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.getQuestionsWithAnswers({
        id,
    });
          return response;
      }
    );

export const getFormDetailsrequest = createAsyncThunk(
      'form/getFormDetailsrequest',
      async ({
        formId,
    }:{
        formId: string,
    }) => {
          const response = await FormService.getFormDetails({
        formId,
    });
          return response;
      }
    );

export const getResponserequest = createAsyncThunk(
      'form/getResponserequest',
      async ({
        userId,
    }:{
        userId: string,
    }) => {
          const response = await FormService.getResponse({
        userId,
    });
          return response;
      }
    );

export const get2request = createAsyncThunk(
      'form/get2request',
      async ({
        input,
    }:{
        input?: Volo_Forms_Questions_GetQuestionListDto,
    }) => {
          const response = await FormService.get2({
        input,
    });
          return response;
      }
    );

export const get3request = createAsyncThunk(
      'form/get3request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.get3({
        id,
    });
          return response;
      }
    );

export const putrequest = createAsyncThunk(
      'form/putrequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Forms_Questions_UpdateQuestionDto,
    }) => {
          const response = await FormService.put({
        id,
        requestBody,
    });
          return response;
      }
    );

export const delete1request = createAsyncThunk(
      'form/delete1request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.delete1({
        id,
    });
          return response;
      }
    );

export const get4request = createAsyncThunk(
      'form/get4request',
      async ({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await FormService.get4({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const post2request = createAsyncThunk(
      'form/post2request',
      async ({
        requestBody,
    }:{
        requestBody?: Volo_Forms_Forms_CreateFormDto,
    }) => {
          const response = await FormService.post2({
        requestBody,
    });
          return response;
      }
    );

export const getResponsesrequest = createAsyncThunk(
      'form/getResponsesrequest',
      async ({
        id,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        id: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await FormService.getResponses({
        id,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const deleteResponsesrequest = createAsyncThunk(
      'form/deleteResponsesrequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.deleteResponses({
        id,
    });
          return response;
      }
    );

export const getDownloadResponsesCsvrequest = createAsyncThunk(
      'form/getDownloadResponsesCsvrequest',
      async ({
        id,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }:{
        id: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }) => {
          const response = await FormService.getDownloadResponsesCsv({
        id,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    });
          return response;
      }
    );

export const getResponsesCountrequest = createAsyncThunk(
      'form/getResponsesCountrequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.getResponsesCount({
        id,
    });
          return response;
      }
    );

export const post3request = createAsyncThunk(
      'form/post3request',
      async ({
        requestBody,
    }:{
        requestBody?: Volo_Forms_Forms_FormInviteEmailInputDto,
    }) => {
          const response = await FormService.post3({
        requestBody,
    });
          return response;
      }
    );

export const get5request = createAsyncThunk(
      'form/get5request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.get5({
        id,
    });
          return response;
      }
    );

export const put1request = createAsyncThunk(
      'form/put1request',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Forms_Forms_UpdateFormDto,
    }) => {
          const response = await FormService.put1({
        id,
        requestBody,
    });
          return response;
      }
    );

export const delete2request = createAsyncThunk(
      'form/delete2request',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.delete2({
        id,
    });
          return response;
      }
    );

export const putSettingsrequest = createAsyncThunk(
      'form/putSettingsrequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Forms_Forms_UpdateFormSettingInputDto,
    }) => {
          const response = await FormService.putSettings({
        id,
        requestBody,
    });
          return response;
      }
    );

export const getSettingsrequest = createAsyncThunk(
      'form/getSettingsrequest',
      async ({
        id,
    }:{
        id: string,
    }) => {
          const response = await FormService.getSettings({
        id,
    });
          return response;
      }
    );

export const getQuestionsrequest = createAsyncThunk(
      'form/getQuestionsrequest',
      async ({
        id,
        input,
    }:{
        id: string,
        input?: Volo_Forms_Questions_GetQuestionListDto,
    }) => {
          const response = await FormService.getQuestions({
        id,
        input,
    });
          return response;
      }
    );

export const postQuestionsrequest = createAsyncThunk(
      'form/postQuestionsrequest',
      async ({
        id,
        requestBody,
    }:{
        id: string,
        requestBody?: Volo_Forms_Questions_CreateQuestionDto,
    }) => {
          const response = await FormService.postQuestions({
        id,
        requestBody,
    });
          return response;
      }
    );

export interface FormState {
  loading: boolean;
  error: string;
  get:any;

get1:any;

getQuestionsWithAnswers:any;

getFormDetails:any;

getResponse:any;

get2:any;

get3:any;

get4:any;

getResponses:any;

getDownloadResponsesCsv:any;

getResponsesCount:any;

get5:any;

getSettings:any;

getQuestions:any;
};


const initialState: FormState = {
  loading: false,
  error: "",
  get:{},

get1:{},

getQuestionsWithAnswers:{},

getFormDetails:{},

getResponse:{},

get2:{},

get3:{},

get4:{},

getResponses:{},

getDownloadResponsesCsv:{},

getResponsesCount:{},

get5:{},

getSettings:{},

getQuestions:{},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.get = action.payload
      });




      builder.addCase(getrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(postrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(postrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(postrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(deleterequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(deleterequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(deleterequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(get1request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(get1request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.get1 = action.payload
      });




      builder.addCase(get1request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(post1request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(post1request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(post1request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getQuestionsWithAnswersrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getQuestionsWithAnswersrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getQuestionsWithAnswers = action.payload
      });




      builder.addCase(getQuestionsWithAnswersrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getFormDetailsrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getFormDetailsrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getFormDetails = action.payload
      });




      builder.addCase(getFormDetailsrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getResponserequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getResponserequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getResponse = action.payload
      });




      builder.addCase(getResponserequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(get2request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(get2request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.get2 = action.payload
      });




      builder.addCase(get2request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(get3request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(get3request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.get3 = action.payload
      });




      builder.addCase(get3request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(putrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(putrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(putrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(delete1request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(delete1request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(delete1request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(get4request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(get4request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.get4 = action.payload
      });




      builder.addCase(get4request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(post2request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(post2request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(post2request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getResponsesrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getResponsesrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getResponses = action.payload
      });




      builder.addCase(getResponsesrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(deleteResponsesrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(deleteResponsesrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(deleteResponsesrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getDownloadResponsesCsvrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getDownloadResponsesCsvrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getDownloadResponsesCsv = action.payload
      });




      builder.addCase(getDownloadResponsesCsvrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getResponsesCountrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getResponsesCountrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getResponsesCount = action.payload
      });




      builder.addCase(getResponsesCountrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(post3request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(post3request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(post3request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(get5request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(get5request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.get5 = action.payload
      });




      builder.addCase(get5request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(put1request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(put1request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(put1request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(delete2request.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(delete2request.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(delete2request.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(putSettingsrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(putSettingsrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(putSettingsrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getSettingsrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getSettingsrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getSettings = action.payload
      });




      builder.addCase(getSettingsrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(getQuestionsrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(getQuestionsrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.getQuestions = action.payload
      });




      builder.addCase(getQuestionsrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });

builder.addCase(postQuestionsrequest.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(postQuestionsrequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

      });




      builder.addCase(postQuestionsrequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default formSlice.reducer;