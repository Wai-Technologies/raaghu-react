// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompDatatable from "./rds-comp-data-table";
// import React from "react";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//     title: "Components/Data Table",
//     component: RdsCompDatatable,
//     decorators: [
//         (StoryComponent) => (
//             <I18nextProvider i18n={i18n}>
//                 <StoryComponent />
//             </I18nextProvider>
//         ),
//     ],
// } as ComponentMeta<typeof RdsCompDatatable>;
// const Template: ComponentStory<typeof RdsCompDatatable> = (args) => (
//     <RdsCompDatatable {...args} />
// );

// export const List_View = Template.bind({});
// List_View.args = {
//     enablecheckboxselection: false,
//     actionPosition: "right",
//     tableHeaders: [
//         {
//             displayName: "Tenant",
//             key: "tenant",
//             datatype: "text",
//             dataLength: 30,
//             required: true,
//             sortable: true,
//             isBold: true,
//             fontWeight: "medium"
//         },
//         {
//             displayName: "Edition",
//             key: "edition",
//             datatype: "text",
//             dataLength: 30,
//             required: true,
//             sortable: true,
//         },
//         {
//             displayName: "Status",
//             key: "status",
//             datatype: "badge",
//             dataLength: 5,
//             required: true,
//         },
//     ],
//     tableData: [
//         { id: 1, tenant: "Default", edition: "Standard", price: 60, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 2, tenant: "Default", edition: "Basic", price: 120, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 3, tenant: "Default", edition: "Professional", price: 250, status: { "badgeColorVariant": "primary", "content": "inactive" } },
//         { id: 4, tenant: "Default", edition: "Standard", price: 60, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 5, tenant: "Default", edition: "Premium", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 6, tenant: "Default", edition: "Standard", price: 60, status: { "badgeColorVariant": "primary", "content": "inactive" } },
//         { id: 7, tenant: "Default", edition: "Professional", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 8, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 9, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "primary", "content": "inactive" } },
//         { id: 10, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
//     ],
//     actions: [
//         { id: "delete", displayName: "Delete" },
//         { id: "edit", displayName: "Edit" },
//     ],
//     pagination: true,
//     recordsPerPage: 5,
//     recordsPerPageSelectListOption: true,
// };

// export const List_View_Avatar = Template.bind({});

// List_View_Avatar.args = {
//     tableHeaders: [
//         {
//             displayName: "Member",
//             key: "member",
//             datatype: "avatarTitleInfo",
//             dataLength: 30,
//             required: true,
//             sortable: true,
//         },
//         {
//             displayName: "Cases",
//             key: "cases",
//             datatype: "number",
//             dataLength: 5,
//             required: false,
//             sortable: true,
//         },
//         {
//             displayName: "Active",
//             key: "active",
//             datatype: "number",
//             dataLength: 5,
//             required: true,
//         },
//     ],
//     tableData: [
//         { id: 1, member: "Joy", cases: 60, active: 5 },
//         { id: 2, member: "Joy", cases: 120, active: 10 },
//         { id: 3, member: "Joy", cases: 250, active: 5 },
//         { id: 4, member: "Joy", cases: 60, active: 7 },
//         { id: 5, member: "Joy", cases: 100, active: 15 },
//     ],
// }

// export const Action_Button_On_Left_Side = Template.bind({});
// Action_Button_On_Left_Side.args = {
//     enablecheckboxselection: false,
//     tableHeaders: [
//         {
//             displayName: "Edition Name",
//             key: "editionName",
//             datatype: "text",
//             dataLength: 30,
//             required: true,
//             sortable: true,
//         },
//         {
//             displayName: "Price ($)",
//             key: "price",
//             datatype: "number",
//             dataLength: 5,
//             required: false,
//             sortable: true,
//         },
//         {
//             displayName: "Trial Period(Day(s))",
//             key: "trialPeriod",
//             datatype: "number",
//             dataLength: 5,
//             required: true,
//         },
//     ],
//     tableData: [
//         { id: 1, editionName: "Standard", price: 60, trialPeriod: 5 },
//         { id: 2, editionName: "Basic", price: 120, trialPeriod: 10 },
//         { id: 3, editionName: "Premium", price: 250, trialPeriod: 5 },
//         { id: 4, editionName: "Standard", price: 60, trialPeriod: 7 },
//         { id: 5, editionName: "Basic", price: 100, trialPeriod: 15 },
//         { id: 6, editionName: "Standard", price: 60, trialPeriod: 5 },
//         { id: 7, editionName: "Premium", price: 100, trialPeriod: 47 },
//         { id: 8, editionName: "Standard", price: 100, trialPeriod: 53 },
//         { id: 9, editionName: "Standard", price: 100, trialPeriod: 35 },
//         { id: 10, editionName: "Basic", price: 100, trialPeriod: 35 },
//         { id: 11, editionName: "Premium", price: 100, trialPeriod: 95 },
//         { id: 12, editionName: "Standard", price: 100, trialPeriod: 75 },
//         { id: 13, editionName: "Premium", price: 100, trialPeriod: 15 },
//         { id: 14, editionName: "Basic", price: 100, trialPeriod: 45 },
//         { id: 15, editionName: "Standard", price: 100, trialPeriod: 3 },
//         { id: 16, editionName: "Basic", price: 100, trialPeriod: 1 },
//     ],
//     actions: [
//         { id: "delete", displayName: "Delete" },
//         { id: "edit", displayName: "Edit" },
//     ],
//     pagination: true,
//     recordsPerPage: 5,
//     recordsPerPageSelectListOption: true,
// };

// export const Without_Pagination = Template.bind({});
// Without_Pagination.args = {
//     tableHeaders: [
//         {
//             displayName: "Edition Name",
//             key: "editionName",
//             datatype: "text",
//             dataLength: 30,
//             required: true,
//             sortable: true,
//         },
//         {
//             displayName: "Price ($)",
//             key: "price",
//             datatype: "number",
//             dataLength: 5,
//             required: false,
//             sortable: true,
//         },
//         {
//             displayName: "Trial Period(Day(s))",
//             key: "trialPeriod",
//             datatype: "number",
//             dataLength: 5,
//             required: true,
//         },
//         {
//             displayName: "Status",
//             key: "status",
//             datatype: "badge",
//             dataLength: 5,
//             required: true,
//         },
//     ],
//     tableData: [
//         { id: 1, editionName: "Standard", price: 60, trialPeriod: 5, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 2, editionName: "Basic", price: 120, trialPeriod: 10, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 3, editionName: "Premium", price: 250, trialPeriod: 5, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 4, editionName: "Standard", price: 60, trialPeriod: 7, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 5, editionName: "Basic", price: 100, trialPeriod: 15, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 6, editionName: "Standard", price: 60, trialPeriod: 5, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 7, editionName: "Premium", price: 100, trialPeriod: 47, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 8, editionName: "Standard", price: 100, trialPeriod: 53, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 9, editionName: "Standard", price: 100, trialPeriod: 35, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 10, editionName: "Basic", price: 100, trialPeriod: 35, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 11, editionName: "Premium", price: 100, trialPeriod: 95, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 12, editionName: "Standard", price: 100, trialPeriod: 75, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 13, editionName: "Premium", price: 100, trialPeriod: 15, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 14, editionName: "Basic", price: 100, trialPeriod: 45, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 15, editionName: "Standard", price: 100, trialPeriod: 3, status: { "badgeColorVariant": "success", "content": "active" } },
//         { id: 16, editionName: "Basic", price: 100, trialPeriod: 1, status: { "badgeColorVariant": "success", "content": "active" } },
//     ],
//     actions: [
//         { id: "delete", displayName: "Delete" },
//         { id: "edit", displayName: "Edit" },
//     ],
//     pagination: false,
//     actionPosition: "right",
// };


import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDatatable from "./rds-comp-data-table";


const meta: Meta = { 
    title: "Components/Datatable",
    component: RdsCompDatatable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDatatable>;

export default meta;
type Story = StoryObj<typeof RdsCompDatatable>;

export const List_View: Story = {
    args: {
        
                enablecheckboxselection: false,
                actionPosition: "right",
                tableHeaders: [
                    {
                        displayName: "Tenant",
                        key: "tenant",
                        datatype: "text",
                        dataLength: 30,
                        required: true,
                        sortable: true,
                        isBold: true,
                        fontWeight: "medium"
                    },
                    {
                        displayName: "Edition",
                        key: "edition",
                        datatype: "text",
                        dataLength: 30,
                        required: true,
                        sortable: true,
                    },
                    {
                        displayName: "Status",
                        key: "status",
                        datatype: "badge",
                        dataLength: 5,
                        required: true,
                    },
                ],
                tableData: [
                    { id: 1, tenant: "Default", edition: "Standard", price: 60, status: { "badgeColorVariant": "success", "content": "active" } },
                    { id: 2, tenant: "Default", edition: "Basic", price: 120, status: { "badgeColorVariant": "success", "content": "active" } },
                    { id: 3, tenant: "Default", edition: "Professional", price: 250, status: { "badgeColorVariant": "primary", "content": "inactive" } },
                    { id: 4, tenant: "Default", edition: "Standard", price: 60, status: { "badgeColorVariant": "success", "content": "active" } },
                    { id: 5, tenant: "Default", edition: "Premium", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
                    { id: 6, tenant: "Default", edition: "Standard", price: 60, status: { "badgeColorVariant": "primary", "content": "inactive" } },
                    { id: 7, tenant: "Default", edition: "Professional", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
                    { id: 8, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
                    { id: 9, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "primary", "content": "inactive" } },
                    { id: 10, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },
                ],
                actions: [
                    { id: "delete", displayName: "Delete" },
                    { id: "edit", displayName: "Edit" },
                ],
                pagination: true,
                recordsPerPage: 5,
                recordsPerPageSelectListOption: true,
            

       // List_View_Avatar.args = {
            //     tableHeaders: [
            //         {
            //             displayName: "Member",
            //             key: "member",
            //             datatype: "avatarTitleInfo",
            //             dataLength: 30,
            //             required: true,
            //             sortable: true,
            //         },
            //         {
            //             displayName: "Cases",
            //             key: "cases",
            //             datatype: "number",
            //             dataLength: 5,
            //             required: false,
            //             sortable: true,
            //         },
            //         {
            //             displayName: "Active",
            //             key: "active",
            //             datatype: "number",
            //             dataLength: 5,
            //             required: true,
            //         },
            //     ],
            //     tableData: [
            //         { id: 1, member: "Joy", cases: 60, active: 5 },
            //         { id: 2, member: "Joy", cases: 120, active: 10 },
            //         { id: 3, member: "Joy", cases: 250, active: 5 },
            //         { id: 4, member: "Joy", cases: 60, active: 7 },
            //         { id: 5, member: "Joy", cases: 100, active: 15 },
            //     ],
            // }
    }
} satisfies Story;

export const List_View_Avatar: Story = {
    args : {
            tableHeaders: [
                {
                    displayName: "Member",
                    key: "member",
                    datatype: "avatarTitleInfo",
                    dataLength: 30,
                    required: true,
                    sortable: true,
                },
                {
                    displayName: "Cases",
                    key: "cases",
                    datatype: "number",
                    dataLength: 5,
                    required: false,
                    sortable: true,
                },
                {
                    displayName: "Active",
                    key: "active",
                    datatype: "number",
                    dataLength: 5,
                    required: true,
                },
            ],
            tableData: [
                { id: 1, member: "Joy", cases: 60, active: 5 },
                { id: 2, member: "Joy", cases: 120, active: 10 },
                { id: 3, member: "Joy", cases: 250, active: 5 },
                { id: 4, member: "Joy", cases: 60, active: 7 },
                { id: 5, member: "Joy", cases: 100, active: 15 },
            ],
}
} satisfies Story;

export const Action_Button_On_Left_Side: Story = {
    args: {
        enablecheckboxselection: false,
        tableHeaders: [
            {
                displayName: "Edition Name",
                key: "editionName",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            {
                displayName: "Price ($)",
                key: "price",
                datatype: "number",
                dataLength: 5,
                required: false,
                sortable: true,
            },
            {
                displayName: "Trial Period(Day(s))",
                key: "trialPeriod",
                datatype: "number",
                dataLength: 5,
                required: true,
            },
        ],
        tableData: [
            { id: 1, editionName: "Standard", price: 60, trialPeriod: 5 },
            { id: 2, editionName: "Basic", price: 120, trialPeriod: 10 },
            { id: 3, editionName: "Premium", price: 250, trialPeriod: 5 },
            { id: 4, editionName: "Standard", price: 60, trialPeriod: 7 },
            { id: 5, editionName: "Basic", price: 100, trialPeriod: 15 },
            { id: 6, editionName: "Standard", price: 60, trialPeriod: 5 },
            { id: 7, editionName: "Premium", price: 100, trialPeriod: 47 },
            { id: 8, editionName: "Standard", price: 100, trialPeriod: 53 },
            { id: 9, editionName: "Standard", price: 100, trialPeriod: 35 },
            { id: 10, editionName: "Basic", price: 100, trialPeriod: 35 },
            { id: 11, editionName: "Premium", price: 100, trialPeriod: 95 },
            { id: 12, editionName: "Standard", price: 100, trialPeriod: 75 },
            { id: 13, editionName: "Premium", price: 100, trialPeriod: 15 },
            { id: 14, editionName: "Basic", price: 100, trialPeriod: 45 },
            { id: 15, editionName: "Standard", price: 100, trialPeriod: 3 },
            { id: 16, editionName: "Basic", price: 100, trialPeriod: 1 },
        ],
        actions: [
            { id: "delete", displayName: "Delete" },
            { id: "edit", displayName: "Edit" },
        ],
        pagination: true,
        recordsPerPage: 5,
        recordsPerPageSelectListOption: true,
    }
} satisfies Story;

export const Without_Pagination: Story = {
    args: {
        tableHeaders: [
            {
                displayName: "Edition Name",
                key: "editionName",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            {
                displayName: "Price ($)",
                key: "price",
                datatype: "number",
                dataLength: 5,
                required: false,
                sortable: true,
            },
            {
                displayName: "Trial Period(Day(s))",
                key: "trialPeriod",
                datatype: "number",
                dataLength: 5,
                required: true,
            },
            {
                displayName: "Status",
                key: "status",
                datatype: "badge",
                dataLength: 5,
                required: true,
            },
        ],
        tableData: [
            { id: 1, editionName: "Standard", price: 60, trialPeriod: 5, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 2, editionName: "Basic", price: 120, trialPeriod: 10, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 3, editionName: "Premium", price: 250, trialPeriod: 5, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 4, editionName: "Standard", price: 60, trialPeriod: 7, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 5, editionName: "Basic", price: 100, trialPeriod: 15, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 6, editionName: "Standard", price: 60, trialPeriod: 5, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 7, editionName: "Premium", price: 100, trialPeriod: 47, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 8, editionName: "Standard", price: 100, trialPeriod: 53, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 9, editionName: "Standard", price: 100, trialPeriod: 35, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 10, editionName: "Basic", price: 100, trialPeriod: 35, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 11, editionName: "Premium", price: 100, trialPeriod: 95, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 12, editionName: "Standard", price: 100, trialPeriod: 75, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 13, editionName: "Premium", price: 100, trialPeriod: 15, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 14, editionName: "Basic", price: 100, trialPeriod: 45, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 15, editionName: "Standard", price: 100, trialPeriod: 3, status: { "badgeColorVariant": "success", "content": "active" } },
            { id: 16, editionName: "Basic", price: 100, trialPeriod: 1, status: { "badgeColorVariant": "success", "content": "active" } },
        ],
        actions: [
            { id: "delete", displayName: "Delete" },
            { id: "edit", displayName: "Edit" },
        ],
        pagination: false,
        actionPosition: "right",
    }

} satisfies Story;
           


