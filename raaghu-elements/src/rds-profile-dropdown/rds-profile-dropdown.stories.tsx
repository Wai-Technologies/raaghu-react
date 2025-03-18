import React from "react";
import RdsProfileDropdown from "./rds-profile-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Profile Dropdown',
    component: RdsProfileDropdown,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsProfileDropdown>;

export default meta;
type Story = StoryObj<typeof RdsProfileDropdown>;


export const Default: Story = {
    args: {
        profileImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Default.parameters = { controls: { include: ["profileImage", ""] } };
