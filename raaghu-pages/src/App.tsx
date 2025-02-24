import RdsCompAppShell from '../../raaghu-layouts/src/rds-comp-app-shell';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DisplayType, RdsButton, RdsOffcanvas } from '../../raaghu-layouts/src/rds-comp-app-shell/rds-comp-app-shell';

export * from "../../raaghu-elements/src/index";
export * from "../../raaghu-components/src/index";
export * from "../../raaghu-layouts/src/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RdsCompAppShell displayType={DisplayType.Default} />}>
            <Route index element={<h1>Home </h1>} /> {/* Default page */}
            <Route path="dashboard" element={<div className="container mt-4">
              {/* Row 1 */}
              <div className="row">
                <div className="col-lg-8">
                  <div className="card p-3 h-100">
                  <RdsOffcanvas
                      backDrop="static"
                      canvasTitle="Offcanvas Title"
                      offId="canvasExample"
                      offcanvasbutton={<RdsButton aria-controls="canvasExample" colorVariant="primary" data-bs-target="#canvasExample" data-bs-toggle="offcanvas" label="Button" size="medium" type="button" />}
                      offcanvaswidth={650}
                      placement="end" scrolling={false}/>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="card p-3 h-100">Sales</div>
                    </div>
                    <div className="col-12">
                      <div className="card p-3 h-100">Profit Share</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="card p-3 h-100">Call Overview</div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 h-100">Daily Sales Growth</div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 h-100">Maximum Profit</div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="row mt-3">
                <div className="col-12">
                  <div className="card p-3 h-100">Member Activity</div>
                </div>
              </div>
            </div>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;