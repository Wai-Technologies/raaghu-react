import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompFormsQuestions, {
    RdsCompFormsQuestionProps,
} from "../src/rds-comp-forms-question/rds-comp-forms-questions";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
describe("RdsCompFormsQuestions", () => {
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

    const props: RdsCompFormsQuestionProps = {
        formQuestionsData,
        handleQuestions,
        deleteQuestion,
    };

    it("should render the form questions correctly", () => {
        render(<RdsCompFormsQuestions {...props} />);
        const titleInput = screen.getByTestId("title");
        expect(titleInput).toHaveValue("Question 1");
    });

    it("should update the question title on input change", () => {
        render(<RdsCompFormsQuestions {...props} />);
        const titleInput = screen.getByTestId("title");
        fireEvent.change(titleInput, { target: { value: "New Title" } });
        expect(handleQuestions).toHaveBeenCalledWith([
            {
                index: 1,
                title: "New Title",
                description: "",
                questionType: 1,
                isEdit: true,
                choices: [],
            },
        ]);
    });

    it("should delete a question on delete button click", () => {
        render(<RdsCompFormsQuestions {...props} />);
        const deleteButton = screen.getByTestId("delete-question");
        fireEvent.click(deleteButton);

        expect(deleteQuestion).toHaveBeenCalledWith(formQuestionsData[0]);
    });

    it("Check icons rendering", ()=>{
        render(<RdsCompFormsQuestions {...props} />);
        const iconsElement = screen.getAllByRole("img");
        iconsElement.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });
});
