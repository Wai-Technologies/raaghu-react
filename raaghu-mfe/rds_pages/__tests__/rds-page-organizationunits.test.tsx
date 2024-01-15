import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import OrganizationTree from "../rds-page-organizationunits/src/Organization-Tree/Organization-Tree";
import { Provider } from "react-redux";
import {store} from "../../libs/state-management/index";
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    initReactI18next: { type: 'mock' },
  }));
  

it("renders Maintainance page correctly",()=>{
    render(<Provider store={store}>
        <OrganizationTree/> 
    </Provider>);

    // expect(screen.getByTestId("new-language")).toBeInTheDocument();
    // const displayNameText = screen.getAllByText("Display Name");
    // displayNameText.forEach(item=>{
    //     expect(item).toBeInTheDocument();
    // })
});