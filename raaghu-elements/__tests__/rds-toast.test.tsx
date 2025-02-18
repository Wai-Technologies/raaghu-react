import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RdsToast, { RdsToastProps } from "../src/rds-toast/rds-toast";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  
describe("RdsToast", () => {
    const props: RdsToastProps = {
        colorVariant: "primary",
        withIcon: true,
        headerTitle: "Header Title",
        message: "Toast message",
        delay: 3000,
        autohide: true,
        borderColor: "danger",
        showHeader: true,
        iconName: "check",
        state:"success",
        layout:"padded"
    };


    it("renders the component without icon", () => {
    /*  render(<RdsToast {...props} withIcon={false} />);
     expect(screen.getByRole('alert')).toBeInTheDocument();
     expect(screen.getByText(props.headerTitle)).toBeInTheDocument();
     expect(screen.getByText(props.message)).toBeInTheDocument();
     expect(screen.queryByTestId('rds-icon')).toBeNull(); */
        render(<RdsToast {...props} withIcon={false} />);
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText(props.headerTitle!)).toBeInTheDocument(); //using non-null assertion operator
        expect(screen.getByText(props.message!)).toBeInTheDocument(); //using non-null assertion operator
        expect(screen.queryByTestId("rds-icon")).toBeNull();
    });

    it("renders with header and message", () => {
        const props = {
            headerTitle: "Header",
            message: "Message",
            showHeader: true,
            state:"success",
            layout:"padded"
        };
        const { getByText } = render(<RdsToast {...props} />);
        expect(getByText(props.headerTitle)).toBeInTheDocument();
        expect(getByText(props.message)).toBeInTheDocument();
    });

    test("renders toast header and message correctly", () => {
        const { getByRole, getByText } = render(
            <RdsToast
                colorVariant="success"
                headerTitle="Header Title"
                message="This is a test message"
                showHeader={true}
                 state="basic"
                layout="text"
            />
        );
        const toastContainer = getByRole("alert");
        const toastHeader = getByText("Header Title");
        const toastMessage = getByText("This is a test message");
        expect(toastContainer).toBeInTheDocument();
        expect(toastHeader).toBeInTheDocument();
        expect(toastMessage).toBeInTheDocument();
    });

    test("renders toast message without header", () => {
        const { getByRole, getByText, queryByText } = render(
            <RdsToast
                colorVariant="success"
                message="This is a test message"
                showHeader={false} headerTitle={""}  state="basic"
                layout="text"/>
        );
        const toastContainer = getByRole("alert");
        const toastHeader = queryByText("Header Title");
        const toastMessage = getByText("This is a test message");
        expect(toastContainer).toBeInTheDocument();
        expect(toastHeader).toBeNull();
        expect(toastMessage).toBeInTheDocument();
    });

});



