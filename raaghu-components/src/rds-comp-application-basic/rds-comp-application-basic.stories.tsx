import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplicationBasic from './rds-comp-application-basic';


const meta: Meta = { 
    title: "Components/Application Basic",
    component: RdsCompApplicationBasic,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Application Basic** component is a foundational and customizable UI element designed to manage and configure basic settings for applications within your system. It provides a structured interface to define and update application details, making it ideal for administrative dashboards or application management systems. Fully customizable, the Application Basic component can be tailored to align with your design system and functional requirements, ensuring a seamless user experience.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplicationBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompApplicationBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;