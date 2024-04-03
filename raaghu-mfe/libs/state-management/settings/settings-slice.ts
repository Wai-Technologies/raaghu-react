import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { result } from "lodash-es";

let FeaturesService: any;
let AccountSettingsService: any;
let ContactSettingService: any;
let SettingsService: any;
let EmailSettingsService: any;

const module = await import("../../proxy");
if ("FeaturesService" in module) {
    FeaturesService = module.FeaturesService;
}
if ("AccountSettingsService" in module) {
    AccountSettingsService = module.AccountSettingsService;
}
if ("ContactSettingService" in module) {
    ContactSettingService = module.ContactSettingService;
}
if ("SettingsService" in module) {
    SettingsService = module.SettingsService;
}
if ("EmailSettingsService" in module) {
    EmailSettingsService = module.EmailSettingsService;
}

type InitialStateSettings = {
    loading: boolean;
    emailSettings: any;
    accountSettings: any;
    identitySettings: any;
    accountGeneralSettings: any;
    accountTwoFactorSettings: any;
    accountCaptchaSettings: any;
    accountExternalProvider: any;
    identityLdapSettings: any;
    identityOauthSettings: any;
    featureIdentitySettings: any;
    contactSettings: any
    error: any;
    sendTestEmailData: any;
};

export const initialStateSettings: InitialStateSettings = {
    loading: false,
    emailSettings: null,
    accountSettings: null,
    identitySettings: null,
    accountGeneralSettings: null,
    accountTwoFactorSettings: null,
    accountCaptchaSettings: null,
    accountExternalProvider: null,
    identityLdapSettings: null,
    identityOauthSettings: null,
    contactSettings: null,
    featureIdentitySettings: null,
    error: null,
    sendTestEmailData: null
};

// Generates pending, fulfilled and rejected action types
//Email
export const fetchEmailSettings = createAsyncThunk(
    "settings/fetchEmailSettings",
    () => {
        return EmailSettingsService?.getEmailing().then((result: any) => {
            return result;
        });
    }
);

export const saveEmailSettings = createAsyncThunk(
    "settings/saveEmailSettings",
    (formData: any) => {
        return EmailSettingsService?.postEmailing({ requestBody: formData }).then((result: any) => {
            return result;
        });
    }
);
//Identity
export const fetchIdentitySettings = createAsyncThunk(
    "settings/fetchIdentitySettings",
    () => {
        return SettingsService?.getSettings().then((result: any) => {
            return result;
        });
    }
);
export const saveIdentitySettings = createAsyncThunk(
    "settings/saveIdentitySettings",
    (data: any) => {
        return SettingsService?.putSettings({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);
//Account
export const fetchAccountGeneralSettings = createAsyncThunk(
    "settings/fetchAccountGeneralSettings",
    () => {
        return AccountSettingsService?.getSettings().then((result: any) => {
            return result;
        });
    }
);

export const fetchTwoFactorSettings = createAsyncThunk(
    "settings/fetchTwoFactorSettings",
    () => {
        return AccountSettingsService?.getSettingsTwoFactor().then((result: any) => {
            return result;
        });
    }
);

export const fetchCaptchaSettings = createAsyncThunk(
    "settings/fetchCaptchaSettings",
    () => {
        return AccountSettingsService?.getSettingsRecaptcha().then((result: any) => {
            return result;
        });
    }
);

export const fetchExternalProviderSettings = createAsyncThunk(
    "settings/fetchExternalProviderSettings",
    () => {
        return AccountSettingsService?.getSettingsExternalProvider().then((result: any) => {
            return result;
        });
    }
);

export const saveAccountGeneralSettings = createAsyncThunk(
    "settings/saveAccountGeneralSettings",
    (data: any) => {
        return AccountSettingsService?.putSettings({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);

export const saveAccountTwoFactorSettings = createAsyncThunk(
    "settings/saveAccountTwoFactorSettings",
    (data: any) => {
        return AccountSettingsService?.putSettingsTwoFactor({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);

export const saveAccountCaptchaSettings = createAsyncThunk(
    "settings/saveAccountCaptchaSettings",
    (data: any) => {
        return AccountSettingsService?.putSettingsRecaptcha({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);

export const saveAccountExternalProviderSettings = createAsyncThunk(
    "settings/saveAccountExternalProviderSettings",
    (data: any) => {
        return AccountSettingsService?.putSettingsExternalProvider({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);

//ldap
export const fetchLdapSettings = createAsyncThunk("settings/fetchLdapSettings",
    () => {
        return SettingsService?.getSettingsLdap().then((result: any) => {
            return result;
        });
    }
)

export const saveLdapSettings = createAsyncThunk(
    "settings/saveLdapSettings",
    (data: any) => {
        return SettingsService?.putSettingsLdap({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);
//oauth
export const fetchOauthSettings = createAsyncThunk("settings/fetchOauthSettings",
    () => {
        return SettingsService?.getSettingsOauth().then((result: any) => {
            return result;
        });
    }
)

export const saveOauthSettings = createAsyncThunk(
    "settings/saveOauthSettings",
    (data: any) => {
        return SettingsService?.putSettingsOauth({ requestBody: data }).then((result: any) => {
            return result;
        });
    }
);
//Feature Management
export const fetchFeaturesSettings = createAsyncThunk(
    "settings/fetchFeaturesSettings ",
    () => {
        return FeaturesService?.getFeatures({ providerName: "T", providerKey: undefined }).then((result: any) => {
            return result;
        });
    }
);

export const saveFeaturesSettings = createAsyncThunk(
    "settings/saveFeaturesSettings ",
    (data: any) => {

        return FeaturesService?.putFeatures({ providerName: "T", providerKey: undefined, requestBody: data }).then((result: any) => {
            return result;
        });
    }
);

export const restoreToDefaultFeaturesSettings = createAsyncThunk(
    "settings/restoreToDefaultFeaturesSettings",
    (data: any) => {
        return FeaturesService?.deleteFeatures({ providerName: "T", providerKey: undefined })
            .then((result: any) => {
                return result;
            });
    }
);

//Cms
export const fetchContactSettings = createAsyncThunk(
    "settings/fetchContactSettings",
    () => {
        return ContactSettingService?.getContactSettings().then((result: any) => {
            return result;
        });
    }
);

export const saveContactSettings = createAsyncThunk(
    "settings/saveContactSettings",
    (formData: any) => {
        return ContactSettingService?.postContactSettings({ requestBody: formData }).then((result: any) => {
            return result;
        });
    }
);

export const putSendTestEmail = createAsyncThunk(
    "settings/putSendTestEmail",
    (data: any) => {
        return EmailSettingsService?.postEmailingSendTestEmail({ requestBody: data }).then((result: any) => {
            console.log("slice result -", result)
            return result;
        });
    }
);

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialStateSettings,
    reducers: {},
    extraReducers: (builder) => {
        //ldap 
        builder.addCase(fetchLdapSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchLdapSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.identityLdapSettings = action.payload;
            }
        );
        builder.addCase(fetchLdapSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        //Oauth
        builder.addCase(fetchOauthSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchOauthSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.identityOauthSettings = action.payload;
            }
        );
        builder.addCase(fetchOauthSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchEmailSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchEmailSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.emailSettings = action.payload;
            }
        );
        builder.addCase(fetchEmailSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        // save ldap
        builder.addCase(saveLdapSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveLdapSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveLdapSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        // save Oauth
        builder.addCase(saveOauthSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveOauthSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveOauthSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(saveIdentitySettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveIdentitySettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveIdentitySettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(saveEmailSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveEmailSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveEmailSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(fetchIdentitySettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchIdentitySettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.identitySettings = action.payload;
            }
        );
        builder.addCase(fetchIdentitySettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(fetchAccountGeneralSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchAccountGeneralSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.accountGeneralSettings = action.payload;
            }
        );
        builder.addCase(fetchAccountGeneralSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchTwoFactorSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchTwoFactorSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.accountTwoFactorSettings = action.payload;
            }
        );
        builder.addCase(fetchTwoFactorSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(fetchCaptchaSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchCaptchaSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.accountCaptchaSettings = action.payload;
            }
        );
        builder.addCase(fetchCaptchaSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(fetchExternalProviderSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchExternalProviderSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.accountExternalProvider = action.payload;
            }
        );
        builder.addCase(fetchExternalProviderSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(saveAccountGeneralSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveAccountGeneralSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveAccountGeneralSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(saveAccountCaptchaSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveAccountCaptchaSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveAccountCaptchaSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(saveAccountTwoFactorSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveAccountTwoFactorSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveAccountTwoFactorSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(saveAccountExternalProviderSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveAccountExternalProviderSettings.fulfilled,
            (state) => {
                state.loading = false;
            }
        );
        builder.addCase(saveAccountExternalProviderSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(fetchFeaturesSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchFeaturesSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.featureIdentitySettings = action.payload;
            }
        );
        builder.addCase(fetchFeaturesSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(saveFeaturesSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            saveFeaturesSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.featureIdentitySettings = action.payload;
            }
        );
        builder.addCase(saveFeaturesSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(restoreToDefaultFeaturesSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            restoreToDefaultFeaturesSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.featureIdentitySettings = action.payload;
            }
        );
        builder.addCase(
            restoreToDefaultFeaturesSettings.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            }
        );
        //CMS
        builder.addCase(fetchContactSettings.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchContactSettings.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.contactSettings = action.payload;
            }
        );
        builder.addCase(fetchContactSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        //send-test-email
        builder.addCase(putSendTestEmail.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            putSendTestEmail.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.sendTestEmailData = action.payload;
            }
        );

        builder.addCase(putSendTestEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
    },
});

export default settingsSlice.reducer;