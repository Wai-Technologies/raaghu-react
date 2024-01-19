import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompAlertPopup from "../src/rds-comp-alert-popup";

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));

describe("RdsCompAlertPopup", () => {
    it("renders the component correctly", () => {
        const props = {
            alertID: "alert-id",
            iconUrl: "delete",
            colorVariant: "danger",
            alertConfirmation: "Are you sure?",
            messageAlert: "The record will be deleted permanently",
            cancelButtonLabel: "Cancel",
            deleteButtonLabel: "Delete",
        };

        render(<RdsCompAlertPopup {...props} />);

        expect(screen.getByText("Are you sure?")).toBeTruthy();
        expect(screen.getByText("Cancel")).toBeTruthy();
        expect(screen.getByText("Delete")).toBeTruthy();
    });

    it("calls the onCancel prop when the cancel button is clicked", () => {
        const onCancel = jest.fn();
        const props = {
            alertID: "alert-id",
            iconUrl: "delete",
            colorVariant: "danger",
            alertConfirmation: "Are you sure?",
            messageAlert: "The record will be deleted permanently",
            cancelButtonLabel: "Cancel",
            deleteButtonLabel: "Delete",
            onCancel,
        };

        render(<RdsCompAlertPopup {...props} />);

        screen.getByText("Cancel").click();

        expect(onCancel).toBeCalled();
    });

    it("calls the onSuccess prop when the delete button is clicked", () => {
        const onSuccess = jest.fn();
        const props = {
            alertID: "alert-id",
            iconUrl: "delete",
            colorVariant: "danger",
            alertConfirmation: "Are you sure?",
            messageAlert: "The record will be deleted permanently",
            cancelButtonLabel: "Cancel",
            deleteButtonLabel: "Delete",
            onSuccess,
        };

        render(<RdsCompAlertPopup {...props} />);

        screen.getByText("Delete").click();

        expect(onSuccess).toBeCalled();
    });
});
