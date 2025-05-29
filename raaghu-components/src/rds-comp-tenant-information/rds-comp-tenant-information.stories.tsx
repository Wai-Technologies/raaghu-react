import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantInformation from "./rds-comp-tenant-information";


const meta: Meta = { 
    title: "Components/Tenant Information",
    component: RdsCompTenantInformation,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Tenant Information** component is a structured and user-friendly UI element designed to display and manage tenant-specific details. It allows you to present information such as tenant editions, options, and values in an organized format. This component is ideal for applications that require tenant management features, such as SaaS platforms or multi-tenant systems. Fully customizable, the Tenant Information component ensures seamless integration with your design system while providing an intuitive interface for managing and displaying tenant-related data effectively.'
    },
},
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




