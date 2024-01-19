import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompProfilePicture from "../src/rds-comp-profile-picture";

describe("RdsCompProfilePicture", () => {
    const mockProfilePictureData = {
    // mock profile picture data
    };
    const mockPostProfilePic = jest.fn();
    const mockHandleProfileDataSubmit = jest.fn();

    it("displays the correct default avatar image", () => {
        render(
            <RdsCompProfilePicture profilePictureData="profile-picture-circle.svg" />
        );
        const avatarImage = screen.getByTestId("avatar") as HTMLImageElement;
        expect(avatarImage.src).toContain("profile-picture-circle.svg");
    });

    test("displays the default profile picture on initial render", () => {
        render(<RdsCompProfilePicture profilePictureData="" ProfileType={0} />);
        const avatarImage = screen.getByTestId("avatar") as HTMLImageElement;
        expect(avatarImage.src).toContain("profile-picture-circle.svg");
      });
      
      
});
