import React from "react";
import ReactDOM from "react-dom";
import RdsCompBlogPost from "./rds-comp-blog-post";

it("It should mount", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RdsCompBlogPost tableHeaders={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
});