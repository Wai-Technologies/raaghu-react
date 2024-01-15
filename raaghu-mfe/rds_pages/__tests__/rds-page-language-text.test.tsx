import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import LanguageText from "../rds-page-languageText/src/languageText/languageText";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Language Text page correctly",()=>{
    render(<Provider store={store}>
        <LanguageText  /> 
    </Provider>);
});