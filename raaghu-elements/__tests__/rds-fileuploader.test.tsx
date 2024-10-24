import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsFileUploader, { RdsFileUploaderProps } from "../src/rds-file-uploader/rds-file-uploader";
 
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
 
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
 
  describe("RdsFileUploader", () => {
    it("should call the onFileArray callback function when a file is uploaded", () => {
        const props = {
            placeholder: "Select a file",
            size: "small" as "small" | "medium" | "large",
            colorVariant: "primary",
            multiple: true,
            extensions: "jpg,jpeg,png",
            limit: 10,
            label: "My File Uploader",
            onFileArray: jest.fn(),
            getFileUploaderInfo: jest.fn(),
        };
        render(<RdsFileUploader {...props} />);
        const fileInput = screen.getByTestId("rds-file-uploader-input") as HTMLInputElement;
        fileInput.click();
        const file = fileInput.files && fileInput.files[0];
        expect(props.onFileArray).toBeCalledWith([file]);
 
    });
});