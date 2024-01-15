import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

let SettingsService: any;
let ConversationService: any;
let ContactService: any;
// Initial data is not loading  because of this async function
// (async () => {
const module = await import("../../proxy");
if ("SettingsService" in module) {
    SettingsService = module.SettingsService;
}
if ("ConversationService" in module) {
    ConversationService = module.ConversationService;
}
if ("ContactService" in module) {
    ContactService = module.ContactService;
}
// })();   

type chatInitialState = {
    loading: boolean;
    contacts: any[];
    conversation: any;
    sendOnEnter: boolean;
    error: string;
    status: "pending" | "loading" | "error" | "success";

};

export const chatInitialState: chatInitialState = {
    loading: false,
    contacts: [],
    conversation: {},
    sendOnEnter: false,
    error: "",
    status: "pending"
};


export const FetchConversation = createAsyncThunk(
    "chats/FetchConversation",
    (data: any) => {
        return ConversationService?.getConversationConversation({ targetUserId: data.targetUserId, skipCount: data.skipCount, maxResultCount: data.maxResultCount })
            .then((result: any) => {
                return result;
            });
    }
);
export const postConversationSendMessage = createAsyncThunk(
    "chats/postConversationSendMessage",
    (data: any) => {
        return ConversationService?.postConversationSendMessage({ requestBody: data })
            .then((result: any) => {
                return result;
            });
    }
);

export const ReadConversationData = createAsyncThunk(
    "chats/ReadConversationData",
    (data: any) => {
        return ConversationService?.postConversationMarkConversationAsRead(data.body)
            .then((result: any) => {
                return result;
            });
    }
);

export const FetchContacts = createAsyncThunk(
    "chats/FetchContacts",
    (data: any) => {
        return ContactService?.getContactContacts({ filter: data.filter, includeOtherContacts: data.includeOtherContacts })
            .then((result: any) => {
                return result;
            });
    }
);

export const enterSendChat = createAsyncThunk(
    "chats/enterSendChat",
    (data: any) => {
        return SettingsService?.postSettingsSendOnEnter({ requestBody: data })
            .then((result: any) => {
                return result;
            });
    }
);

const ChatsSlice = createSlice({
    name: "chats",
    initialState: chatInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(FetchConversation.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            FetchConversation.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.conversation = action.payload;
                state.error = "";
            }
        );
        builder.addCase(FetchConversation.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(postConversationSendMessage.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            postConversationSendMessage.fulfilled,
            (state) => {
                state.status = "success";
                state.error = "";
            }
        );
        builder.addCase(postConversationSendMessage.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(ReadConversationData.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            ReadConversationData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.contacts = action.payload;
                state.error = "";
            }
        );
        builder.addCase(ReadConversationData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(FetchContacts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            FetchContacts.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.contacts = action.payload;
                state.error = "";
            }
        );
        builder.addCase(FetchContacts.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(enterSendChat.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            enterSendChat.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.sendOnEnter = action.payload;
                state.error = "";
            }
        );
        builder.addCase(enterSendChat.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });
    },
});

export default ChatsSlice.reducer;