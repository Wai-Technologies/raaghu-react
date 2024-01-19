import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import RdsCompPermissionTree from "../src/rds-comp-permission-tree/rds-comp-permission-tree";

const permissions= [
    {
        displayName: "[Test edition scope feature]",
        id: "testEditionScopeFeature",
        isSelected: false,
        isIntermediate: false,
        disabled: false,
        parent_id:"", 
        children: []
    },
    {
        displayName: "Chat",
        id: "chat",
        parent_id: "",
        isSelected: false,
        isIntermediate: false,
        disabled: false,
        children: [
            {
                displayName: "Chat with host",
                id: "chatwithhost",
                parent_id: "chat",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                children: []
            },
            {
                displayName: "Chat with other tenants",
                id: "chatwithothertenats",
                parent_id: "chat",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                children: []
            },
        ],
    },
    {
        displayName: "Maximum user count",
        id: "maximumUserCount",
        parent_id: "",
        isSelected: false,
        isIntermediate: false,
        disabled: false,
        children: []
    },
    {
        displayName: "Test check feature",
        id: "testCheckFeature",
        parent_id: "",
        isSelected: false,
        isIntermediate: false,
        disabled: false,
        children: []
    },
];

describe("RdsCompPermissionTree", ()=>{
    const mockSelectedPermissions = jest.fn();
    it("renders correctly",()=>{
        render(<RdsCompPermissionTree permissions={permissions} selectedPermissions={mockSelectedPermissions}></RdsCompPermissionTree>);
        expect(screen.getByText("Select All")).toBeInTheDocument();
        expect(screen.getByText("Chat")).toBeInTheDocument();
        expect(screen.getByText("Maximum user count")).toBeInTheDocument();
        expect(screen.getByText("Test check feature")).toBeInTheDocument();
    });
});