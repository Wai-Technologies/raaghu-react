import React from "react";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import RdsCompFormsResponse from "../src/rds-comp-forms-response/rds-comp-forms-response";

describe("RdsCompFormsResponse", ()=>{
    it("Renders forms Response correctly", ()=>{
        render(<RdsCompFormsResponse></RdsCompFormsResponse>);
        expect(screen.getByText("There is no response yet")).toBeInTheDocument();
    });
});