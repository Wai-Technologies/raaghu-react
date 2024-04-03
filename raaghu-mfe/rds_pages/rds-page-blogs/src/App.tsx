import React, { Suspense } from "react";
import Blogs from "./blogs/blogs";

const App = () => (
    <Suspense>
        <Blogs></Blogs>
    </Suspense>
);

export default App;
