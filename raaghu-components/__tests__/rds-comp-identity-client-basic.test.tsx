import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompIdentityClientBasic, {
    RdsCompIdentityClientBasicProps,
} from "../src/rds-comp-identity-client-basic/rds-comp-identity-client-basic";

describe("RdsCompIdentityClientBasic", () => {
    const mockProps: RdsCompIdentityClientBasicProps = {
        clientData: {
            id: "123",
            name: "Test Client",
            description: "Test Description",
            url: "http://example.com",
            logoUrl: "http://example.com/logo",
            callbackUrl: "http://example.com/callback",
            logoutUrl: "http://example.com/logout",
        },
    };
    test("renders form inputs and buttons", () => {
        render(<RdsCompIdentityClientBasic {...mockProps} />);

        expect(screen.getByPlaceholderText("Enter ID")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Enter Client Name")
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Enter Description")
        ).toBeInTheDocument();
        const enterUrl = screen.getAllByPlaceholderText("Enter URL");
        enterUrl.forEach((item) => {
            expect(item).toBeInTheDocument();
        });

        expect(screen.getByText("Client ID")).toBeInTheDocument();
        expect(screen.getByText("Client Name")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Client URL")).toBeInTheDocument();
        expect(screen.getByText("Logo URL")).toBeInTheDocument();
        expect(screen.getByText("CallBack URL")).toBeInTheDocument();
        expect(screen.getByText("Logout URL")).toBeInTheDocument();
        expect(screen.getByText("Required Consent")).toBeInTheDocument();

        expect(screen.getByTestId("cancel")).toBeInTheDocument();
    });

});
