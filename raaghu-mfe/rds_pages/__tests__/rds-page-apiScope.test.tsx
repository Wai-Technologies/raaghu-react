import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import ApiScope from "../rds-page-apiScope/src/apiScope/apiScope";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Api Scope page correctly",()=>{
    render(<Provider store={store}>
        <ApiScope/> 
    </Provider>);
    const nameText = screen.getAllByText("AbpOpenIddict.Name")[0];
    expect(nameText).toBeInTheDocument();

    const displayNameText = screen.getAllByText("AbpOpenIddict.DisplayName")[0];
    expect(displayNameText).toBeInTheDocument();

    const descText = screen.getAllByText("AbpOpenIddict.Description")[0];
    expect(descText).toBeInTheDocument();
});