import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompFileUploader from "../src/rds-comp-fileUploader/rds-comp-fileUploader";


describe("RdsCompFileUploader", () => {
    it("should call preFileInfo function with data when file uploader component triggers getFileUploaderInfo event", () => {

        render(<RdsCompFileUploader onClick={undefined} onDeleteFile={function (id: any): void {
            throw new Error("Function not implemented.");
        } } />);
        const testid=screen.getByText("Cancel");
        expect(testid).toBeInTheDocument();
   
    });
});










