import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import Polls from "./Polls";
import { RdsButton, RdsNavtabs, RdsOffcanvas, RdsProgressBar } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompPollsOption, RdsCompPollsQuestion } from "../../../rds-components";

// Mock lodash-es directly in the test file
jest.mock("lodash-es", () => ({
  filter: jest.fn(),
  forEach: jest.fn(),
}));

global.location = {
    pathname: "../../../../libs/proxy/core",
  } as any;
  

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
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
  RdsNavtabs: jest.fn(),
  RdsCheckbox: jest.fn(),
  RdsIcon: jest.fn(),
  RdsInput: jest.fn(),
  RdsDatePicker: jest.fn(),
  RdsProgressBar: jest.fn(),
}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsCompProfilePicture: jest.fn(),
  RdsCompPersonalInfo: jest.fn(),
  RdsCompChangePassword: jest.fn(),
  RdsCompOrganizationTree: jest.fn(),
  RdsCompUserRoles: jest.fn(),
  RdsCompPollsOption: jest.fn(),
  RdsCompPollsQuestion: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureMockStore();

// Mock localStorage in your test setup
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0, // Add length property
  key: jest.fn(), // Add key method
};

global.localStorage = localStorageMock;
describe("polls page", () => {
  it("renders polls page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Polls />
      </Provider>
    );
    document.querySelector('[label="CmsKit.NewPoll"]');
    document.querySelector('[button="AbpUi.Save"]');
    document.querySelector('[button="AbpUi.Cancel"]');

  });

it("Check polls page functions", () => {
    const mockDispatch = jest.fn();
    const handlerCloseOffcanvas = jest.fn();
    const navtabsItems = {
      label: "CmsKit.NewPoll",
      onClick: jest.fn(),
    };
    const setActiveNavTabId = jest.fn();
    const setQuestionData = jest.fn();
    const getPollsOptionData = jest.fn();
    const handleAddNewPoll = jest.fn();
    const scopeSelection = jest.fn();
    const paginationHandler = jest.fn();
    const tableHeaders = {
      label: "CmsKit.Question",
      key: "question",
      type: "text",
      sortable: true,
    };
    const onResetEditOffcanvas = jest.fn();
    const navtabsItemsEdit = {
      label: "CmsKit.NewPoll",
      onClick: jest.fn(),
    };
    const getPollsEditOptionData = jest.fn();
    const editPollsOptionData = jest.fn();
    const editDataHandler = jest.fn();
    const deleteHandler = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const polls = render(
      <Provider store={store}>
        <Polls />
        <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"polls-add-new"} canvasTitle={"CmsKit.NewPoll"}  onClose={handlerCloseOffcanvas}/>
        <RdsButton label="CmsKit.NewPoll" />
        <RdsNavtabs navtabsItems={[{ ...navtabsItems, id: "some-id" }]} type={"tabs"} activeNavtabOrder={(activeNavTabId) => {setActiveNavTabId(activeNavTabId);}}/>
        <RdsCompPollsQuestion getPollsQuestion={(data: any) => {setQuestionData(data)}}/>
        <RdsCompPollsOption getPollsOptionData={getPollsOptionData}/>
        <RdsButton label="AbpUi.Cancel" onClick={handlerCloseOffcanvas}/>
        <RdsButton label="AbpUi.Save" onClick={handleAddNewPoll}/>
        <RdsCompDatatable tableHeaders={[{ ...tableHeaders, displayName: "Table Header", datatype: "string" }]} tableData={[]} pagination={false} onActionSelection={scopeSelection} onPaginationHandler={paginationHandler}/>
        <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"poll-edit-off"} canvasTitle={"Edit Poll"}  onClose={onResetEditOffcanvas}/>
        <RdsNavtabs navtabsItems={[{ ...navtabsItemsEdit, id: "some-id" }]} type={"tabs"} />
        <RdsCompPollsOption optionsData={editPollsOptionData} getPollsOptionData={getPollsEditOptionData} />
        <RdsButton label="AbpUi.Cancel" onClick={onResetEditOffcanvas}/>
        <RdsButton label="AbpUi.Save" onClick={editDataHandler}/>
        <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"show-result-off"} canvasTitle={"CmsKit.Results"} />
        <RdsProgressBar colorVariant={"primary"} progressWidth={0} role={"single"} />
        <RdsButton label="AbpUi.Cancel" onClick={onResetEditOffcanvas}/>
        <RdsCompAlertPopup alertID="poll-delete-off" onSuccess={deleteHandler}/>
      </Provider>
    );
    expect(polls).toMatchSnapshot();
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
