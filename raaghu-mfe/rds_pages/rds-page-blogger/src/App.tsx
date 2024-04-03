import React, { Suspense } from "react";
import Blogger from "./blogger/blogger";

const App = () => (
    <Suspense>
        <Blogger></Blogger>
    </Suspense>
);

export default App;
