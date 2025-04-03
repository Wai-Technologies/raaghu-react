import RdsCompAppShell from "../../raaghu-layouts/src/rds-comp-app-shell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppShellDisplayType } from "../../raaghu-layouts/src/rds-comp-app-shell/rds-comp-app-shell";

export * from "../../raaghu-elements/src/index";
export * from "../../raaghu-components/src/index";
export * from "../../raaghu-layouts/src/index";

import "../../raaghu-react-themes/build/styles/default.css";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import DashboardOverview from "./DashboardOverview";


function App() {
  return (
    <div className={"theme-light"}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RdsCompAppShell
                displayType={AppShellDisplayType.Default}
                sidebar={<SideNavigation />}
                topbar={<TopNavigation />}
              />
            }
          >
            <Route index element={<DashboardOverview />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;