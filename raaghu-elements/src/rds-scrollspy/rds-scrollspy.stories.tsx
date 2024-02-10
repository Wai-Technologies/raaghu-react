import React from "react";
import RdsScrollspy from "./rds-scrollspy";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Scrollspy',
    component: RdsScrollspy,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsScrollspy>;

export default meta;
type Story = StoryObj<typeof RdsScrollspy>;

export const Default: Story = {
    args: {
    }
} satisfies Story;


