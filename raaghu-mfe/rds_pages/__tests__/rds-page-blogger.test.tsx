import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import Blogger from "../rds-page-blogger/src/blogger/blogger";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Blogger page correctly",()=>{
    render(<Provider store={store}>
        <Blogger/> 
    </Provider>);
    const newBlogText = screen.getAllByText("New Blog")[0];
    expect(newBlogText).toBeInTheDocument();

    const nameText = screen.getAllByText("Blogging.Name")[0];
    expect(nameText).toBeInTheDocument();

    const shortNameText = screen.getAllByText("Blogging.ShortName")[0];
    expect(shortNameText).toBeInTheDocument();
});