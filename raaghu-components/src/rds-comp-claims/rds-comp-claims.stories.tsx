import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompClaims from "./rds-comp-claims";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Claims",
    component: RdsCompClaims,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

    argTypes: {
        onCreate: { action: "Created" },
        onCancel: { action: " cancelled" },
    },
} as ComponentMeta<typeof RdsCompClaims>;

const Template: ComponentStory<typeof RdsCompClaims> = (args) => (
    <RdsCompClaims {...args} />
);

export const Default = Template.bind({});

Default.args = {
    allClaimsArray: [
        {
            option: "One"

        },
        {
            option: "two"
        },
        {
            option: "three"
        },
        {
            option: "four"
        }

    ],

    tableHeaders: [
        {
            displayName: "Claim Type",
            key: "claimType",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: "Claim Value",
            key: "claimValue",
            datatype: "number",
            sortable: true,
        }
    ],
    tableData: [
        { id: 1, claimType: "Standard", claimValue: 60 },
        { id: 2, claimType: "Basic", claimValue: 120 },
        { id: 3, claimType: "Premium", claimValue: 250 },
        { id: 4, claimType: "Standard", claimValue: 60 },
        { id: 5, claimType: "Basic", claimValue: 100 },
    ],
    actions: [
        { id: "delete", displayName: "Delete" },
    ],
    pagination: false,
};
