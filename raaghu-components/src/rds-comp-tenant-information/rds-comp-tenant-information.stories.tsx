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
        editionList: [
                    {
                        option: "Not assigned",
                    },
                    {
                        option: "Standard",
                    },
                    {
                        option: "apple",
                    },
                    {
                        option: "Apple1",
                    },
                ],
    }
} satisfies Story;




