import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ResizableComponent from './rds-comp-resizable';

const meta: Meta<typeof ResizableComponent> = { 
    title: "Components/Resizable",
    component: ResizableComponent,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ResizableComponent>;

export const Default: Story = {
    args: {
        columns: [
            { id: 'left-block', theme: 'gray', size: 200 },    // Left block with initial size of 200px
            { id: 'middle-block', theme: 'white', size: 300 },  // Middle block with initial size of 300px
            { id: 'right-block', theme: 'gray', size: 150 }     // Right block with initial size of 150px
        ],
        axis: 'x',
        min: 100,
        max: 500
    },
    render: (props) => (
        <ResizableComponent {...props} />
    )
};
