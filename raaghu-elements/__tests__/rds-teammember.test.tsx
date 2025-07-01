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

// Mock the RdsCompIcon component to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name }) => (
        <img src="test-icon.svg" alt={name} role="img" data-testid={`icon-${name}`} />
    ))
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
        
        // Check if team members' titles are rendered
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("displays the team member's subtitle correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
        
        // Check subtitles
        expect(screen.getByText("Developer")).toBeInTheDocument();
        expect(screen.getByText("Designer")).toBeInTheDocument();
    });

    it("displays the team member's description correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
        
        // Check descriptions
        expect(screen.getByText("John Doe is a software developer with 5 years of experience.")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith is a UI/UX designer with a passion for creating beautiful and functional designs.")).toBeInTheDocument();
    });
      it("renders team member images correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
        
        // Find team member profile images specifically by looking for img elements
        // that aren't our mocked icons (which have data-testid attributes)
        const profileImages = screen.getAllByRole("img")
            .filter(img => !img.hasAttribute('data-testid'));
        
        // There should be one profile image for each team member
        expect(profileImages.length).toBe(2);
        
        // Check if images have the correct src attributes
        expect(profileImages[0]).toHaveAttribute("src", "https://example.com/john-doe.jpg");
        expect(profileImages[1]).toHaveAttribute("src", "https://example.com/jane-smith.jpg");
    });
    
    it("renders social media icons correctly", () => {
        render(<RdsTeamMember teamItem={teamItems} />);
        
        // Check for Twitter icons (2 for each team member as shown in the component)
        const twitterIcons = screen.getAllByTestId("icon-twitter");
        expect(twitterIcons.length).toBe(4); // 2 icons per team member
    });
});