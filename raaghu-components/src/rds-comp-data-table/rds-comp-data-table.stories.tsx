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
        actionColumnStyle: {
            options: ["show dots", "show buttons directly"],
            control: { type: "select" },
        },
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
                    { id: 11, tenant: "Default", edition: "Standard", price: 100, status: { "badgeColorVariant": "success", "content": "active" } },

                ],
                actions: [
                    { id: "delete", displayName: "Delete" },
                    { id: "edit", displayName: "Edit" },
                ],
                pagination: true,
                recordsPerPage: 10,
    }
} satisfies Story;
List_View .parameters = { controls: { include: ['enablecheckboxselection', 'actionPosition', 'tableHeaders','tableData','actions','pagination','recordsPerPage','recordsPerPageSelectListOption'] } };

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
                { id: 6, member: "Joy", cases: 60, active: 5 },
                { id: 7, member: "Joy", cases: 120, active: 10 },
                { id: 8, member: "Joy", cases: 250, active: 5 },
                { id: 9, member: "Joy", cases: 60, active: 7 },
                { id: 10, member: "Joy", cases: 100, active: 15 },
                { id: 11, member: "Joy", cases: 250, active: 5 },
                { id: 12, member: "Joy", cases: 60, active: 7 },
                { id: 13, member: "Joy", cases: 100, active: 15 },
            ],
            pagination: true,
            recordsPerPage: 10,
            recordsPerPageSelectListOption: false,
}
} satisfies Story;
List_View_Avatar.parameters = { controls: { include: ['enablecheckboxselection', 'actionPosition', 'tableHeaders','tableData','actions','pagination','recordsPerPage','recordsPerPageSelectListOption'] } };


export const Action_Column_On_Left_Side: Story = {
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
        recordsPerPage: 10,
        recordsPerPageSelectListOption: false,
        actionPosition: "left",
        actionColumnStyle:"show dots"
    }
} satisfies Story;

Action_Column_On_Left_Side.parameters = { controls: { include: ['enablecheckboxselection','actionColumnStyle','actionPosition', 'tableHeaders','tableData','actions','pagination','recordsPerPage','recordsPerPageSelectListOption'] } };


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
        actionColumnStyle:"show dots"
    }

} satisfies Story;

Without_Pagination.parameters = { controls: { include: ['enablecheckboxselection','actionColumnStyle', 'actionPosition', 'tableHeaders','tableData','actions','pagination','recordsPerPage','recordsPerPageSelectListOption'] } };

export const Show_Action_Button: Story = {
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
            { id: "send", displayName: "Send" },
            { id: "view", displayName: "View" },
        ],
        pagination: true,
        recordsPerPage: 10,
        recordsPerPageSelectListOption: false,
        actionColumnStyle: "show buttons directly",
        actionPosition: "right",
    }
} satisfies Story;

Show_Action_Button.parameters = { controls: { include: ['enablecheckboxselection' ,'actionColumnStyle','actionPosition', 'tableHeaders','tableData','actions','pagination','recordsPerPage','recordsPerPageSelectListOption'] } };

