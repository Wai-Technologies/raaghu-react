import React from "react";
import RdsNavbar from "./rds-navbar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Navbar',
    component: RdsNavbar,
    parameters: {
        layout: 'padded',
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

export const ConfigurableNavbar: Story = {
    args: {
        title: "Navbar",
        size: "small",
        navbarItems: [{
            label: "Home",
            isActive: true,
            navclass: "my-1 me-3",
            href: "",

        },
        {
            label: "Features",
            isActive: false,
            navclass: "my-1 me-3",
            href: "",
        },
        {
            label: "Pricing",
            isActive: false,
            navclass: "my-1 me-3",
            href: "",
        }]
    }
} satisfies Story;


