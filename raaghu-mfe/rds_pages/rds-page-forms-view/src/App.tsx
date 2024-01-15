import React, { Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import FormsView from "./FormsView/FormsViews";

function App() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    return (
        <FormsView ></FormsView>
    );

}
export default App;
