import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Maintainance from "../rds-page-maintainance/src/Maintainance/Maintainance";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

it("renders Maintainance page correctly", () => {
    render(
        <Provider store={store}>
            <Maintainance />
        </Provider>
    );

    const displayNameText = screen.getAllByText("Clear All")[0];
    expect(displayNameText).toBeInTheDocument();
});
