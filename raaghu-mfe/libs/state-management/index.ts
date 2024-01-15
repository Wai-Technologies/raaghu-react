import tagAdminReducer from "./tag-admin/tag-admin-slice";
import fileDescriptorsReducer from "./file-descriptors/file-descriptors-slice";
import directoryDescriptorsReducer from "./directory-descriptors/directory-descriptors-slice";
import auditLogsReducer from "./audit-logs/audit-logs-slice";
import languageTextsReducer from "./language-texts/language-texts-slice";
import pollAdminReducer from "./poll-admin/poll-admin-slice";
import planAdminReducer from "./plan-admin/plan-admin-slice";
import roleReducer from "./role/role-slice";
import organizationUnitReducer from "./organization-unit/organization-unit-slice";
import permissionsReducer from "./permissions/permissions-slice";
import scopesReducer from "./scopes/scopes-slice";
import featuresReducer from "./features/features-slice";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import languagesReducer from "./languages/languages-slice";
import PageNotFoundReducer from "./pagenotfound/pagenotfound-slice";
import formsResponseReducer from "./formsresponse/formsresponse-slice";
import HomeReducer from "./home/home-slice";
import logoutReducer from "./logout/logout-slice";
import registerReducer from "./register/register-slice";
import blogPostReducer from "./blog-post/blog-post-slice";
import pagesReducer from "./pages/pages-slice";
import { forgotPasswordReducer } from "./forgot-password/forgotpassword-slice";
import editionReducer from "./edition/edition-slice";
import { subscriptionReducer } from "./subscription/subscription-slice";
import languageTextReducer from "./language-text/language-text-slice";
import organizationReducer from "./organization-tree/organization-tree-slice";
import rolesReducer from "./role/role-slice";
import ClaimTypeReducer from "./claim-type/claim-type-slice";
import securityLogsReducer from "./security-logs/security-logs-slice";
import userReducer from "./user/user-slice";
import settingsReducer from "./settings/settings-slice";
import FileManagementReducer from "./file-management/file-management-slice";
import hostReducer from "./host/host-slice";
import applicationsReducer from "./applications/applications-slice";
import urlForwardingReducer from "./url-forwarding/url-forwarding-slice";
import textTemplateReducer from "./text-template/text-template-slice";
import tenantReducer from "./tenant/tenant-slice";
import chatsReducer from "./chats/chats-slice";
import bloggerReducer from "./blogger/blogger-slice";
import formsReducer from "./forms/forms-slice";
import paymentPlansReducer from "./payment-plans/paymentPlans-slice";
import personalDataReducer from "./personal-data/personal-data-slice";
import commentsReducer from "./comments/comments-slice";
import tagsReducer from "./tags/tags-slice";
import myAccountReducer from "./my-account/my-account-slice";
import paymentRequestsReducer from "./payment-requests/paymentRequests-slice";
import newslettersReducer from "./newsletters/newsletters-slice";
import pollsReducer from "./polls/polls-slice";
import globalResourcesReducer from "./global-resources/globalResources-slice";
import menusReducer from "./menus/menus-slice";
import blogsReducer from "./Blogs/blogs-slice";
import configureReducer from "./config/config-slice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["forgotPassword"],
};
const rootReducer = combineReducers({
    tagAdmin: tagAdminReducer,
    fileDescriptors: fileDescriptorsReducer,
    directoryDescriptors: directoryDescriptorsReducer,
    auditLogs: auditLogsReducer,
    languageTexts: languageTextsReducer,
    pollAdmin: pollAdminReducer,
    planAdmin: planAdminReducer,
    role: roleReducer,
    organizationUnit: organizationUnitReducer,
    permissions: permissionsReducer,
    features: featuresReducer,
    languages: languagesReducer,
    configureStore: configureReducer,
    PageNotFound: PageNotFoundReducer,
    formsResponse: formsResponseReducer,
    Home: HomeReducer,
    Logout: logoutReducer,
    register: registerReducer,
    blogPost: blogPostReducer,
    pages: pagesReducer,
    forgotPassword: forgotPasswordReducer,
    subscription: subscriptionReducer,
    edition: editionReducer,
    languagesText: languageTextReducer,
    organization: organizationReducer,
    roles: rolesReducer,
    claimTypes: ClaimTypeReducer,
    securityLogs: securityLogsReducer,
    applications: applicationsReducer,
    scopes: scopesReducer,
    textTemplate: textTemplateReducer,
    auditLog: auditLogsReducer,
    user: userReducer,
    settings: settingsReducer,
    tenant: tenantReducer,
    chats: chatsReducer,
    blogger: bloggerReducer,
    forms: formsReducer,
    fileManagement: FileManagementReducer,
    paymentPlans: paymentPlansReducer,
    urlForwarding: urlForwardingReducer,
    personalData: personalDataReducer,
    comments: commentsReducer,
    tags: tagsReducer,
    host: hostReducer,
    myaccount: myAccountReducer,
    paymentRequests: paymentRequestsReducer,
    polls: pollsReducer,
    globalResources: globalResourcesReducer,
    newsletters: newslettersReducer,
    menus: menusReducer,
    blogs: blogsReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: { persistedReducer },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
