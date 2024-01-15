import React, { Suspense } from "react";
import BlogPost from "./blog-post/blog-post";

const App = () => (
    <Suspense>
        <BlogPost></BlogPost>
    </Suspense>
);

export default App;
