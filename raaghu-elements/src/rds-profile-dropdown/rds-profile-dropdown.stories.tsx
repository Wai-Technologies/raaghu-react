import React from "react";
import RdsProfileDropdown from "./rds-profile-dropdown";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/AI ChatBox/Profile Dropdown',
    component: RdsProfileDropdown,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Profile Dropdown** component provides a user interface element that displays a profile image alongside a dropdown menu containing a list of selectable options. It accepts a required \`profileImage\` prop to display the user's avatar, a \`listOptions\` array for menu items, and a \`footer\` string for an actionable footer label, such as a link or button. This component is ideal for user account menus, settings access, or contextual actions related to user profiles, offering a clear and interactive way to present profile-related options in a compact dropdown format.`
}

        }
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
        listOptions: ["Option 1", "Option 2", "Option 3", "Option 4"],
        footer: "Click Here"
    }
} satisfies Story;
Default.parameters = { controls: { include: ["profileImage", "footer"] } };
