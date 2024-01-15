import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ClaimType from "../rds-page-claimtypes/src/Claim-Types/Claim-Type";
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

it("renders Claim Types page correctly", () => {
    render(
        <Provider store={store}>
            <ClaimType />
        </Provider>
    );
    const nameText = screen.getAllByText("AbpIdentity.Name")[0];
    expect(nameText).toBeInTheDocument();

    const valuetypeText = screen.getAllByText("AbpIdentity.ValueType")[0];
    expect(valuetypeText).toBeInTheDocument();

    const descText = screen.getAllByText("AbpIdentity.Description")[0];
    expect(descText).toBeInTheDocument();

    const regexText = screen.getAllByText("AbpIdentity.Regex")[0];
    expect(regexText).toBeInTheDocument();

    const requiredText = screen.getAllByText("AbpIdentity.Required")[0];
    expect(requiredText).toBeInTheDocument();

});
