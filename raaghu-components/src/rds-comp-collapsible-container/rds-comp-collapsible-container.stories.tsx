import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCollapsibleContainer, { Position } from "./rds-comp-collapsible-container";


const meta: Meta = { 
    title: "Components/Collapsible Container",
    component: RdsCompCollapsibleContainer,
    parameters: {
        layout: 'padded',
        docs: {
            source: {
                transform: (code: string) => {
                    // Transform Position enum - remove spaces and transform
                    code = code.replace(/"(left|right)"/g, '{Position.$1}');
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            options: ["left", "right"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompCollapsibleContainer>;

export default meta;
type Story = StoryObj<typeof RdsCompCollapsibleContainer>;

export const Default: Story = {
    args: {
        position: Position.Left,
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