import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Tags from "../rds-page-tags/src/tags/tags";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

it("renders Tags page correctly", () => {
    render(
        <Provider store={store}>
            <Tags />
        </Provider>
    );

    const entityTypeText = screen.getAllByText("CmsKit.EntityType")[0];
    expect(entityTypeText).toBeInTheDocument();

    const nameText = screen.getAllByText("CmsKit.Name")[0];
    expect(nameText).toBeInTheDocument();

    const newTagText = screen.getAllByText("CmsKit.NewTag")[0];
    expect(newTagText).toBeInTheDocument();
});
