import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompDynamicEntityProperty from "../src/rds-comp-dynamic-entity-property/rds-comp-dynamic-entity-property";

describe("RdsCompDynamicEntityProperty", () => {
    test("renders the component with initial values", () => {
        const entityNames = ["Entity 1", "Entity 2", "Entity 3"];
        const parameterList = ["Param 1", "Param 2", "Param 3"];
        const onSelectedItems = jest.fn();
        const initialSelectedItems = {
            entity: "Entity 2",
            parameter: ["Param 1", "Param 2"],
        };
        const offcanvasId = "offcanvasId";

        render(
            <RdsCompDynamicEntityProperty
                entityNames={entityNames}
                parameterList={parameterList}
                onSelectedItems={onSelectedItems}
                initialSelectedItems={initialSelectedItems}
                offcanvasId={offcanvasId}
            />
        );

        expect(screen.getByText("Entity")).toBeInTheDocument();
        expect(screen.getByText("Filter")).toBeInTheDocument();
        expect(screen.getByText("Parameter")).toBeInTheDocument();
        expect(screen.getByText("Filter")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        const iconElement = screen.getAllByRole("img");
        iconElement.forEach(item=>{
            expect(item).toBeInTheDocument();
        });
        const saveBtn = screen.getByTestId("save");
        fireEvent.click(saveBtn);
    });
});
