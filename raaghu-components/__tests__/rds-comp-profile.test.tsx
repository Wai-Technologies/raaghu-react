import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompProfile, { RdsCompProfileProps } from "../src/rds-comp-profile/rds-comp-profile";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
// In your test file
jest.mock('react-lottie-player', () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  });
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
const mockNavtabItems = [
    {
        id: "nav-MyAccount",
        icon: "account",
        label: "My Account",
        subText: "Manage your account",
    },
    {
        id: "nav-LinkAccount",
        icon: "link",
        label: "Linked Accounts",
        subText: "Manage linked accounts",
    },
];

const mockProps: RdsCompProfileProps = {
    navtabItems: mockNavtabItems,
    userName: "John Doe",
    userRole: "Admin",
    onProfileLink: function (id: string, navigateTo?: string | undefined): void {
        throw new Error("Function not implemented.");
    },
    userEmail: undefined
};

describe("RdsCompProfile", () => {
    it("renders profile information correctly", () => {
        render(<RdsCompProfile {...mockProps} />);
      
        // Assert profile picture
        const profilePic = screen.getByTestId("profile-pic");
        expect(profilePic).toBeInTheDocument();
        expect(profilePic).toHaveAttribute(
          "src",
          "./assets/profile-picture-circle.svg"
        );
      });
      

    it("calls the 'onLogout' prop when clicking on the logout button", () => {
        const onLogoutMock = jest.fn();
        render(<RdsCompProfile {...mockProps} onLogout={onLogoutMock} />);

        const logoutButton = screen.getByTestId("logout");
        fireEvent.click(logoutButton);
        expect(onLogoutMock).toHaveBeenCalled();
    });
});
