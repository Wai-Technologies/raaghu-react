import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import BlogPost from "../rds-page-blogpost/src/blog-post/blog-post";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Blog Post page correctly",()=>{
    render(<Provider store={store}>
        <BlogPost/> 
    </Provider>);
    const newBlogText = screen.getAllByText("CmsKit.NewBlogPost")[0];
    expect(newBlogText).toBeInTheDocument();
});