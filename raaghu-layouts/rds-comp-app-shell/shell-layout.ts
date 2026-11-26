import { AppShellDisplayType } from "./shell-types";

const ROOT = "rds-comp-app-shell";

/**
 * Root BEM modifier classes of the shell. The old bare classes (`Default`, `default`,
 * `relaxing`, `top-nav`, `TopNav`, `side-nav`, `double-nav`, `triPane`) are kept as
 * deprecated selector aliases in `rds-comp-app-shell.scss` for one minor.
 */
const ShellLayoutCss = {
    default: `${ROOT}--default`,
    relaxing: `${ROOT}--relaxing`,
    topNav: `${ROOT}--top-nav`,
    sideNav: `${ROOT}--side-nav`,
    doubleNav: `${ROOT}--double-nav`,
    triPane: `${ROOT}--tri-pane`,
} as const;

export const GetShellLayoutCss = (displayType?: AppShellDisplayType) => {
    switch (displayType) {
        case AppShellDisplayType.Default:
            return ShellLayoutCss.default;
        case AppShellDisplayType.Relaxing:
            return ShellLayoutCss.relaxing;
        case AppShellDisplayType.TopNav:
            return ShellLayoutCss.topNav;
        case AppShellDisplayType.SideNav:
            return ShellLayoutCss.sideNav;
        case AppShellDisplayType.DoubleNav:
            return ShellLayoutCss.doubleNav;
        case AppShellDisplayType.TriPane:
            return ShellLayoutCss.triPane;
        default:
            return ShellLayoutCss.default;
    }
}
