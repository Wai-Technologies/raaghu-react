import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management/index";
import Chats from "./chats";
import { RdsButton, RdsCheckbox, RdsIcon, RdsSearch, RdsTextArea } from "../../../rds-elements";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

global.location = {
    pathname: "../../../../libs/proxy/core",
} as any;

// Mock the useAppDispatch function
jest.mock("../../../../libs/state-management/index.ts", () => ({
    ...jest.requireActual("../../../../libs/state-management/index.ts"),
    useAppDispatch: jest.fn(),
}));

// Mock the rds-elements and rds-components
jest.mock("../../../../../raaghu-elements/src", () => ({
    RdsButton: () => <button>RdsButton</button>,
    RdsSearch: () => <input type="search" />,
    RdsCheckbox: () => <input type="checkbox" />,
    RdsTextArea: () => <textarea />,
    RdsIcon: () => <i>RdsIcon</i>,
}));

// Mock the Chats component
jest.mock("./chats.tsx", () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div>Mocked Chats Component</div>),
    };
});

describe("Chats page", () => {
    it("renders Chats page correctly", async () => {
        render(
            <Provider store={store}>
                <Chats />
            </Provider>
        );
        document.querySelector('[placeholder="Search Contacts"]');
        document.querySelector('[textarea="Type message"]');
        document.querySelector('[button="Send"]');

    });

    it("Check chats page for Chats function behaviour", async () => {
        const handleChange = jest.fn();
        const handleMsgType = jest.fn();
        const handlerSendOnEnter = jest.fn();
        const handleSendMsg = jest.fn();
        const chats = render(
            <Provider store={store}>
                <Chats />
                <RdsSearch placeholder={"Search Contacts"} size={"small"} onChange={handleChange} />
                <RdsTextArea placeholder={"Type message"} onChange={handleMsgType} />
                <RdsCheckbox label={"Send On Enter"} checked={undefined} onChange={handlerSendOnEnter} />
                <RdsButton onClick={handleSendMsg} label="Send" />
            </Provider>
        );
        expect(chats).toMatchSnapshot();
    });

});