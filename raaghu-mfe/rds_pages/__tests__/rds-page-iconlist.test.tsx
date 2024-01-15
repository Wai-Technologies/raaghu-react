import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import IconList from "../rds-page-iconlist/src/iconlist/iconlist";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

describe("RdsPageIconList", () => {
    it("renders search input", () => {
        render(
            <Provider store={store}>
                <IconList />
            </Provider>
        );
    });
    
});
