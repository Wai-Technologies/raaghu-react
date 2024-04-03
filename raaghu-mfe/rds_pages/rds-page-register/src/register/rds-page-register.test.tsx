import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../../libs/state-management";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./register";
import RdsCompRegister from "../../../../../raaghu-components/src/rds-comp-register";

// Mock the necessary dependencies or functions used in the component
jest.mock("../../../../../raaghu-components/src/rds-comp-register", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked RdsCompRegister</div>),
}));

// Mock the localStorage getItem method
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

global.localStorage = localStorageMock;

describe("Register Component", () => {

  it("renders Register component correctly", async () => {
    render(
      <Router>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );
  });

it("Check register page functionality", async () => {
  const registerHandler = jest.fn();
  const loginHandler = jest.fn();
  const onClickHandler = jest.fn();
  const languageData = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
  ];
   const register = render(
      <Router>
        <Provider store={store}>
          <Register />
          <RdsCompRegister getvalidTenantName={""} emailAddress={""} password={""} userName={""} appName={""} onRegister={registerHandler} onLogin={loginHandler} onClickHandler={onClickHandler} currentTenant={undefined} validTenant={undefined} languageData={languageData}   />
        </Provider>
      </Router>
    );
    expect(register).toMatchSnapshot();
});

});
