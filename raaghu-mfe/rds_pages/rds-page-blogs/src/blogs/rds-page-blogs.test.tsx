import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import Blogs from "./blogs";
import { store } from "../../../../libs/state-management";
import { RdsAlert, RdsButton, RdsInput, RdsNavtabs, RdsOffcanvas } from "../../../rds-elements";
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
    RdsNavtabs: jest.fn(),
  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
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
  describe("Blogs page", () => {
it("renders Blogs page correctly", async() => {
        // Mock the useDispatch hook
    const mockDispatch = jest.fn();
    // Update the mock implementation to return a Promise
    (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
      payload: {
        totalCount: 10,
      },
    }));

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Blogs />
        </Provider>
    );
    document.querySelector('[button="CmsKit.NewBlog"]');
    document.querySelector('[placeholder="Enter Name"]');
    document.querySelector('[label="Enter Slug"]');
    document.querySelector('[button="AbpUi.Save"]');

    await Promise.resolve();
});

it("Check functionality of elements and components", async() => {
  const setNameInput = jest.fn();
  const setSlugInput = jest.fn();
  const mockDispatch = jest.fn();
  const onResetOffcanvas = jest.fn();
  const addDataHandler = jest.fn();
  const paginationHandler = jest.fn();
  const handlerActionSelection = jest.fn();
  const editDataHandler = jest.fn();
  const deleteHandler = jest.fn();
  // Update the mock implementation to return a Promise
  (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
    payload: {
      totalCount: 10,
    },
  }));
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const blog = render(<Provider store={store}>
    <Blogs />
    <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"blog-add-off"} canvasTitle={"CmsKit.NewBlog"} />
    <RdsButton  onClick={() => {setNameInput("");setSlugInput("");}} label="CmsKit.NewBlog"/>
    <RdsInput placeholder="Enter Name" label="CmsKit.Name"/>
    <RdsInput placeholder="Enter Slug" label="CmsKit.Slug"/>
    <RdsButton  onClick={() => {setNameInput("");setSlugInput("");onResetOffcanvas(); }} label="AbpUi.Cancel"/>
    <RdsButton  onClick={addDataHandler} label="AbpUi.Save"/>
    <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false}  onPaginationHandler={paginationHandler}  onActionSelection={handlerActionSelection}/>
    <RdsAlert alertmessage={""} colorVariant={""} />
    <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"blogs-edit-off"} canvasTitle={"Edit Blog"} />
    <RdsNavtabs navtabsItems={[{ label: "Basics", id: "0" }]} type={"tabs"} />
    <RdsButton onClick={editDataHandler} label="AbpUi.Save"/>
    <RdsCompAlertPopup alertID={"blogs-delete-off"}  onSuccess={deleteHandler}/>
</Provider>
);
expect(blog).toMatchSnapshot();
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