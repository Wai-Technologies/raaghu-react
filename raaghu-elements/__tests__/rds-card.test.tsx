import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import RdsCard from "../src/rds-card/rds-card";

describe("RdsCard component", () => {
    it("renders without errors", () => {
        render(<RdsCard />);
    });

    it("renders the card title", () => {
        const cardTitle = "My Card Title";
        render(<RdsCard cardTitle={cardTitle} />);
        expect(screen.getByText(cardTitle)).toBeInTheDocument();
    });

    it("renders the card text", () => {
        const cardText = "My Card Text";
        render(<RdsCard cardText={cardText} />);
        expect(screen.getByText(cardText)).toBeInTheDocument();
    });

    it("renders the button label", () => {
        const buttonLabel = "My Button Label";
        render(<RdsCard buttonLabel={buttonLabel} showFooter />);
        expect(screen.getByText(buttonLabel)).toBeInTheDocument();
    });

    it("renders the avatar image", () => {
        const avatarUrl = "https://my-avatar-url.com/avatar.jpg";
        render(<RdsCard isAvatar avatarUrl={avatarUrl} />);
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("renders the card image", () => {
        const imageUrl = "https://my-card-image-url.com/image.jpg";
        render(<RdsCard isImage imageUrl={imageUrl} />);
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("shows the card footer", () => {
        render(<RdsCard showFooter buttonLabel="My Button Label" />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Show Footer on the page",()=>{
        const showfooter=true;
        render(<RdsCard showFooter={true}/>);
        expect("showFooter").toBeTruthy();
    });


});






