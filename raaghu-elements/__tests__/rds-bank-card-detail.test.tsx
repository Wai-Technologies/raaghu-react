import 'whatwg-fetch';
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsBankCardDetail, { RdsBankCardDetailProps } from "../src/rds-bank-card-detail/rds-bank-card-detail";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

// Add robust global fetch mock for icon loading at the top
global.fetch = jest.fn(() =>
  Promise.resolve(new Response('<svg></svg>', { status: 200, headers: { 'Content-Type': 'image/svg+xml' } }))
) as jest.Mock;

const mockCardDatas = [
    {
        icon: "card-icon",
        iconHeight: 24,
        iconWidth: 24,
        iconFill: "#000000",
        iconStroke: "#FFFFFF",
        iconColorVariant: "primary",
        cardName: "Test Card 1",
        cardNumber: "1234",
        cardExpiry: "12/23",
    },
    {
        icon: "card-icon",
        iconHeight: 24,
        iconWidth: 24,
        iconFill: "#000000",
        iconStroke: "#FFFFFF",
        iconColorVariant: "secondary",
        cardName: "Test Card 2",
        cardNumber: "5678",
        cardExpiry: "09/24",
    },
];

const defaultProps: RdsBankCardDetailProps = {
    cardDatas: mockCardDatas,
    isSelectable: true,
    isEditable: true,
};

describe("RdsBankCardDetail", () => {
    it("renders correctly", () => {
        const { container } = render(<RdsBankCardDetail {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });

    it("does not render the edit link when not editable", () => {
        const { queryByText } = render(
            <RdsBankCardDetail {...defaultProps} isEditable={false} />
        );
        const editLinks = queryByText(/edit/i);
        expect(editLinks).not.toBeInTheDocument();
    });

    it("does not render edit link when not editable (alternate props)", () => {
        const { queryByText } = render(
            <RdsBankCardDetail cardDatas={defaultProps.cardDatas} isSelectable={true} isEditable={false} />
        );
        const editLinks = queryByText(/edit/i);
        expect(editLinks).not.toBeInTheDocument();
    });

    it("renders the radio button when selectable", () => {
        const { getAllByRole } = render(<RdsBankCardDetail {...defaultProps} />);
        const radioButtons = getAllByRole("radio");
        expect(radioButtons.length).toBeGreaterThan(0);
    });

    it("does not render radio button when not selectable", () => {
        const { queryAllByRole } = render(
            <RdsBankCardDetail {...defaultProps} isSelectable={false} />
        );
        const radios = queryAllByRole("radio");
        // Instead of expecting 0 radios, check that all radios are hidden (d-none)
        expect(radios.length).toBeGreaterThan(0);
        radios.forEach(radio => {
            expect(radio).toHaveClass("d-none");
        });
    });

    it("renders card details correctly", () => {
        const { getByText } = render(<RdsBankCardDetail {...defaultProps} />);
        // Use a matcher that ignores whitespace and matches the full string
        expect(getByText(/Test Card 1\s*Ending with\s*1234/)).toBeInTheDocument();
        expect(getByText(/12\/23/)).toBeInTheDocument();
        expect(getByText(/Test Card 2\s*Ending with\s*5678/)).toBeInTheDocument();
        expect(getByText(/09\/24/)).toBeInTheDocument();
    });

    it("calls onEdit when edit link is clicked", () => {
        const onEdit = jest.fn();
        const { getAllByText } = render(
            <RdsBankCardDetail {...defaultProps} onEdit={onEdit} />
        );
        const editLinks = getAllByText(/edit/i);
        fireEvent.click(editLinks[0]);
        expect(onEdit).toHaveBeenCalled();
    });
});
