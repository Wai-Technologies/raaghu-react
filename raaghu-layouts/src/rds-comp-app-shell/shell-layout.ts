import { AppShellDisplayType } from "./rds-comp-app-shell";




const DefaultCss = `Default`;

const DefaultMobileCss = `DefaultMobile`

export class CssItems {
    mainContent: string = "";
    sideNav: string = "";
    topNav: string = "";
}




export const GetShellLayoutCss = (displayType: AppShellDisplayType) => {
    switch (displayType) {
        case AppShellDisplayType.Default:
            return DefaultCss;
        case AppShellDisplayType.Relaxing:
            return "relaxing";
        case AppShellDisplayType.TopNav:
            return "top-nav";
        case AppShellDisplayType.SideNav:
            return "side-nav";
        case AppShellDisplayType.DoubleNav:
            return "double-nav";
        case AppShellDisplayType.OneThreeOne:
            return "one-three-one";
        default:
            return "default";
    }
}