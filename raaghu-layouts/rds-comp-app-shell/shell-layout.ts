import { AppShellDisplayType } from "./rds-comp-app-shell";

const DefaultCss = `Default`;

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
        case AppShellDisplayType.TriPane:
            return "triPane";
        default:
            return "default";
    }
}