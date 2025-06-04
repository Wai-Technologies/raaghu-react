import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsBasic from "./rds-comp-forms-basic";


const meta: Meta = { 
    title: "Components/Forms Basic",
    component: RdsCompFormsBasic,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Forms Basic** component is a foundational and customizable UI element designed to create and manage basic forms within your application. It provides a simple structure for building forms, making it ideal for use cases such as user input, data collection, or basic form submissions. Fully customizable, the Forms Basic component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




