import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import PaymentPlans from "../rds-page-paymentPlans/src/paymentPlans/paymentPlans";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";

it("renders Payment Plans page correctly",()=>{
    render(<Provider store={store}>
        <PaymentPlans/> 
    </Provider>);

    const displayNameText = screen.getAllByText("Name")[0];
    expect(displayNameText).toBeInTheDocument();
});