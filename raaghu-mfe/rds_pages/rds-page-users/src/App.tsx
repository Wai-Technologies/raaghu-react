import React, { Suspense } from "react";
import Users from "./users/users";

const App = () => (
    <Suspense>
        <Users></Users>
    </Suspense>
);

export default App;
