import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsAvatar from "../src/rds-avatar/rds-avatar";

describe("RdsAvatar", () => {
    it("should render default avatar if no props are passed", () => {
        render(<RdsAvatar />);
        const defaultAvatar = screen.getByAltText("profile-default");
        expect(defaultAvatar).toBeInTheDocument();
    });

    it("should render a title when isTitle prop is true", () => {
        const firstName = "John";
        const lastName = "Doe";
        const role = "Developer";
        render(<RdsAvatar firstName={firstName} lastName={lastName} role={role} isTitle />);
        const title = screen.getByText(`${firstName} ${lastName}`);
        const subtitle = screen.getByText(role);
        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
    });

    it("should render a profile picture when profilePic prop is passed with a valid URL", () => {
        const profilePic = "https://example.com/profile.png";
        render(<RdsAvatar profilePic={profilePic} withProfilePic={true}/>);
        const image = screen.getByAltText("profile");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", profilePic);
    });
});
