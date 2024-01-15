import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompUrlForwardings from "../src/rds-comp-url-forwardings/rds-comp-url-forwardings";

describe("RdsCompUrlForwardings", () => {
    it("renders the component with initial data", () => {
        const urlForwardingData = {
            source: "example.com",
            target: "www.example.com",
        };

        render(<RdsCompUrlForwardings urlForwardingData={urlForwardingData} />);

        const sourceInput = screen.getByTestId("source") as HTMLInputElement;
        const targetInput = screen.getByTestId("target") as HTMLInputElement;

        expect(sourceInput.value).toBe(urlForwardingData.source);
        expect(targetInput.value).toBe(urlForwardingData.target);
    });

    it("updates the form data when source input is changed", () => {
        const urlForwardingData = {
            source: "example.com",
            target: "www.example.com",
        };

        const emitUrlForwardingData = jest.fn();

        render(
            <RdsCompUrlForwardings
                urlForwardingData={urlForwardingData}
                emitUrlForwardingData={emitUrlForwardingData}
            />
        );

        const sourceInput = screen.getByTestId("source") as HTMLInputElement;
        const newSourceValue = "new-source-value";

        fireEvent.change(sourceInput, { target: { value: newSourceValue } });

        expect(sourceInput.value).toBe(newSourceValue);
        expect(emitUrlForwardingData).toHaveBeenCalledWith({
            source: newSourceValue,
            target: urlForwardingData.target,
        });
    });

    it("updates the form data when target input is changed", () => {
        const urlForwardingData = {
            source: "example.com",
            target: "www.example.com",
        };

        const emitUrlForwardingData = jest.fn();

        render(
            <RdsCompUrlForwardings
                urlForwardingData={urlForwardingData}
                emitUrlForwardingData={emitUrlForwardingData}
            />
        );

        const targetInput = screen.getByTestId("target") as HTMLInputElement;
        const newTargetValue = "new-target-value";

        fireEvent.change(targetInput, { target: { value: newTargetValue } });

        expect(targetInput.value).toBe(newTargetValue);
        expect(emitUrlForwardingData).toHaveBeenCalledWith({
            source: urlForwardingData.source,
            target: newTargetValue,
        });
    });
});
