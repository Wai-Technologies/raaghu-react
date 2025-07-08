import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompEdition from "./rds-comp-edition";


const meta: Meta = {
    title: "Components/Edition",
    component: RdsCompEdition,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Edition** component is a versatile and customizable UI element designed to display and manage subscription plans or editions within your application. It supports two display types: `basic` and `advanced`. The `basic` display type allows you to showcase edition details such as `EditionName`, `EditionTitle`, `Price`, `Plan`, and a list of `features`. The `advanced` display type supports a `planList` array to define multiple plans with properties like `isFree`, `value`, `option`, and `isSelected`. This component is ideal for subscription management systems, pricing pages, or any interface requiring structured and interactive edition or plan selection. Fully customizable, the Edition component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: ["basic", "advanced", "information", "list"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompEdition>;

export default meta;
type Story = StoryObj<typeof RdsCompEdition>;

export const Standard: Story = {
    args: {
        displayType: "basic",
        EditionItems: {
            EditionName: "Corporate",
            EditionTitle: "Strong Application for large team",
            Price: "45",
            Plan: "Per month",
        },
        features: [
            "Maximum User Count",
            "Test Check feature",
            "Test check feature count 2",
        ],
    }
} satisfies Story;
Standard.parameters = { controls: { include: [ "displayType", "planListLabel", "planList", "EditionItems", "features", "editionName", "reset", "onSaveHandler", "accountTwoFactorSettings"]},};

export const Advanced: Story = {
    args: {
        displayType: "advanced",
        planListLabel : "Plan",
        planList: [    
            {
                "isFree": true,
                "value": "standard",
                "option": "Standard",
                "isSelected": false
            },
            {
                "isFree": false,
                "value": "advanced",
                "option": "Advanced",
                "isSelected": false
            }
        ],
    }
} satisfies Story;
Advanced.parameters = { controls: { include: [ "displayType", "planListLabel", "planList", "EditionItems", "features", "editionName", "reset", "onSaveHandler", "accountTwoFactorSettings"]},};

export const Information: Story = {
    args: {
        displayType: "information",
        sizeDataWithDescription: [
                    { type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
                    { type: "Express", days: "2-5 buisness days", cost: "$16.00" },
                    { type: "Free", days: "10-12 buisness days", cost: "$0.00" },
                ],
            
                radioItems: [
                    {
                        label: "First Bill Date",
                        inline: true,
                        id: 1,
                        itemList: [
                            {
                                id: 1,
                                label: "Immediately",
                                checked: true,
                                name: "radio_button",
                            },
                            {
                                id: 2,
                                label: "After Trial Period",
                                checked: false,
                                name: "radio_button",
                            },
                        ],
                    },
                    {
                        label: "After Subscription Expiry",
                        id: 2,
                        inline: true,
                        itemList: [
                            {
                                id: 1,
                                label: "Deactivate Tenant",
                                checked: true,
                                name: "radio_button",
                            },
                            {
                                id: 2,
                                label: "Assign To Another Edition",
                                checked: false,
                                name: "radio_button",
                            },
                        ],
                    },
                ],
    }
} satisfies Story;
Information.parameters = { controls: { include: [ "sizeDataWithDescription", "radioItems", "onSaveHandler", "edition", "reset"]},};

export const List: Story = {
    args: {
        displayType: "list",
        tableHeaders: [
            { displayName: "Edition Name", key: "editionName", datatype: "text", sortable: true },
            { displayName: "Price ($)", key: "price", datatype: "number", sortable: true },
            { displayName: "Trial Period(Day(s))", key: "trialPeriod", datatype: "number" },
            { displayName: "Expiring Edition", key: "expiringEdition", datatype: "text" }
        ],
        tableData: [
            { id: 1, editionName: "Standard",price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 2, editionName: "apple", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 3, editionName: "tesla", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 4, editionName: "google", price: 1200, trialPeriod: 2 },
            { id: 5, editionName: "Standard",price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 6, editionName: "amazon", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 7, editionName: "bing", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 8, editionName: "stack", price: 1200, trialPeriod: 2 },
            { id: 9, editionName: "slack",price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 10, editionName: "disc", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 11, editionName: "HD", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 12, editionName: "dell",price: 1200, trialPeriod: 2 },
            { id: 13, editionName: "logi",price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 14, editionName: "mcdonald", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 15, editionName: "perl", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 16, editionName: "proton", price: 1200, trialPeriod: 2 },
            { id: 17, editionName: "express", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 18, editionName: "nord", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 19, editionName: "mern", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 20, editionName: "ruby", price: 1200, trialPeriod: 2 },
            { id: 21, editionName: "rails", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 22, editionName: "asus", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 23, editionName: "code", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 24, editionName: "nick", price: 1200, trialPeriod: 2 },
            { id: 25, editionName: "plex", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 26, editionName: "senti", price: 2000, trialPeriod: 10, expiringEdition: "Standard" },
            { id: 27, editionName: "prick", price: 20, trialPeriod: 3, expiringEdition: "Standard" },
            { id: 28, editionName: "solar", price: 1200, trialPeriod: 2 },
        ],
        actions: [
            { id: "delete", displayName: "Delete" },
            { id: "edit", displayName: "Edit" }
        ],
        pagination: true,
        recordsPerPage: 5,
        recordsPerPageSelectListOption: true
    }
} satisfies Story;
List.parameters = { controls: { include: [ "tableHeaders", "tableData", "actions", "pagination", "recordsPerPage", "recordsPerPageSelectListOption", "enablecheckboxselection"]},};
