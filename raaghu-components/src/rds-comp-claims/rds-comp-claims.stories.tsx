// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react-vite";
// import RdsCompClaims from "./rds-comp-claims";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//     title: "Components/Claims",
//     component: RdsCompClaims,
//     decorators: [
//         (StoryComponent) => (
//             <I18nextProvider i18n={i18n}>
//                 <StoryComponent />
//             </I18nextProvider>
//         ),
//     ],

//     argTypes: {
//         onCreate: { action: "Created" },
//         onCancel: { action: " cancelled" },
//     },
// } as ComponentMeta<typeof RdsCompClaims>;

// const Template: ComponentStory<typeof RdsCompClaims> = (args) => (
//     <RdsCompClaims {...args} />
// );

// export const Default = Template.bind({});

// Default.args = {
//     allClaimsArray: [
//         {
//             option: "One"

//         },
//         {
//             option: "two"
//         },
//         {
//             option: "three"
//         },
//         {
//             option: "four"
//         }

//     ],

//     tableHeaders: [
//         {
//             displayName: "Claim Type",
//             key: "claimType",
//             datatype: "text",
//             sortable: true,
//         },
//         {
//             displayName: "Claim Value",
//             key: "claimValue",
//             datatype: "number",
//             sortable: true,
//         }
//     ],
//     tableData: [
//         { id: 1, claimType: "Standard", claimValue: 60 },
//         { id: 2, claimType: "Basic", claimValue: 120 },
//         { id: 3, claimType: "Premium", claimValue: 250 },
//         { id: 4, claimType: "Standard", claimValue: 60 },
//         { id: 5, claimType: "Basic", claimValue: 100 },
//     ],
//     actions: [
//         { id: "delete", displayName: "Delete" },
//     ],
//     pagination: false,
// };
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompClaims from "./rds-comp-claims"

const meta: Meta = {
    title: "Components/Claims",
    component: RdsCompClaims,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Claims** component is a robust and customizable UI element designed to manage and display claims data in a structured and user-friendly manner. It supports an `allClaimsArray` to define available claims with properties like `option` and `value`, allowing for dynamic claim management. The component also includes `tableHeaders` to configure the structure of the claims table, with fields such as `displayName`, `key`, `datatype`, and `sortable`, ensuring flexibility and clarity in data representation. Additionally, it supports `actions` for user interactions, such as deleting claims, and can be extended with features like pagination for large datasets. Ideal for administrative dashboards, user management systems, or any application requiring efficient claims management, the Claims component is fully customizable to align with your design system and functional requirements, ensuring a seamless and professional user experience.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompClaims>;

export default meta;
type Story = StoryObj<typeof RdsCompClaims>;

export const Default: Story = {
    args: {
        allClaimsArray: [
            {
                option: "One",
                value: "one"
            },
            {
                option: "Two",
                value: "two"
            },
            {
                option: "Three",
                value: "three"
            },
            {
                option: "Four",
                value: "four"
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
        // tableData: [
        //     { id: 1, claimType: "Standard", claimValue: 60 },
        //     { id: 2, claimType: "Basic", claimValue: 120 },
        //     { id: 3, claimType: "Premium", claimValue: 250 },
        //     { id: 4, claimType: "Standard", claimValue: 60 },
        //     { id: 5, claimType: "Basic", claimValue: 100 },
        // ],
        actions: [
            { id: "delete", displayName: "Delete" },
        ],
        // pagination: false,
    }
} satisfies Story;
