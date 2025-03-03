import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsToast, { RdsToastProps, ToastLayout, ToastLeadingIcon, ToastPosition, ToastState } from "../src/rds-toast/rds-toast";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("RdsToast", () => {
    const props: RdsToastProps = {
        state: ToastState.Basic,
        headerText: "Toast Headline",
        showSubText: true,
        subText: "This is a big sample placeholder text.",
        colorVariant: "light",
        showHeader: true,
        showLeading: true,
        leadingIcon: ToastLeadingIcon.Circle,
        borderColor: "primary",
        layout: ToastLayout.Text,
        position: ToastPosition.TopLeft,
        progressWidth: 40,
        filename: "Filename.txt",
        placeholder: "Placeholder Text",
        showDismiss: true,
    };

    it("renders the component without icon", () => {
    /*  render(<RdsToast {...props} withIcon={false} />);
     expect(screen.getByRole('alert')).toBeInTheDocument();
     expect(screen.getByText(props.headerTitle)).toBeInTheDocument();
     expect(screen.getByText(props.message)).toBeInTheDocument();
     expect(screen.queryByTestId('rds-icon')).toBeNull(); */
        render(<RdsToast {...props} showLeading={false} />);
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText(props.headerText!)).toBeInTheDocument(); //using non-null assertion operator
        expect(screen.getByText(props.subText!)).toBeInTheDocument(); //using non-null assertion operator
        expect(screen.queryByTestId("rds-icon")).toBeNull();
    });

    it("renders with header and message", () => {
        const testProps: RdsToastProps = {
            ...props,
            headerText: "Header",
            subText: "Message",
            showHeader: true,
            state: ToastState.Success,
            layout: ToastLayout.Padded,
        };
        const { getByText } = render(<RdsToast {...testProps} />);
        expect(getByText(testProps.headerText!)).toBeInTheDocument();
        expect(getByText(testProps.subText!)).toBeInTheDocument();
    });

    test("renders toast header and message correctly", () => {
        const { getByRole, getByText } = render(
            <RdsToast
                colorVariant="success"
                headerText="Header Title"
                subText="This is a test message"
                showHeader={true}
                state={ToastState.Basic}
                layout={ToastLayout.Text} showLeading={false} leadingIcon={ToastLeadingIcon.Circle}            />
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
                subText="This is a test message"
                showHeader={false}
                state={ToastState.Basic}
                layout={ToastLayout.Text} showLeading={false} leadingIcon={ToastLeadingIcon.Circle}            />
        );
        const toastContainer = getByRole("alert");
        const toastHeader = queryByText("Header Title");
        const toastMessage = getByText("This is a test message");
        expect(toastContainer).toBeInTheDocument();
        expect(toastHeader).toBeNull();
        expect(toastMessage).toBeInTheDocument();
    });
});