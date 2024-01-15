import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import RdsCompQuestions from "../src/rds-comp-questions/rds-comp-questions";
jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompQuestions", () => {
    const formQuestionsData = [
        {
            index: 1,
            title: "Question 1",
            description: "",
            questionType: 1,
            isEdit: false,
            choices: [],
        },
    // Add more sample form questions as needed
    ];

    const handleQuestions = jest.fn();
    const deleteQuestion = jest.fn();
    it("renders correctly", () => {
        render(
            <RdsCompQuestions
                formQuestionsData={formQuestionsData}
                basicEditFormData={undefined}
                deleteQuestion={deleteQuestion}
            />
        );
    });

    it("should update the question title on input change", () => {
        render(
            <RdsCompQuestions
                formQuestionsData={formQuestionsData}
                basicEditFormData={undefined}
                deleteQuestion={deleteQuestion}
            />
        );
        const deleteButton = screen.getByTestId("delete-question");
        fireEvent.click(deleteButton);

        expect(deleteQuestion).toHaveBeenCalledWith(formQuestionsData[0]);
    });

    it("Check icons rendering", () => {
        render(
            <RdsCompQuestions
                formQuestionsData={formQuestionsData}
                basicEditFormData={undefined}
                deleteQuestion={deleteQuestion}
            />
        );
        const iconsElement = screen.getAllByRole("img");
        iconsElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });

    it("Check basic forms", () => {
        render(
            <RdsCompQuestions
                formQuestionsData={formQuestionsData}
                basicEditFormData={{}}
                deleteQuestion={deleteQuestion}
            />
        );
        const titleInput = screen.getByText("Title");
        const descriptionInput = screen.getByText("Description");
        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
    });

    it("should display correct inputs based on basicInfo prop", () => {
        const basicInfo = {
            id: 1,
            title: "Default Title",
            description: "Default Description",
        };

        render(<RdsCompQuestions
            formQuestionsData={formQuestionsData}
            basicEditFormData={{}}
            deleteQuestion={deleteQuestion}
        />);
        const titleInput = screen.getByText("Title");
        const descriptionInput = screen.getByText("Description");
        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        const additionalInputs = screen.queryByLabelText("Additional Input");
        expect(additionalInputs).toBeNull();
    });
});
