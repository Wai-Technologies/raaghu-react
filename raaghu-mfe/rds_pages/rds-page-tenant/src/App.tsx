import React, { Suspense, useEffect, useState } from "react";
import Tenant from "./tenant/tenant";

const App = () => {
    return (
        <Suspense>
            <Tenant></Tenant>
        </Suspense>
    );
};

export default App;
