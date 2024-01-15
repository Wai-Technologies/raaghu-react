import React from "react";
import { useParams, useLocation } from "react-router-dom";
import FormsPreview from "./FormsPreview/FormsPreview";

function App() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    return (
        <FormsPreview id={id}   ></FormsPreview>
    );

}
export default App;
