import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCollapsibleContainer from "./rds-comp-collapsible-container";


const meta: Meta = { 
    title: "Components/Collapsible Container",
    component: RdsCompCollapsibleContainer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCollapsibleContainer>;

export default meta;
type Story = StoryObj<typeof RdsCompCollapsibleContainer>;

export const Default: Story = {
    args: {
        position: "left",
            menuItems: [
              { name: 'Edit', icon: 'edit' },
              { name: 'Download', icon: 'download' },
              { name: 'Favourite', icon: 'star' },
              { name: 'Feedback', icon: 'check' },
              { name: 'Send Link', icon: 'link' },
              { name: 'Subscribe to', icon: 'notification_bell' },
            ]
    }
} satisfies Story;