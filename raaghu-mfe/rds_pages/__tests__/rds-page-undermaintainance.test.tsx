import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import UnderMaintainance from "../rds-page-undermaintainance/src/under-maintainance/under-maintainance";
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

it("renders Under Maintainance page co Irrectly", () => {
    render(
        <Provider store={store}>
            <UnderMaintainance />
        </Provider>
    );

    expect(screen.getByText("under-maintainance")).toBeInTheDocument();
});
