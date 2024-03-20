import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEditionList from "./rds-comp-edition-list";


const meta: Meta = { 
    title: "Components/Edition List",
    component: RdsCompEditionList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditionList>;

export default meta;
type Story = StoryObj<typeof RdsCompEditionList>;

export const Default: Story = {
    args: {
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




