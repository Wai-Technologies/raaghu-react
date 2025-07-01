import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompCollapsibleContainer, { Position } from "./rds-comp-collapsible-container";


const meta: Meta = { 
    title: "Components/Collapsible Container",
    component: RdsCompCollapsibleContainer,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
        component: 
            'The **Collapsible Container** component is a flexible and interactive UI element designed to display a collapsible menu or container within your application. It supports a `position` property to define the placement of the container (`left` or `right`) and a `menuItems` array to specify the menu options. Each menu item can include properties like `name` and `icon`, allowing for a visually appealing and functional menu. This component is ideal for creating side menus, toolbars, or interactive panels that can be expanded or collapsed based on user interaction. Fully customizable, the Collapsible Container component ensures a seamless user experience while maintaining consistency with your design system. Developers can easily configure the menu items and position to align with the functional and aesthetic requirements of their application.'
    },
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