import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEmail from "./rds-comp-email";


const meta: Meta = { 
    title: "Components/Email",
    component: RdsCompEmail,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEmail>;

export default meta;
type Story = StoryObj<typeof RdsCompEmail>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




