import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentiyResourceBasic from "./rds-comp-identiy-resource-basic";


const meta: Meta = { 
  title: "Components/Identity Resource Basic",
    component: RdsCompIdentiyResourceBasic,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Identity Resource Basic** component is a foundational UI element designed to manage and display identity resource configurations within your application. It provides a simple and structured interface, making it ideal for use cases such as identity management systems, resource configuration dashboards, or any application requiring basic identity resource functionality. Fully customizable, the Identity Resource Basic component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentiyResourceBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentiyResourceBasic>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
// Default.parameters = { controls: { include: [] } };