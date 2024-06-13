import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMenuDirectory from './rds-comp-menus-directories';


const meta: Meta = { 
    title: "Components/Menus Directories",
    component: RdsCompMenuDirectory,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompMenuDirectory>;

export default meta;
type Story = StoryObj<typeof RdsCompMenuDirectory>;

export const Default: Story = {
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



