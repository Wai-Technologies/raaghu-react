import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Blogs from "../rds-page-blogs/src/blogs/blogs";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

it("renders Blogs page correctly", () => {
    render(
        <Provider store={store}>
            <Blogs />
        </Provider>
    );
    const nameText = screen.getAllByText("CmsKit.Name")[0];
    expect(nameText).toBeInTheDocument();
    const slugText = screen.getAllByText("CmsKit.Slug")[0];
    expect(slugText).toBeInTheDocument();
});
