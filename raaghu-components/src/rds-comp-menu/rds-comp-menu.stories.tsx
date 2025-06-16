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
        menu: "default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['onSubmit', 'menusData', 'valueType', 'reset', 'onCancel', 'menuPage'] } };

export const Directories: Story = {
    args: {
        menu: "directories",
        items: [
            {
                data: { id: '1', displayName: 'Menu 1' },
                children: [
                    { data: { id: '1', displayName: 'Submenu 1' },
                        children: [
                            { data: { id: '1', displayName: 'Submenu 1.1' } },
                            { data: { id: '2', displayName: 'Submenu 1.2' } },
                        ],
                    },
                    { data: { id: '2', displayName: 'Submenu 2' },
                        children: [
                            { data: { id: '1', displayName: 'Submenu 2.1' } },
                            { data: { id: '2', displayName: 'Submenu 2.2' } },
                        ],    
                    },
                ],
            },
            { data: { id: '2', displayName: 'Menu 2' },
                children: [
                    { data: { id: '1', displayName: 'Submenu 1' } },
                    { data: { id: '2', displayName: 'Submenu 2' } },
                ],
        },
        ]
    }
} satisfies Story;
Directories.parameters = { controls: { include: ['items', 'offId'] } };

export const Fab: Story = {
    args: {
        menu: "fab",
        colorVariant: "primary",
        listItems: [
            { value: "New Role", some: "value", key: "new", icon: "users", iconWidth: "20px", iconHeight: "20px" },
            { value: "Refresh", some: "value", key: "refresh", icon: "refresh", iconWidth: "20px", iconHeight: "20px" },
            { value: "Export to excel", some: "value", key: "export", icon: "export", iconWidth: "20px", iconHeight: "20px" },
            { value: "Delete", some: "value", key: "delete", icon: "delete", iconWidth: "20px", iconHeight: "20px" },
            { value: "Click here download sample import file.", some: "value", key: "download", icon: "download", iconWidth: "20px", iconHeight: "20px" },
        ]
    }
} satisfies Story;
Fab.parameters = { controls: { include: ['colorVariant', 'listItems'] } };
