import React, { Suspense } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import {
  DashboardCompo,
  TenantCompo,
  EditionCompo,
  SettingsCompo,
  UsersCompo,
  AuditlogsCompo,
  RolesCompo,
  OrganizationUnitsCompo,
  LanguageCompo,
  LanguageTextCompo,
  IconListCompo,
  ClaimTypesCompo,
  ApplicationsCompo,
  TextTemplateCompo,
  ApiScopeCompo,
  SecurityLogsCompo,
  ChatsCompo,
  FileManagementCompo,
  FormsCompo,
  BloggerCompo,
  ClientCompo,
  PollsCompo,
  UrlForwardingCompo,
  PaymentPlansCompo,
  BlogsCompo,
  FormsViewCompo,
  FormsPreviewCompo,
  CommentsCompo,
  TagsCompo,
  ElementsCompo,
  PersonalDataCompo,
  PaymentRequestsCompo,
  MenusCompo,
  MyAccountCompo,
  ComponentsCompo,
  PagesCompo,
  BlogPostCompo,
  GlobalResourcesCompo,
  NewslettersCompo,
  ChartCompo,
  HomeCompo,
  PageNotFoundCompo,
  LinkedAccountsCompo,
  AuthorityDelegationCompo,
} from "./PageComponent";
import PrivateRoute_Auth from "./PrivateRoute_Auth";



export interface MainRoutes {
  isImpersonation?: any;
}

const MainRoutes = (props: MainRoutes) => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomeCompo />} />
          <Route path="/dashboard" element={<DashboardCompo />}></Route>
          {props.isImpersonation && (
            <Route path="/dashboard" element={<DashboardCompo />}></Route>
          )}
          <Route path="" element={<PrivateRoute_Auth />}>
            <Route path="/authority-delegation" element={<AuthorityDelegationCompo />} />
            <Route path="/linked-accounts" element={<LinkedAccountsCompo />} />
            <Route path="/tenant" element={<TenantCompo></TenantCompo>}></Route>
            <Route
              path="/edition"
              element={<EditionCompo></EditionCompo>}
            ></Route>
            <Route
              path="/organization-Unit"
              element={<OrganizationUnitsCompo></OrganizationUnitsCompo>}
            ></Route>
            <Route path="/role" element={<RolesCompo></RolesCompo>}></Route>
            <Route path="/users" element={<UsersCompo />}></Route>
            <Route
              path="/security-logs"
              element={<SecurityLogsCompo />}
            ></Route>
            <Route path="/applications" element={<ApplicationsCompo />}></Route>
            <Route path="/scope" element={<ApiScopeCompo />} />
            <Route
              path="/language"
              element={<LanguageCompo></LanguageCompo>}
            ></Route>
            <Route
              path="/language-text"
              element={<LanguageTextCompo></LanguageTextCompo>}
            ></Route>
            <Route
              path="/text-template"
              element={<TextTemplateCompo />}
            ></Route>
            <Route
              path="/audit-logs"
              element={<AuditlogsCompo></AuditlogsCompo>}
            ></Route>
            <Route
              path="/settings"
              element={<SettingsCompo></SettingsCompo>}
            ></Route>
            <Route path="/blogger" element={<BloggerCompo />} />
            <Route path="/forms" element={<FormsCompo />} />
            <Route path="/payment-plans" element={<PaymentPlansCompo />} />
            <Route
              path="/payment-requests"
              element={<PaymentRequestsCompo />}
            />
            <Route path="/blogs" element={<BlogsCompo />} />
            <Route path="/blog-post" element={<BlogPostCompo />} />
            <Route path="/comments" element={<CommentsCompo />} />
            <Route
              path="/global-resources"
              element={<GlobalResourcesCompo />}
            />
            <Route path="/menus" element={<MenusCompo />} />
            <Route path="/news-letters" element={<NewslettersCompo />} />
            <Route path="/pages" element={<PagesCompo />} />
            <Route path="/polls" element={<PollsCompo />} />
            <Route path="/tags" element={<TagsCompo />} />
            <Route path="/url-forwarding" element={<UrlForwardingCompo />} />
            <Route path="/chats" element={<ChatsCompo />} />

            <Route path="/icons" element={<IconListCompo />}></Route>
            <Route path="/claim-types" element={<ClaimTypesCompo />} />
            <Route path="/file-management" element={<FileManagementCompo />} />
            <Route path="/forms/forms-view/:id" element={<FormsViewCompo />} />
            <Route path="/forms-preview" element={<FormsPreviewCompo />} />
            <Route path="/Client" element={<ClientCompo />} />
            <Route path="/elements/:type" element={<ElementsCompo />} />
            <Route path="/personal-data" element={<PersonalDataCompo />} />
            <Route path="/my-account" element={<MyAccountCompo />} />
            <Route path="/components/:type" element={<ComponentsCompo />} />
            <Route path="/charts/:type" element={<ChartCompo />} />
          </Route>
          <Route path="*" element={<PageNotFoundCompo />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default MainRoutes;
