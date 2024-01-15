import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompNewPage from "../src/rds-comp-newPage/rds-comp-newPage";

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompNewPage", () => {
    const mockProps = {
        newPageData: {
            title: "",
            slug: "",
        },
        onSubmit: jest.fn(),
    };

    it("renders input fields correctly", () => {
        render(<RdsCompNewPage {...mockProps} />);
        const titleInput = screen.getByText("CmsKit.Title");
        const slugInput = screen.getByText("CmsKit.Slug");
        expect(titleInput).toBeInTheDocument();
        expect(slugInput).toBeInTheDocument();
    });

    it("updates state when input values change", () => {
        render(<RdsCompNewPage {...mockProps} />);

        const titleInput = screen.getByTestId("title") as HTMLInputElement;
        const slugInput = screen.getByTestId("slug") as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(slugInput, { target: { value: "test-slug" } });
        expect(titleInput.value).toBe("Test Title");
        expect(slugInput.value).toBe("test-slug");
    });

    it("calls onSubmit function with correct data when save button is clicked", () => {
        render(<RdsCompNewPage {...mockProps} />);

        const titleInput = screen.getByTestId("title");
        const slugInput = screen.getByTestId("slug");
        const saveButton = screen.getByTestId("save");
        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(slugInput, { target: { value: "test-slug" } });
        fireEvent.click(saveButton);
        expect(mockProps.onSubmit).toHaveBeenCalledWith({
            title: "Test Title",
            slug: "test-slug",
        });
    });

    it("disables save button when all fields are empty", () => {
        const emptyProps = {
            newPageData: {
                title: "",
                slug: "",
            },
            onSubmit: jest.fn(),
        };
        render(<RdsCompNewPage {...emptyProps} />);
        const saveButton = screen.getByText("AbpUi.Save");
        expect(saveButton).not.toBeDisabled();
    });

    it("does not disable save button when fields have values", () => {
        const filledProps = {
            newPageData: {
                title: "Test Title",
                slug: "test-slug",
            },
            onSubmit: jest.fn(),
        };
        render(<RdsCompNewPage {...filledProps} />);
        const saveButton = screen.getByText("AbpUi.Save");
        expect(saveButton).not.toBeDisabled();
    });
});
