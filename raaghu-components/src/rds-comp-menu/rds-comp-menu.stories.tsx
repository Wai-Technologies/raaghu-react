import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMenu from './rds-comp-menu';


const meta: Meta = { 
  title: "Components/Menu",
    component: RdsCompMenu,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Menu** component is a customizable UI element designed to display and manage navigation menus within your application. It provides a structured interface for organizing menu items, making it ideal for use cases such as application navigation, dashboards, or any interface requiring a user-friendly and interactive menu system. Fully customizable, the Menu component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompMenu>;

export default meta;
type Story = StoryObj<typeof RdsCompMenu>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




