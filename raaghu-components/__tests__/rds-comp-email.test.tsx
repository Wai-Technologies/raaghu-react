import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompEmail from "../src/rds-comp-email/rds-comp-email";
jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));

  jest.mock(
    "../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-dropdown-list" />);
    }
  );
describe("RdsCompEmail", () => {
    const emailSettings = {
        defaultFromDisplayName: "John Doe",
        defaultFromAddress: "john.doe@example.com",
        smtpHost: "smtp.example.com",
        smtpPort: "587",
        smtpEnableSsl: false,
        smtpUseDefaultCredentials: true,
    };

    const handleSubmit = jest.fn();

    beforeEach(() => {
render(
    <RdsCompEmail
        emailSettings={emailSettings}
        onEmailDataSubmit={handleSubmit} // Make sure to pass the correct prop name
        sendTestEmailData={undefined}    />
  );
  
          
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders email inputs correctly", () => {
        expect(
            screen.getByText("AbpSettingManagement.DefaultFromAddress")
        ).toBeInTheDocument();
        expect(
            screen.getByText("AbpSettingManagement.DefaultFromDisplayName")
        ).toBeInTheDocument();
        expect(screen.getByText("AbpEmailing.DisplayName:Abp.Mailing.Smtp.Host")).toBeInTheDocument();
        expect(screen.getByText("AbpEmailing.DisplayName:Abp.Mailing.Smtp.Port")).toBeInTheDocument();
        expect(screen.getByText("AbpEmailing.DisplayName:Abp.Mailing.Smtp.EnableSsl")).toBeInTheDocument();
        expect(screen.getByText("AbpSettingManagement.SmtpUseDefaultCredentials")).toBeInTheDocument();
        expect(screen.getByText("AbpUi.Cancel")).toBeInTheDocument();
    });

    it("updates email inputs on change", () => {
        const senderEmailInput = screen.getByTestId(
            "sender-email"
        ) as HTMLInputElement;
        fireEvent.change(senderEmailInput, {
            target: { value: "jane.doe@example.com" },
        });
        expect(senderEmailInput.value).toBe("jane.doe@example.com");

        const senderDisplayNameInput = screen.getByTestId(
            "sender-display-name"
        ) as HTMLInputElement;
        fireEvent.change(senderDisplayNameInput, { target: { value: "Jane Doe" } });
        expect(senderDisplayNameInput.value).toBe("Jane Doe");

        const smtpHostInput = screen.getByTestId("smtp-host") as HTMLInputElement;
        fireEvent.change(smtpHostInput, { target: { value: "smtp.example.com" } });
        expect(smtpHostInput.value).toBe("smtp.example.com");

        const smtpPortInput = screen.getByTestId("smtp-port") as HTMLInputElement;
        fireEvent.change(smtpPortInput, { target: { value: "587" } });
        expect(smtpPortInput.value).toBe("587");

        const useSslCheckbox = screen.getByTestId("use-ssl") as HTMLInputElement;
        fireEvent.click(useSslCheckbox);
        expect(useSslCheckbox.checked).toBe(true);

        const useDefaultCredentialsCheckbox = screen.getByTestId(
            "use-default-credential"
        ) as HTMLInputElement;
        fireEvent.click(useDefaultCredentialsCheckbox);
        expect(useDefaultCredentialsCheckbox.checked).toBe(false);
    });

    it("calls handleSubmit on form submission", () => {
        const saveButton = screen.getByTestId("save");
        fireEvent.click(saveButton);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(emailSettings);
    });

    // ...

    it("displays additional fields when 'Use Default Credentials' is unchecked", () => {
        const useDefaultCredentialsCheckbox = screen.getByTestId(
            "use-default-credential"
        );
        fireEvent.click(useDefaultCredentialsCheckbox);

        expect(screen.getByTestId("domain")).toBeInTheDocument();
        expect(screen.getByTestId("user-name")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
    });

    test("calls handleSubmit with updated form data on form submission", () => {
        const saveButton = screen.getByTestId("save");

        // Update form fields
        fireEvent.change(screen.getByTestId("sender-email"), {
            target: { value: "jane.doe@example.com" },
        });
        fireEvent.change(screen.getByTestId("sender-display-name"), {
            target: { value: "Jane Doe" },
        });
        fireEvent.change(screen.getByTestId("smtp-host"), {
            target: { value: "smtp.example.com" },
        });
        fireEvent.change(screen.getByTestId("smtp-port"), {
            target: { value: "587" },
        });
        fireEvent.click(screen.getByTestId("use-ssl"));
        fireEvent.click(screen.getByTestId("use-default-credential"));

        fireEvent.click(saveButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith({
            defaultFromDisplayName: "jane.doe@example.com",
            defaultFromAddress: "Jane Doe",
            smtpHost: "smtp.example.com",
            smtpPort: "587",
            smtpEnableSsl: true,
            smtpUseDefaultCredentials: false,
        });
    });
});
