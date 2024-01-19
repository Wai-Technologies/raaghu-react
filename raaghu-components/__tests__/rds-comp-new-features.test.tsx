import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompFeatures, { RdsCompFeatureProps } from "../src/rds-comp-new-features/rds-comp-new-features";

describe("RdsCompFeatures", () => {
    const mockFeaturesData: any[] = [
        {
            displayName: "Feature 1",
            name: "feature1",
            features: [
                {
                    valueType: {
                        validator: {
                            name: "BOOLEAN",
                        },
                    },
                    displayName: "Toggle Feature",
                    description: "Enable or disable Feature 1",
                    value: true,
                },
                {
                    valueType: {
                        validator: {
                            name: "NUMERIC",
                        },
                    },
                    displayName: "Numeric Feature",
                    description: "Enter a numeric value for Feature 1",
                    value: "10",
                },
            ],
        },
    // Add more mock feature data if needed
    ];

    const mockOnFeatureSelection = jest.fn();

    const mockProps: RdsCompFeatureProps = {
        featuresData: mockFeaturesData,
        onFeatureSelection: mockOnFeatureSelection,
    };

    beforeEach(() => {
        render(<RdsCompFeatures {...mockProps} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component correctly", () => {
        expect(screen.getByText("Feature 1")).toBeInTheDocument();
    });
});

