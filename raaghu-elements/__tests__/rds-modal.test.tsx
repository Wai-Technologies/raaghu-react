import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsModal, { RdsModalProps } from "../src/rds-modal/rds-modal";

// Import the jest-dom library
import '@testing-library/jest-dom';

describe("RdsModal", () => {

    it("renders with default props", () => {
        const { getByText } = render(<RdsModal modalId={""} children={"Modal Content"} />);
        expect(getByText("Modal Content")).toBeInTheDocument();
    });

    it("renders with header and footer", () => {
        const { getByText } = render(
            <RdsModal
                showModalHeader={true}
                modalTitle="Modal Title"
                showModalFooter={true}
                cancelButtonName="Cancel"
                saveChangesName="Save" modalId={""} children={undefined}></RdsModal>
        );
        expect(getByText("Modal Title")).toBeInTheDocument();
        expect(getByText("Cancel")).toBeInTheDocument();
        expect(getByText("Save")).toBeInTheDocument();
    });

    it("calls modal button onClick handler", () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <RdsModal
                modalbutton={<button onClick={handleClick}>Open Modal</button>}
                modalId="modal1"
            >
                Modal Content
            </RdsModal>
        );
        fireEvent.click(getByText("Open Modal"));
        expect(handleClick).toHaveBeenCalled();
    });

});
