import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RdsCompTopNavigation from "../../raaghu-components/src/rds-comp-top-navigation";
import RdsAlert from "../../raaghu-elements/src/rds-alert";

export * from "../../raaghu-elements/src/index";
export * from "../../raaghu-components/src/index";

function App() {


  const navbarItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <Router>
        <RdsCompTopNavigation navItems={{ title: "Raaghu", size: "medium", navbarItems: navbarItems, activeColor: '#7825E9' }} />

        <div className="ps-5">
          <RdsAlert border="none" description="This is the description of the message bar." dismisable icon="information" displayType="singleline" iconHeight="20px" iconStroke iconWidth="20px" linkUrl="https://example.com" position="top" showDescription showIcon showTitle showbutton showlink showprimarybutton showsecondarybutton size="small" title="Heading Title." type="info" />
        </div>

        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/services" element={<h1>services</h1>} />
          <Route path="/contact" element={<h1>contact</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;