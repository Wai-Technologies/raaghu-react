
import React from "react";
import RdsAttachement from "./rds-attachement";
import { Meta, StoryObj } from "@storybook/react";
 
 
const meta: Meta = {
    title: "Elements/Attachement",
    component: RdsAttachement,
    argTypes: {
       
    },
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsAttachement>;
 
 
export default meta;
type Story = StoryObj<typeof RdsAttachement>;
 
export const Default: Story = {
    args: {
       
    },
}