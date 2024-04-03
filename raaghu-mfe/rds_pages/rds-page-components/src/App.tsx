import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import Components from "./components/components";

const App = () => {
    const { type } = useParams();
    return (
        <>
            <Suspense>
                <Components type={type}></Components>
            </Suspense>
            ;
        </>
    );
};
export default App;
