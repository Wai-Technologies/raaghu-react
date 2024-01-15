
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import Charts from "./chart/chart";

const App = () => {
    const { type } = useParams();
    return (
        <>
            <Suspense>
                <Charts type={type}></Charts>
            </Suspense>
            ;
        </>
    );
};
export default App;
