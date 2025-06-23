import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsToast, { RdsToastProps, ToastLayout, ToastLeadingIcon, ToastPosition, ToastState } from "../src/rds-toast/rds-toast";

// Mock RdsIcon to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name, colorVariant, height, width }) => (
        <img 
            src="test-icon.svg" 
            alt={name} 
            data-testid={`icon-${name}`} 
            role="img"
        />
    ))
}));

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
    };    it("renders the component without icon", () => {
        render(<RdsToast {...props} showLeading={false} />);
        expect(screen.getByRole("alert")).toBeInTheDocument();
        
        // Test header text is present
        if (props.headerText && props.showHeader) {
            expect(screen.getByText(props.headerText)).toBeInTheDocument();
        }
        
        // Test subtext is present
        if (props.subText && props.showSubText) {
            expect(screen.getByText(props.subText)).toBeInTheDocument();
        }
        
        // Test no icon is present
        expect(screen.queryByTestId(/^icon-/)).toBeNull();
    });it("renders with header and message", () => {
        const testProps: RdsToastProps = {
            ...props,
            headerText: "Header",
            subText: "Message",
            showHeader: true,
            showSubText: true,
            state: ToastState.Success,
            layout: ToastLayout.Padded,
            showLeading: false // Set to false to avoid the fetch call in RdsIcon
        };
        const { getByText, getByRole } = render(<RdsToast {...testProps} />);
        
        // Check that the toast container and elements exist
        expect(getByRole("alert")).toBeInTheDocument();
        expect(getByText("Header")).toBeInTheDocument();
        expect(getByText("Message")).toBeInTheDocument();
    });test("renders toast header and message correctly", () => {
        const { getByRole, getByText } = render(
            <RdsToast
                colorVariant="success"
                headerText="Header Title"
                subText="This is a test message"
                showHeader={true}
                showSubText={true}
                state={ToastState.Basic}
                layout={ToastLayout.Text} 
                showLeading={false} 
                leadingIcon={ToastLeadingIcon.Circle}
            />
        );
        const toastContainer = getByRole("alert");
        const toastHeader = getByText("Header Title");
        const toastMessage = getByText("This is a test message");
        
        expect(toastContainer).toBeInTheDocument();
        expect(toastHeader).toBeInTheDocument();
        expect(toastMessage).toBeInTheDocument();
    });    test("renders toast message without header", () => {
        const { getByRole, getByText, queryByText } = render(
            <RdsToast
                colorVariant="success"
                subText="This is a test message"
                showHeader={false}
                showSubText={true}
                state={ToastState.Basic}
                layout={ToastLayout.Text} 
                showLeading={false} 
                leadingIcon={ToastLeadingIcon.Circle}
            />
        );
        const toastContainer = getByRole("alert");
        const toastHeader = queryByText("Header Title");
        const toastMessage = getByText("This is a test message");
        
        expect(toastContainer).toBeInTheDocument();
        expect(toastHeader).toBeNull();
        expect(toastMessage).toBeInTheDocument();
    });
});