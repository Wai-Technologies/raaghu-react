import React from "react";
import { render, screen,  } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompFileMover from "../src/rds-comp-file-mover/rds-comp-file-mover";

describe("RdsCompFileMover", () => {
    const fileItems = [
        {
            id: "1",
            name: "Folder 1",
            hasChildren: true,
            children: [
                {
                    id: "2",
                    name: "Folder 1.1",
                    hasChildren: false,
                    children: [],
                },
                {
                    id: "3",
                    name: "Folder 1.2",
                    hasChildren: true,
                    children: [
                        {
                            id: "4",
                            name: "Folder 1.2.1",
                            hasChildren: true,
                            children: [],
                        },
                    ],
                },
            ],
        },
    ];

    it("renders file items correctly", () => {
        render(<RdsCompFileMover items={fileItems} path={undefined}/>);
    


    });

    it("invokes the path callback when a folder is clicked", () => {

        render(<RdsCompFileMover items={fileItems} path={undefined} />);
        //Assertion for document
        expect(screen.getByText("Folder 1")).toBeInTheDocument();

    });
});


  



describe("RdsCompFileMover", () => {
    const fileItems = [
        {
            id: "1",
            name: "Folder 1",
            hasChildren: true,
            children: [
                {
                    id: "2",
                    name: "Folder 1.1",
                    hasChildren: false,
                    children: [],
                },
                {
                    id: "3",
                    name: "Folder 1.2",
                    hasChildren: true,
                    children: [
                        {
                            id: "4",
                            name: "Folder 1.2.1",
                            hasChildren: false,
                            children: [],
                        },
                    ],
                },
            ],
        },
    ];

    it("renders file items correctly", () => {
        render(<RdsCompFileMover items={fileItems} path={undefined} />);

        // Check if the folder names are rendered correctly
        expect(screen.getByText("Folder 1")).toBeInTheDocument();
  
    });


});


