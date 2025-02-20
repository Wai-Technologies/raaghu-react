import RdsCompAppShell from "../../raaghu-layouts/src/rds-comp-app-shell";
import { DisplayType } from "../../raaghu-layouts/src/rds-comp-app-shell/rds-comp-app-shell";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export * from "../../raaghu-elements/src/index";
export * from "../../raaghu-components/src/index";
export * from "../../raaghu-layouts/src/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <RdsCompAppShell displayType={DisplayType.Default} />}>
            <Route index element={<h1>Home </h1>} /> {/* Default page */}
            <Route path="dashboard" element={<h1>Dashboard </h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;