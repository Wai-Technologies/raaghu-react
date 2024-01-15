import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompFormsSettings from "../src/rds-comp-forms-setting/rds-comp-forms-setting";

describe("RdsCompFormsSettings", () => {
    test("renders form inputs correctly", () => {
        const formsSettingData = {
            isAcceptingResponses: true,
            isCollectingEmail: false,
            isQuiz: true,
            requiresLogin: false,
            hasLimitOneResponsePerUser: true,
            canEditResponse: false,
        };

        render(<RdsCompFormsSettings formsSettingData={formsSettingData} />);
        expect(screen.getByTestId("accept-response")).toBeChecked();
        expect(screen.getByTestId("collect-email")).not.toBeChecked();
        expect(screen.getByTestId("quiz")).toBeChecked();
        expect(screen.getByTestId("require-login")).not.toBeChecked();
        expect(screen.getByTestId("limit-response")).toBeChecked();
        expect(screen.getByTestId("edit-after-submit")).not.toBeChecked();
    });

    test("updates form settings on checkbox change", () => {
        const formsSettingData = {
            isAcceptingResponses: true,
            isCollectingEmail: false,
            isQuiz: true,
            requiresLogin: false,
            hasLimitOneResponsePerUser: true,
            canEditResponse: false,
        };

        const handleFormSettings = jest.fn();

        render(
            <RdsCompFormsSettings
                formsSettingData={formsSettingData}
                handleFormSettings={handleFormSettings}
            />
        );
        fireEvent.click(screen.getByTestId("accept-response"));
        fireEvent.click(screen.getByTestId("collect-email"));
        fireEvent.click(screen.getByTestId("quiz"));
        fireEvent.click(screen.getByTestId("require-login"));
        fireEvent.click(screen.getByTestId("limit-response"));
        fireEvent.click(screen.getByTestId("edit-after-submit"));
        expect(handleFormSettings).toHaveBeenCalledTimes(6);
        expect(handleFormSettings).toHaveBeenCalledWith({
            isAcceptingResponses: false,
            isCollectingEmail: true,
            isQuiz: false,
            requiresLogin: true,
            hasLimitOneResponsePerUser: false,
            canEditResponse: true,
        });
    });
});
