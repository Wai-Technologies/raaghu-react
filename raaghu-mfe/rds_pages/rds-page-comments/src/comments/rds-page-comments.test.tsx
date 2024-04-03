import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Comments from "./comments";
import { RdsDatePicker, RdsInput } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

global.location = {
  pathname: "../../../../libs/proxy/core",
} as any;

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("../../../../../raaghu-components/src/index.ts", () => ({
  ...jest.requireActual("../../../../../raaghu-components/src/index.ts"),
}));
jest.mock("../../../../../raaghu-elements/src/index.ts", () => ({
  ...jest.requireActual("../../../../../raaghu-elements/src/index.ts"),
}));
jest.mock("../../../../libs/state-management/index.ts", () => ({
  store: {
    getState: jest.fn().mockReturnValue({
      persistedReducer: {
        configureStore: {
          configuration: {
            auth: {
              grantedPolicies: {},
            },
          },
        },
      },
    }),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

// Mock the rds-elements and rds-components
jest.mock("../../../../../raaghu-elements/src", () => ({
  RdsButton: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsAlert: jest.fn(),
  RdsSearch: jest.fn(),
  RdsModal: jest.fn(),
  RdsInput: jest.fn(),
  RdsDatePicker: jest.fn(),
  RdsDropdown: jest.fn(),

}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsCompModal: jest.fn(),

}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

// Mock localStorage in your test setup
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0, // Add length property
  key: jest.fn(), // Add key method
};

jest.mock('../../../../libs/state-management/Blogs/blogs-slice.ts', () => ({
  fetchBlogsData: jest.fn().mockResolvedValue({
    payload: {
      totalCount: 10,
    },
  }),
}));


global.localStorage = localStorageMock;
describe("Comments", () => {
  it("renders Comments correctly", async () => {
    // Mock the useDispatch hook
    const mockDispatch = jest.fn();
    (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
      payload: {
        totalCount: 10,
      },
    }));

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Comments />
      </Provider>
    );
    document.querySelector('[placeholder="Enter Username"]');
    document.querySelector('[placeholder="Enter Entity Type"]');

    await Promise.resolve();
  });

  it("Check the functionality of the Comment", async () => {
    const dateRangeHandler = jest.fn();
    const onFilterUsername = jest.fn();
    const mockDispatch = jest.fn();
    const onFilterEntityType = jest.fn();
    const onActionSelection = jest.fn();
    const paginationHandler = jest.fn();
    const confirmDelete = jest.fn();
    (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
      payload: {
        totalCount: 10,
      },
    }));

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const comment = render(
      <Provider store={store}>
        <Comments />
        <RdsDatePicker isDropdownOpen={false} customDate={dateRangeHandler} />
        <RdsInput placeholder="Enter Username" onChange={(event) => onFilterUsername(event)} />
        <RdsInput placeholder="Enter Entity Type" onChange={(event) => onFilterEntityType(event)} />
        <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false} onActionSelection={onActionSelection} onPaginationHandler={paginationHandler} />
        <RdsCompAlertPopup alertID={"delete"} onSuccess={confirmDelete} />
      </Provider>
    );
    expect(comment).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
    // Reset localStorage to a new object
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
  });
});