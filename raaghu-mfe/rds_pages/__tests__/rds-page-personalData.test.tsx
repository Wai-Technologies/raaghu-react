import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import PersonalData from "../rds-page-personaldata/src/personal-data/personal-data";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Personal Data page correctly",()=>{
    render(<Provider store={store}>
        <PersonalData/> 
    </Provider>);

    var data =(screen.getAllByText("AbpGdpr.RequestPersonalData"))[0];
    expect(data).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
});