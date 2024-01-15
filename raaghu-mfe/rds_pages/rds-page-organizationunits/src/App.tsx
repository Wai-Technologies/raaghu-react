import React, { Suspense, useEffect, useState } from "react";
import OrganizationTree from "./Organization-Tree/Organization-Tree";

const App = () => {
    return (
        <Suspense>
            <OrganizationTree></OrganizationTree>
        </Suspense>
    );
};
export default App;