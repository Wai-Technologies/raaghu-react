import React from "react";
import { RdsTeamMember } from "../src";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

// Import the jest-dom library
import '@testing-library/jest-dom';

const teamItems = [
    {
        title: "John Doe",
        subTitle: "Developer",
        description: "John Doe is a software developer with 5 years of experience.",
        imgLink: "https://example.com/john-doe.jpg",
        twitterIcon: "twitter",
    },
    {
        title: "Jane Smith",
        subTitle: "Designer",
        description: "Jane Smith is a UI/UX designer with a passion for creating beautiful and functional designs.",
        imgLink: "https://example.com/jane-smith.jpg",
        twitterIcon: "twitter",
    },
];

describe("RdsTeamMember", () => {
    it("renders team members correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
    });

    it("displays the team member's subtitle correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
        const johnDoeSubtitle = screen.getAllByText("Developer")[0];
        const janeSmithSubtitle = screen.getAllByText("Designer")[0];
        expect(johnDoeSubtitle).toBeInTheDocument();
        expect(janeSmithSubtitle).toBeInTheDocument();
    });

    it("displays the team member's description correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
        const johnDoeDescription = screen.getByText("John Doe is a software developer with 5 years of experience.");
        const janeSmithDescription = screen.getByText("Jane Smith is a UI/UX designer with a passion for creating beautiful and functional designs.");
        expect(johnDoeDescription).toBeInTheDocument();
        expect(janeSmithDescription).toBeInTheDocument();
    });
});