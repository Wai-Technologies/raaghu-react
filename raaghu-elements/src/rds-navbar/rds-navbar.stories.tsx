import React from "react";
import RdsNavbar from "./rds-navbar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Navbar',
    component: RdsNavbar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsNavbar>;

export default meta;
type Story = StoryObj<typeof RdsNavbar>;

export const Navbar: Story = {
    args: {
        title: "Navbar",
        size: "small",
        navbarItems: [{
            label: "Home",
            isActive: true,
            navclass: "",
            href: "",

        },
        {
            label: "Features",
            isActive: false,
            navclass: "",
            href: "",
        },
        {
            label: "Pricing",
            isActive: false,
            navclass: "",
            href: "",
        }]
    }
} satisfies Story;


