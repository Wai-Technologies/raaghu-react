import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCache from "./rds-comp-cache";


const meta: Meta = { 
    title: "Components/Cache",
    component: RdsCompCache,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCache>;

export default meta;
type Story = StoryObj<typeof RdsCompCache>;

export const Default: Story = {
    args: {
        cachedata: [
                    { name: "User Settings Cache", id: 1 },
                    { name: "Zero Role Permissions", id: 2 },
                    { name: "Zero Tenant Cache", id: 3 },
                    { name: "Zero Edition Features", id: 4 },
                    { name: "Tenant Settings Cache", id: 5 },
                    { name: "token_validity_key", id: 6 },
                    { name: "Zero Multi Tenant Localization Dictionary Cache", id: 7 },
                    { name: "AspNet.Identity.Security Stamp", id: 8 },
                    { name: "Temp File Cache Name", id: 9 },
                    { name: "Application Settings Cache", id: 10 },
                    { name: "Zero User Permissions", id: 11 },
                    { name: "Zero Languages", id: 12 },
                ],
    }
} satisfies Story;

export const pagination: Story = {
    args: {
        cachedata: [
                    { name: "User Settings Cache", id: 1 },
                    { name: "Zero Role Permissions", id: 2 },
                    { name: "Zero Tenant Cache", id: 3 },
                    { name: "Zero Edition Features", id: 4 },
                    { name: "Tenant Settings Cache", id: 5 },
                    { name: "token_validity_key", id: 6 },
                    { name: "Zero Multi Tenant Localization Dictionary Cache", id: 7 },
                    { name: "AspNet.Identity.Security Stamp", id: 8 },
                    { name: "Temp File Cache Name", id: 9 },
                    { name: "Application Settings Cache", id: 10 },
                    { name: "Zero User Permissions", id: 11 },
                    { name: "Zero Languages", id: 12 },
                ],
        recordsperpage: 5,
        pagination: true,
        alignment: "end",
    }
} satisfies Story;



