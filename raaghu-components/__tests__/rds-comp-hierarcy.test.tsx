import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import RdsCompHierarcy from "../src/rds-comp-hierarcy/rds-comp-hierarcy";

describe("RdsCompHierarcy", () => {
    const treeData = [
        {
            ItemCode: "L1N1",
            ItemDescription: "CEO",
            level: 1,
            children: [
                {
                    ItemCode: "L2N2",
                    ItemDescription: "Head Of Marketing",
                    level: 2,
                    children: [],
                    selected: true,
                },
                {
                    ItemCode: "L2N2",
                    ItemDescription: "Head of HR",
                    level: 2,
                    children: [
                        {
                            ItemCode: "L21N1",
                            ItemDescription: "Senior Manager",
                            level: 3,
                            children: [],
                            selected: true,
                        },
                        {
                            ItemCode: "L21N2",
                            ItemDescription: "Executive",
                            level: 3,
                            children: [],
                            selected: true,
                        },
                        {
                            ItemCode: "L21N3",
                            ItemDescription: "Assistant",
                            level: 3,
                            children: [],
                            selected: true,
                        },
                    ],
                    selected: false,
                },
                {
                    ItemCode: "L2N3",
                    ItemDescription: "Head of HR",
                    level: 2,
                    children: [
                        {
                            ItemCode: "L31N1",
                            ItemDescription: "Executive",
                            level: 3,
                            children: [],
                            selected: true,
                        },
                        {
                            ItemCode: "L31N2",
                            ItemDescription: " Assistant 1",
                            level: 3,
                            children: [],
                            selected: true,
                        },
                        {
                            ItemCode: "L31N3",
                            ItemDescription: "Assistant 1",
                            level: 3,
                            children: [],
                            selected: true,
                        },
                    ],
                    selected: false,
                },
            ],
            selected: true,
        },
    ];

    it("renders component correctly", ()=>{
        render(<RdsCompHierarcy treeData={treeData} nodeColor={undefined} ButtonLabel={""}></RdsCompHierarcy>);
        expect(screen.getByText("CEO")).toBeInTheDocument();
        const headOfHRText = screen.getAllByText("Head of HR");
        headOfHRText.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });

        const executiveText = screen.getAllByText("Executive");
        executiveText.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });

        const assistText = screen.getAllByText("Assistant 1");
        assistText.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("Senior Manager")).toBeInTheDocument();
        expect(screen.getByText("Assistant")).toBeInTheDocument();
        expect(screen.getByText("Head Of Marketing")).toBeInTheDocument();
    });
});
