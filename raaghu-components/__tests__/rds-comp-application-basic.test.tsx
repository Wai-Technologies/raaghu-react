import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompApplicationBasic, { RdsCompApplicationBasicProps } from "../src/rds-comp-application-basic/rds-comp-application-basic";

describe("RdsCompApplicationBasic", () => {
    const typeList = ["Type 1", "Type 2", "Type 3"];
    const scopesList = ["Scope 1", "Scope 2", "Scope 3"];
    const consentType = ["Consent Type 1", "Consent Type 2", "Consent Type 3"];

    const mockHandleSubmit = jest.fn();

    const defaultProps: RdsCompApplicationBasicProps = {
        basicData: {
            clientId: "",
            displayName: "",
            clientUri: "",
            logoUri: "",
            allowAuthorizationCodeFlow: false,
            allowHybridFlow: false,
            allowImplicitFlow: false,
            allowPasswordFlow: false,
            allowDeviceEndpoint: false,
            allowClientCredentialsFlow: false,
            redirectUris: [],
            allowLogoutEndpoint: false,
            postLogoutRedirectUris: [],
            allowRefreshTokenFlow: false,
            clientSecret: "",
            type: "",
            scopes: [],
            consentType: "",
        },

    }

    beforeEach(() => {
        render(<RdsCompApplicationBasic {...defaultProps} />);
    });

    it("renders client id input field", () => {
        const clientIdInput = screen.getByText("AbpOpenIddict.ClientId");
        expect(clientIdInput).toBeInTheDocument();
    });

    it("renders display name input field", () => {
        const displayNameInput = screen.getByText("AbpOpenIddict.DisplayName");
        expect(displayNameInput).toBeInTheDocument();
    });

    it("renders client uri input field", () => {
        const clientUriInput = screen.getByText("AbpOpenIddict.ClientUri");
        expect(clientUriInput).toBeInTheDocument();
    });


    it("should update the state when input fields change", () => {
        const clientIdInput = screen.getByPlaceholderText("Enter Client Id") as HTMLInputElement;
        const displayNameInput = screen.getByPlaceholderText("Enter Display Name") as HTMLInputElement;
      
        fireEvent.change(clientIdInput, { target: { value: "clientId" } });
        fireEvent.change(displayNameInput, { target: { value: "displayName" } });
      
        expect(clientIdInput.value).toBe("clientId");
        expect(displayNameInput.value).toBe("displayName");
        // Add assertions for other input fields
      });
      
});
