import React, { useState } from "react";
import RdsCompNavtabs from "./rds-comp-navtabs";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';


const meta: Meta = {
    title: 'Components/Navtabs',
    component: RdsCompNavtabs,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs:{
            description: {
  component: `The **Navtabs** component offers a versatile and accessible tab navigation system for your application. The \`navtabsItems\` prop accepts an array of tab objects, each containing properties such as \`label\` (the visible tab text), \`tablink\` (the target anchor link), \`ariacontrols\` (for accessibility support), and \`id\` (a unique identifier). Additional optional properties include \`icon\` (to display an icon alongside the label), \`subText\` (supplementary descriptive text), \`disabled\` (to disable individual tabs), \`count\` (for badges or numeric indicators), and \`colorVariant\` (to customize badge colors). This component supports multiple layouts and styles, allowing you to create horizontal or vertical tab sets with customizable appearance, making it suitable for rich, user-friendly navigation interfaces.`
}

        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        layout: {
            options: [
                "Horizontal",
                "Vertical"  
            ],
            control: { type: "select" },
        },
        style: {
            options: [
                "Bottom Select",
                "Top Select",
                "Bottom Select Alt",
                "Top Select Alt",
                "Background Filled",
                "Pill",
                "Select Tabs",
                "Vertical -Alt Right Line",
                "Vertical -Alt Left Line",
                "Vertical -Left Line",
                "Vertical -Right Line",
                "Vertical -Left Filled",
                "Vertical -Pointer", 
                "Vertical -Flap" 
            ],
            control: { type: "select" },
        },

    },
} satisfies Meta<typeof RdsCompNavtabs>;

export default meta;
type Story = StoryObj<typeof RdsCompNavtabs>;



export const Default: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        style: "Bottom Select",
        justified: false,
        layout: "Horizontal"
    },
    play: async ({ canvas }) => {
        const tab = await canvas.findByText('Active');
        await expect(tab).toBeInTheDocument();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['navtabsItems', 'justified', 'style'] } };


