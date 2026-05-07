import { AppShellDisplayType } from "./rds-comp-app-shell";
import { GetShellLayoutCss } from "./shell-layout";

describe("GetShellLayoutCss", () => {
  it("returns Default class for Basic layout", () => {
    expect(GetShellLayoutCss(AppShellDisplayType.Basic)).toBe("Default");
  });

  it("returns top-nav class for Header layout", () => {
    expect(GetShellLayoutCss(AppShellDisplayType.Header)).toBe("top-nav");
  });
});
