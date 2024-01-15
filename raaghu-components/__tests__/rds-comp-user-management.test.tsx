import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompUserManagement, {
    RdsCompUserManagementProps,
} from "../src/rds-comp-user-management/rds-comp-user-management";

describe("RdsCompUserManagement", () => {
    const mockProps: RdsCompUserManagementProps = {
        Usermanagementsettings: {},
    };

    it("renders checkboxes correctly", () => {
        render(<RdsCompUserManagement {...mockProps} />);

        const emailConfirmationCheckbox = screen.getByTestId("email-confirmation");
        const phoneNumberVerificationCheckbox = screen.getByTestId(
            "phone-number-verification"
        );
        const securityImageQuestionCheckbox = screen.getByTestId(
            "security-image-quest"
        );
        const cookieConsentCheckbox = screen.getByTestId("cookie-consent-enable");
        const sessionTimeoutControlCheckbox = screen.getByTestId(
            "session-time-out-control"
        );
        const gravatarProfilePictureCheckbox = screen.getByTestId(
            "gravatar-profile-picture"
        );
        expect(emailConfirmationCheckbox).toBeInTheDocument();
        expect(phoneNumberVerificationCheckbox).toBeInTheDocument();
        expect(securityImageQuestionCheckbox).toBeInTheDocument();
        expect(cookieConsentCheckbox).toBeInTheDocument();
        expect(sessionTimeoutControlCheckbox).toBeInTheDocument();
        expect(gravatarProfilePictureCheckbox).toBeInTheDocument();
    });

    it("checkboxes are initially unchecked", () => {
        render(<RdsCompUserManagement {...mockProps} />);
        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked();
        });
    });
});
