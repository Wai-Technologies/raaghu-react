import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import Language from "../rds-page-language/src/language/language";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Language page correctly",()=>{
    render(<Provider store={store}>
        <Language/> 
    </Provider>);

    const displayNameText = screen.getAllByText("LanguageManagement.DisplayName")[0];
   expect(displayNameText).toBeInTheDocument();

    const enableText = screen.getAllByText("Is Enabled")[0];
    expect(enableText).toBeInTheDocument();
    
    const flag = screen.getAllByText("LanguageManagement.FlagIcon")[0];
    expect(flag).toBeInTheDocument();
});