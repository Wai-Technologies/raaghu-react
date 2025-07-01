import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMenuDirectory from './rds-comp-menus-directories';


const meta: Meta = { 
    title: "Components/Menus Directories",
    component: RdsCompMenuDirectory,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Menus Directories** component is a customizable UI element designed to display and manage hierarchical menu structures within your application. It supports nested menu items through an `items` array, where each item can have properties like `id`, `displayName`, and `children` for submenus. This component is ideal for applications requiring multi-level navigation, directory management, or any interface with structured menu hierarchies. Fully customizable, the Menus Directories component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompMenuDirectory>;

export default meta;
type Story = StoryObj<typeof RdsCompMenuDirectory>;

export const Standard: Story = {
    args: {
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



