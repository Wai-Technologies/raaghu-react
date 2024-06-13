import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantInformation from "./rds-comp-tenant-information";


const meta: Meta = { 
    title: "Components/Tenant Information",
    component: RdsCompTenantInformation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTenantInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantInformation>;

export const Default: Story = {
    args: {
        editions: [
                    {
                        option: "Not assigned",
                        value:1
                    },
                    {
                        option: "Standard",
                        value:2
                    },
                    {
                        option: "apple",
                        value:3
                    },
                    {
                        option: "Apple1",
                        value:4
                    },
                ],
    }
} satisfies Story;




