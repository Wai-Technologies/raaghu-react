import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompFaq, { RdsCompFaqProps } from "../src/rds-comp-faq/rds-comp-faq";

describe("RdsCompFaq", () => {
    const mockQuestionList = [
        {
            question: "Question 1",
            description: "Answer to question 1",
        },
        {
            question: "Question 2",
            description: "Answer to question 2",
        },
    ];

    const mockQuestionHeading = {
        question: "Frequently Asked Questions",
        description: "Answers to common questions",
    };

    const defaultProps: RdsCompFaqProps = {
        questionList: mockQuestionList,
        QuestionHeading: mockQuestionHeading,
    };

    it("renders the question heading", () => {
        render(<RdsCompFaq {...defaultProps} />);
        const questionHeading = screen.getByText(mockQuestionHeading.question);
        const questionDescription = screen.getByText(mockQuestionHeading.description);
        expect(questionHeading).toBeInTheDocument();
        expect(questionDescription).toBeInTheDocument();
    });

    it("renders each question in the list", () => {
        render(<RdsCompFaq {...defaultProps} />);
        mockQuestionList.forEach((question) => {
            const questionTitle = screen.getByText(question.question);
            const questionDescription = screen.getByText(question.description);
            expect(questionTitle).toBeInTheDocument();
            expect(questionDescription).toBeInTheDocument();
        });
    });
});
