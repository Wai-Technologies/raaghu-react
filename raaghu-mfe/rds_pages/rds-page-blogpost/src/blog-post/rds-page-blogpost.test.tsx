import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import BlogPost from "./blog-post";
import configureMockStore from "redux-mock-store";
import { RdsOffcanvas, RdsSearch } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompBlogPostNew, RdsCompDatatable } from "../../../rds-components";

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
    
  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn(),
    RdsCompBlogPostNew:jest.fn(),
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
describe("Application page", () => {
it("renders Blog Post page correctly",()=>{
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
        <BlogPost/> 
    </Provider>);
 document.querySelector('[placeholder="Search"]');
 document.querySelector('[button="CmsKit.NewBlogPost"]');

});

it("check the element and component in Blog Post page",()=>{
  const handlerCloseOffcanvas = jest.fn();
  const postPublishHandler = jest.fn();
  const postDraftHandler = jest.fn();
  const handlerPublish = jest.fn();
  const deleteHandler = jest.fn();
  const handlerDraft = jest.fn();
  const handlerActionSelection = jest.fn();
  const paginationHandler = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const blogPost = render(<Provider store={store}>
      <BlogPost/> 
      <RdsSearch placeholder={"Search"} size={"small"} />
      <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"blog-post-add-off"} canvasTitle={"CmsKit.BlogPosts"} onClose={handlerCloseOffcanvas}/>
      <RdsCompBlogPostNew isEdit={false} onPublish={postPublishHandler} onDraft={postDraftHandler}/>
      <RdsCompAlertPopup alertID={"blogsPost_delete_off"} onSuccess={deleteHandler}/>
      <RdsCompAlertPopup alertID={"publish"} onSuccess={handlerPublish}/>
      <RdsCompAlertPopup alertID={"draft"} onSuccess={handlerDraft}/>
      <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false}  onActionSelection={handlerActionSelection} onPaginationHandler={paginationHandler}/>
  </Provider>);
  expect(blogPost).toMatchSnapshot();
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
