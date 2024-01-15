import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Polls from "../rds-page-polls/src/Polls/Polls";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

it("renders Polls page correctly", () => {
    render(
        <Provider store={store}>
            <Polls />
        </Provider>
    );

    const NewPollText = screen.getAllByText("CmsKit.NewPoll")[0];
    expect(NewPollText).toBeInTheDocument();

    const buttonElements = screen.getAllByRole("button")[0];
    expect(buttonElements).toBeInTheDocument();
});
