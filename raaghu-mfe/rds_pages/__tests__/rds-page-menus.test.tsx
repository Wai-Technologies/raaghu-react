import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import Menus from "../rds-page-menus/src/menus/menus";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Maintainance page correctly",()=>{
    render(<Provider store={store}>
        <Menus/> 
    </Provider>);

    var menu = (screen.getAllByText("NEW ROOT MENU"))[0];
    expect(menu).toBeInTheDocument();
    // const displayNameText = screen.getAllByText("Display Name");
    // displayNameText.forEach(item=>{
    //     expect(item).toBeInTheDocument();
    // })
});