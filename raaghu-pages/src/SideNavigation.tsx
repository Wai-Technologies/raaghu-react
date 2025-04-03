import { RdsSideNav } from "../../raaghu-elements/src";
import {
  NavLayout,
  NavType,
  Platform,
} from "../../raaghu-elements/src/rds-side-nav/rds-side-nav";

const SideNavigation = () => {
  return (
    <RdsSideNav
      layout="LeftSideNav"
      logo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
      navLayout={NavLayout.Raaghu}
      navType={NavType.Expanded}
      platform={Platform.SideNavigationABPList}
      showUserProfile={false}
      sideNavItems={[
        {
          icon: "home",
          key: "0",
          label: "Home",
          path: "/dashboard",
        },
        {
          icon: "dashboard",
          key: "1",
          label: "Dashboard",
          path: "",
        },
        {
          icon: "tenant",
          key: "2",
          label: "Saas",
          path: "",
          children: [],
        },
        {
          icon: "administration",
          key: "3",
          label: "Administration",
          path: "",
          children: [],
        },
        {
          icon: "folder",
          key: "4",
          label: "File Management",
          path: "",
        },
        {
          icon: "forms",
          key: "5",
          label: "Forms",
          path: "",
        },
        {
          icon: "payment",
          key: "6",
          label: "Payment",
          path: "",
          children: [],
        },
        {
          icon: "cms",
          key: "7",
          label: "CMS",
          path: "",
          children: [],
        },
      ]}
    />
  );
};

export default SideNavigation;