import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import Applications from "../rds-page-applications/src/applications/applications";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Application page correctly",()=>{
    render(<Provider store={store}>
        <Applications/> 
    </Provider>);

    const newAppicationText = screen.getAllByText("AbpOpenIddict.NewApplication")[0];
    expect(newAppicationText).toBeInTheDocument();

});