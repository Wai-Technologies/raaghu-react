import { DisplayType } from "./rds-comp-app-shell";




const DefaultCss = `Default`;

const DefaultMobileCss = `DefaultMobile`

export class CssItems {
    mainContent: string = "";
    sideNav: string = "";
    topNav: string = "";
}




export const GetShellLayoutCss = (displayType: DisplayType) => {
    switch (displayType) {
        case DisplayType.Default:
            return DefaultCss;
        case DisplayType.Relaxing:
            return "relaxing";
        case DisplayType.TopNav:
            return "top-nav";
        case DisplayType.SideNav:
            return "side-nav";
        case DisplayType.DoubleNav:
            return "double-nav";
        case DisplayType.OneThreeOne:
            return "one-three-one";
        default:
            return "default";
    }
}