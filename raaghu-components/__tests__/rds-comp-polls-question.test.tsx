import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompPollsQuestion from "../src/rds-comp-polls-question/rds-comp-polls-question";

describe("RdsCompPollsQuestion", () => {
    const mockGetPollsQuestion = jest.fn();
    const mockProps = {
        questionData: {
            question: "",
            code: "",
            name: "",
            widget: "",
            showHoursLeft: false,
            allowMultipleVote: false,
            showVoteCount: false,
            showResultWithoutGivingVote: false,
            startDate: "",
            endDate: "",
            resultShowingEndDate: "",
        },
        getPollsQuestion: mockGetPollsQuestion,
        widgetList: ["option1", "option2", "option3"],
    };

    it("renders the component", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const questionInput = screen.getByTestId("question");
        expect(questionInput).toBeInTheDocument();
    });

    it("handles question input change", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const questionInput = screen.getByTestId("question") as HTMLInputElement;
        fireEvent.change(questionInput, { target: { value: "New question" } });
        expect(questionInput.value).toBe("New question");
    });

    it("handles code input change", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const codeInput = screen.getByTestId("code") as HTMLInputElement;
        fireEvent.change(codeInput, { target: { value: "123" } });
        expect(codeInput.value).toBe("123");
    });

    it("handles name input change", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const nameInput = screen.getByTestId("name") as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: "John" } });
        expect(nameInput.value).toBe("John");
    });


    it("handles show remaining time checkbox change", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const showTimeCheckbox = screen.getByTestId(
            "remaining-time"
        ) as HTMLInputElement;
        fireEvent.click(showTimeCheckbox);
        expect(showTimeCheckbox.checked).toBe(true);
    });

    it("handles allow multiple voting checkbox change", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const allowMultipleVotingCheckbox = screen.getByTestId(
            "multiple-voting"
        ) as HTMLInputElement;
        fireEvent.click(allowMultipleVotingCheckbox);
        expect(allowMultipleVotingCheckbox.checked).toBe(true);
    });

    it("handles show vote count checkbox change", () => {
        render(<RdsCompPollsQuestion {...mockProps} />);
        const showVoteCountCheckbox = screen.getByTestId(
            "vote-count"
        ) as HTMLInputElement;
        fireEvent.click(showVoteCountCheckbox);
        expect(showVoteCountCheckbox.checked).toBe(true);
    });
});
