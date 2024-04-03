import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  configurationService,
  isgrantedpolicies,
} from "../../../../raaghu-react-core/src/index";
import { useAppSelector } from "../../../libs/state-management/hooks";

const PrivateRoute_Auth = () => {
  const currLanguage = useAppSelector(
    (state) => state.persistedReducer.host.currentLanguage || "en"
  );
  const data = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});

  const [permission, setPermission] = useState<boolean>(true);

  useEffect(() => {
    let pagekey = "";
    if (location.pathname == "/") {
      pagekey = "home";
    }

    else if (location.pathname == "/dashboard") {
      pagekey = "abp_react_7_2_2.Dashboard.Host";
    } else if (location.pathname == "/tenant") {
      pagekey = "Saas.Tenants";
    } else if (location.pathname == "/edition") {
      pagekey = "Saas.Editions";
    } else if (location.pathname == "/organization-Unit") {
      pagekey = "AbpIdentity.OrganizationUnits";
    } else if (location.pathname == "/role") {
      pagekey = "AbpIdentity.Roles";
    } else if (location.pathname == "/users") {
      pagekey = "AbpIdentity.Users";
    } else if (location.pathname == "/security-logs") {
      pagekey = "AbpIdentity.SecurityLogs";
    } else if (location.pathname == "/applications") {
      pagekey = "OpenIddictPro.Application";
    } else if (location.pathname == "/scope") {
      pagekey = "OpenIddictPro.Scope";
    } else if (location.pathname == "/language") {
      pagekey = "LanguageManagement.Languages";
    } else if (location.pathname == "/language-text") {
      pagekey = "LanguageManagement.LanguageTexts";
    } else if (location.pathname == "/text-template") {
      pagekey = "TextTemplateManagement.TextTemplates";
    } else if (location.pathname == "/audit-logs") {
      pagekey = "AuditLogging.AuditLogs";
    } else if (location.pathname == "/settings") {
      pagekey = "AbpIdentity.SettingManagement";
    } else if (location.pathname == "/blogger") {
      pagekey = "Blogging.Blog";
    } else if (location.pathname == "/forms") {
      pagekey = "Forms.Form";
    } else if (location.pathname == "/payment-plans") {
      pagekey = "Payment.Plans";
    } else if (location.pathname == "/payment-requests") {
      pagekey = "Payment.PaymentRequests";
    } else if (location.pathname == "/blogs") {
      pagekey = "CmsKit.Blogs";
    } else if (location.pathname == "/blog-post") {
      pagekey = "CmsKit.BlogPosts";
    } else if (location.pathname == "/comments") {
      pagekey = "CmsKit.Comments";
    } else if (location.pathname == "/global-resources") {
      pagekey = "CmsKit.GlobalResources";
    } else if (location.pathname == "/menus") {
      pagekey = "CmsKit.Menus";
    } else if (location.pathname == "/news-letters") {
      pagekey = "CmsKit.Newsletter";
    } else if (location.pathname == "/pages") {
      pagekey = "CmsKit.Pages";
    } else if (location.pathname == "/polls") {
      pagekey = "CmsKit.Poll";
    } else if (location.pathname == "/tags") {
      pagekey = "CmsKit.Tags";
    } else if (location.pathname == "/url-forwarding") {
      pagekey = "CmsKit.UrlShorting";
    } else if (location.pathname == "/chats") {
      pagekey = "Chat.Messaging";
    } else if (location.pathname == "/claim-types") {
      pagekey = "AbpIdentity.ClaimTypes";
    } else if (location.pathname == "/forms-view" || "/forms-preview") {
      pagekey = "Forms.Form";
    } else if (location.pathname == "/file-management") {
      pagekey = "FileManagement.DirectoryDescriptor";
    } else {
      pagekey = "extraCASE";
      setPermission(false);
    }

    const callConfigurationService = async () => {
      try {
        const res = await configurationService(currLanguage);
        const isGranted = isgrantedpolicies(`${pagekey}`, data);
        setPermission(isGranted);
      } catch (error) {
        // handle any errors here
      }
    }

    callConfigurationService();
  }, [currLanguage, location.pathname]);

  return permission ? <Outlet /> : <Navigate to="/pagenotfound" replace />;
};
export default PrivateRoute_Auth;


