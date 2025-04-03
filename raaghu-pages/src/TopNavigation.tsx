import { RdsCompTopNavigation } from "../../raaghu-components/src";

const TopNavigation = () => {
  return (
    <RdsCompTopNavigation
      brandLogo="assets/Raaghu-logo-mfe-black.png"
      brandName="Raaghu"
      languageItems={[
        {
          icon: "us",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "EN",
          val: "en",
        },
        {
          icon: "in",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "English(IND)",
          val: "en",
        },
        {
          icon: "us",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "French",
          val: "fr",
        },
      ]}
      logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
      navbarSubTitle=""
      navbarTitle=""
      notifications={[
        {
          selected: false,
          state: 1,
          status: "success",
          time: "a month ago",
          title: "Tenant added",
          urlTitle: "hello",
          userNotificationId: 0,
        },
        {
          selected: false,
          state: 1,
          status: "error",
          time: "a month ago",
          title: "Tenant deleted",
          urlTitle: "hello",
          userNotificationId: 1,
        },
        {
          selected: false,
          state: 1,
          status: "warn",
          time: "a month ago",
          title: "Tenant added  warn",
          urlTitle: "hello",
          userNotificationId: 2,
        },
        {
          selected: false,
          state: 1,
          status: "info",
          time: "a month ago",
          title: "Tenant deleted info",
          urlTitle: "hello",
          userNotificationId: 3,
        },
      ]}
      profileEmail="jane.doe@raaghu.io"
      profileName="Jane Doe"
      profileTitle="Jane Doe"
      role="Designation"
      style="ABP"
      themeItems={[
        {
          icon: "sun",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "Light",
          val: "light",
        },
        {
          icon: "moon",
          iconHeight: "20px",
          iconWidth: "20px",
          label: "Dark",
          val: "dark",
        },
      ]}
      onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
        console.log("Forgot password clicked");
      }}
      onProfileLinkTopNav={function (
        id: string,
        navigateTo?: string,
        label?: string
      ): void {
        console.log("Profile link clicked", id, navigateTo, label);
      }}
    />
  );
};

export default TopNavigation;