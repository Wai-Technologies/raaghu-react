import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import RdsCompEdition from "../src/rds-comp-edition/rds-comp-edition";
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
jest.mock(
    "../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-dropdown-list" />);
    }
  );
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
const props = {
    EditionItems: {
        EditionName: "Basic",
        EditionTitle: "Basic Edition",
        Price: 100,
        Plan: "Monthly",
    },
    features: ["Feature 1", "Feature 2"],
};

const onSubmit = jest.fn();
const onCancel = jest.fn();

describe("RdsCompEdition", () => {
    it("renders the component correctly", async () => {
        render(<RdsCompEdition {...props} />);

        expect(screen.getByText("Basic")).toBeTruthy();
        expect(screen.getByText("Basic Edition")).toBeTruthy();
        expect(screen.getByText("100")).toBeTruthy();
        expect(screen.getByText("Monthly")).toBeTruthy();
        expect(screen.getByText("Feature 1")).toBeTruthy();
        expect(screen.getByText("Feature 2")).toBeTruthy();
    });

});
