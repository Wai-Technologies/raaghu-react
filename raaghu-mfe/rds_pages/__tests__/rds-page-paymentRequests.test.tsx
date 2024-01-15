import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import PaymentRequests from "../rds-page-paymentRequests/src/paymentRequests/paymentRequests";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Payment Requests page correctly",()=>{
    render(<Provider store={store}>
        <PaymentRequests/> 
    </Provider>);
 });