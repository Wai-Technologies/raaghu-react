import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import * as module from "../../proxy/index";

let FormService: any= module.FormService;

type InitialStateForms = {
loading: boolean;
forms: any;
editForms: any;
formQuestion: any;
formQuestionEdit: any;
error: string;
alert: boolean;
alertMessage: string;
success: boolean;
getSettings: any;
getResponses: any;
getResponsesCount: any;
getResponseWithId: any;
getQuestionWithAnswer: any;
};

export const InitialStateForms: InitialStateForms = {
loading: false,
forms: null,
editForms: null,
formQuestion: null,
formQuestionEdit: null,
error: "",
alert: false,
alertMessage: "",
success: false,
getSettings: null,
getResponses: null,
getResponsesCount: null,
getResponseWithId: null,
getQuestionWithAnswer: null,
};

//effects and actions
export const fetchForms = createAsyncThunk("forms/fetchForms", (data: any) => {
return FormService?.get4({
  filter: data.filter,
  sorting: "id DESC",
  skipCount: data.skipCount,
  maxResultCount: data.maxResultCount,
}).then((result: any) => {
  return result;
});
});

export const deleteForms = createAsyncThunk(
"forms/deleteForms",
(id: string) => {
  return FormService?.delete2({ id }).then((result: any) => {
    return result;
  });
}
);

export const Saveforms = createAsyncThunk("forms/Saveforms", (data: any) => {
return FormService?.post2({ requestBody: data }).then((result: any) => {
  return result;
});
});

export const updateForms = createAsyncThunk(
"forms/updateForms",
(data: any) => {
  return FormService?.put1({ id: data.id, requestBody: data.body }).then(
    (result: any) => {
      return result;
    }
  );
}
);

export const getForms = createAsyncThunk("forms/getForms", (id: string) => {
return FormService?.get5({ id }).then((result: any) => {
  return result;
});
});

//Forms Questions
export const SaveformsQuestions = createAsyncThunk(
"forms/SaveformsQuestions",
(data: any) => {
  const temp = data.body;
  return FormService?.postQuestions({ id: data.id, requestBody: temp }).then(
    (result: any) => {
      return result;
    }
  );
}
);

export const deleteFormsQuestions = createAsyncThunk(
"forms/deleteFormsQuestions",
(id: string) => {
  return FormService?.delete1({ id }).then((result: any) => {
    return result;
  });
}
);

export const updateFormsQuestions = createAsyncThunk(
"forms/updateFormsQuestions",
(data: any) => {
  return FormService?.put({ id: data.id, requestBody: data.body }).then(
    (result: any) => {
      return result;
    }
  );
}
);

export const getFormsQuestionsForEdit = createAsyncThunk(
"forms/getFormsQuestionsForEdit",
(id: string) => {
  return FormService?.get3({ id }).then((result: any) => {
    return result;
  });
}
);

export const getAllFormsQuestions = createAsyncThunk(
"forms/getAllFormsQuestions",
() => {
  return FormService?.get2({ input: undefined }).then((result: any) => {
    return result;
  });
}
);

export const getAll2FormsQuestions = createAsyncThunk(
"forms/getAll2FormsQuestions",
(id: string) => {
  return FormService?.getQuestions({ id: id, input: undefined }).then(
    (result: any) => {
      return result;
    }
  );
}
);
export const updateFormsSettings = createAsyncThunk(
"forms/updateFormsSettings",
(data: any) => {
  return FormService?.putSettings({
    id: data.id,
    requestBody: data.body,
  }).then((result: any) => {
    return result;
  });
}
);
export const getFormsSettings = createAsyncThunk(
"forms/getFormsSettings",
(id: string) => {
  return FormService?.getSettings({ id }).then((result: any) => {
    return result;
  });
}
);

export const postFormsResponse = createAsyncThunk(
"forms/postFormsResponse",
(data: any) => {
  return FormService?.post1({
    formId: data.id,
    requestBody: data.requestBody,
  }).then((result: any) => {
    console.log("resas", result);
    return result;
  });
}
);

//response send
export const SaveFormsSendResponse = createAsyncThunk(
"forms/SaveFormsSendResponse",
(data: any) => {
  return FormService?.post3({ requestBody: data }).then((result: any) => {
    return result;
  });
}
);

export const getFormsResponses = createAsyncThunk(
"forms/getFormsResponses",
(id: string) => {
  return FormService?.getResponses({
    id: id,
    filter: undefined,
    sorting: undefined,
    skipCount: 0,
    maxResultCount: 30,
  }).then((result: any) => {
    return result;
  });
}
);

export const deleteFormsResponses = createAsyncThunk(
"forms/deleteFormsResponses",
(id: string) => {
  return FormService?.deleteResponses({ id }).then((result: any) => {
    return result;
  });
}
);

export const deleteResponse = createAsyncThunk(
"forms/deleteResponse",
(id: string) => {
  return FormService?.delete({ id }).then((result: any) => {
    return result;
  });
}
);

export const getFormsResponsesCount = createAsyncThunk(
"forms/getFormsResponsesCount",
(id: string) => {
  return FormService?.getResponsesCount({ id }).then((result: any) => {
    return result;
  });
}
);

export const getFormResponseWithId = createAsyncThunk(
"forms/getFormResponseWithId",
(id: string) => {
  return FormService?.get({ id }).then((result: any) => {
    return result;
  });
}
);

export const getQuestionWithAnswer = createAsyncThunk(
"forms/getQuestionWithAnswer",
(id: string) => {
  return FormService?.getQuestionsWithAnswers({ id }).then((result: any) => {
    return result;
  });
}
);

export const SaveUpdatedResponse: any = createAsyncThunk(
"forms/SaveUpdatedResponse",
(data: any) => {
  return FormService?.post({ id: data.id, requestBody: data.data }).then(
    (result: any) => {
      return result;
    }
  );
}
);

//reducer
const formsSlice = createSlice({
name: "forms",
initialState: InitialStateForms,
reducers: {},

extraReducers: (builder) => {
  //get
  builder.addCase(fetchForms.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    fetchForms.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.forms = action.payload;
    }
  );

  builder.addCase(fetchForms.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  //delete
  builder.addCase(
    deleteForms.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Form deleted Successfully";
      state.success = true;
    }
  );

  //Save
  builder.addCase(Saveforms.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    Saveforms.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Form added Successfully";
      state.success = true;
    }
  );
  builder.addCase(Saveforms.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  //update
  builder.addCase(updateForms.pending, (state) => {
    state.loading = true;
    state.error = "";
  });

  builder.addCase(
    updateForms.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.alert = true;
      state.alertMessage = "Form edited successfully";
      state.success = true;
    }
  );

  builder.addCase(updateForms.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  //getUpdate
  builder.addCase(getForms.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(getForms.fulfilled, (state, action: PayloadAction<any>) => {
    state.loading = false;
    state.editForms = action.payload;
  });
  builder.addCase(getForms.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Somethingwentwrong";
  });

  //Forms Questions
  builder.addCase(getAll2FormsQuestions.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getAll2FormsQuestions.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.formQuestionEdit = action.payload;
    }
  );

  builder.addCase(getAll2FormsQuestions.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  builder.addCase(getFormsQuestionsForEdit.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getFormsQuestionsForEdit.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.formQuestion = action.payload;
    }
  );

  builder.addCase(getFormsQuestionsForEdit.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  builder.addCase(SaveformsQuestions.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    SaveformsQuestions.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Question added Successfully";
      state.success = true;
    }
  );
  builder.addCase(SaveformsQuestions.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  builder.addCase(
    deleteFormsQuestions.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Question deleted Successfully";
      state.success = true;
    }
  );
  builder.addCase(updateFormsQuestions.pending, (state) => {
    state.loading = true;
    state.error = "";
  });

  builder.addCase(
    updateFormsQuestions.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.alert = true;
      state.alertMessage = "Question edited successfully";
      state.success = true;
    }
  );
  builder.addCase(updateFormsQuestions.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  //settings
  builder.addCase(getFormsSettings.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getFormsSettings.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.getSettings = action.payload;
    }
  );
  builder.addCase(getFormsSettings.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  // Submit Response

  builder.addCase(postFormsResponse.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    postFormsResponse.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Response Submitted Successfully";
      state.success = true;
    }
  );
  builder.addCase(postFormsResponse.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  builder.addCase(updateFormsSettings.pending, (state) => {
    state.loading = true;
    state.error = "";
  });

  builder.addCase(
    updateFormsSettings.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.alert = true;
      state.alertMessage = "Setting edited successfully";
      state.success = true;
    }
  );
  builder.addCase(updateFormsSettings.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  //Save response
  builder.addCase(SaveFormsSendResponse.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    SaveFormsSendResponse.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Response added Successfully";
      state.success = true;
    }
  );
  builder.addCase(SaveFormsSendResponse.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  // Update Response

  builder.addCase(SaveUpdatedResponse.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    SaveUpdatedResponse.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Response added Successfully";
      state.success = true;
    }
  );
  builder.addCase(SaveUpdatedResponse.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something Went Wrong";
    state.alert = true;
    state.alertMessage = "Something Went Wrong";
    state.success = false;
  });

  builder.addCase(getFormsResponses.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getFormsResponses.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.getResponses = action.payload;
    }
  );
  builder.addCase(getFormsResponses.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  builder.addCase(getFormsResponsesCount.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getFormsResponsesCount.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.getResponsesCount = action.payload;
    }
  );
  builder.addCase(getFormsResponsesCount.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  builder.addCase(
    deleteFormsResponses.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Response deleted Successfully";
      state.success = true;
    }
  );

  builder.addCase(
    deleteResponse.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.alert = true;
      state.alertMessage = "Response deleted Successfully";
      state.success = true;
    }
  );

  builder.addCase(getFormResponseWithId.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getFormResponseWithId.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.getResponseWithId = action.payload;
    }
  );
  builder.addCase(getFormResponseWithId.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });

  // getQuestionWithAnswer
  builder.addCase(getQuestionWithAnswer.pending, (state) => {
    state.loading = true;
  });

  builder.addCase(
    getQuestionWithAnswer.fulfilled,
    (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.getQuestionWithAnswer = action.payload;
    }
  );
  builder.addCase(getQuestionWithAnswer.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Something went wrong";
  });
},
});

export default formsSlice.reducer;
