import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import Auditlogs from "../rds-page-auditLogs/src/Auditlogs/Auditlogs";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Audit Logs page correctly",()=>{
    render(<Provider store={store}>
        <Auditlogs/> 
    </Provider>);
   const code =(screen.getAllByText("Search Status Code"))[0];
    expect(code).toBeInTheDocument();
});