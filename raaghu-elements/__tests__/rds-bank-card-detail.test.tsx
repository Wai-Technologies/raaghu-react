import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsBankCardDetail, { RdsBankCardDetailProps } from "../src/rds-bank-card-detail/rds-bank-card-detail";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


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
    const cardDatas = [
        {
            icon: "icon-1",
            iconHeight: 24,
            iconWidth: 24,
            iconFill: "#000",
            iconstroke: "#000",
            iconColorVarient: "primary",
            cardName: "Card 1",
            cardNumber: "1234",
            cardExpiry: "12/23",
        },
        {
            icon: "icon-2",
            iconHeight: 24,
            iconWidth: 24,
            iconFill: "#000",
            iconstroke: "#000",
            iconColorVarient: "secondary",
            cardName: "Card 2",
            cardNumber: "5678",
            cardExpiry: "10/25",
        },
    ];
    
    it("renders correctly", () => {
        const { container } = render(<RdsBankCardDetail {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });


    it("does not render the edit link when not editable", () => {
        const { queryByText } = render(
            <RdsBankCardDetail {...defaultProps} isEditable={false} />
        );
        const editLink = queryByText("Edit");

        expect(editLink).not.toBeInTheDocument();
    });
    it("does not render edit link when not editable", () => {
        const { queryByText } = render(
            <RdsBankCardDetail cardDatas={cardDatas} isSelectable={true} isEditable={false} />
        );

        expect(queryByText("Edit")).toBeNull();
    });

    it("renders the radio button when selectable", () => {
        const { getAllByRole } = render(<RdsBankCardDetail {...defaultProps} />);
        const radioButtons = getAllByRole("radio");

    }); });
