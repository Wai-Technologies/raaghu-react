import React, { useState } from "react";
import RdsNavtabs from "./rds-navtabs";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Navtabs',
    component: RdsNavtabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsNavtabs>;

export default meta;
type Story = StoryObj<typeof RdsNavtabs>;



export const Default: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ]
    }
} satisfies Story;


export const Pills: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        type: "pills",
        fill: false,
        justified: false
    }
} satisfies Story;

export const Tabs: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        type: "tabs",
        fill: false,
        justified: false
    }
} satisfies Story;


export const Vertical: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        type: "vertical",
        fill: false,
        justified: false
    }
} satisfies Story;


export const Fill: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        type: "default",
        fill: true,
        justified: false
    }
} satisfies Story;


export const Justified: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        type: "default",
        fill: false,
        justified: true
    }
} satisfies Story;


export const WithIcon: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
        ],
        type: "default",
        fill: false,
        justified: false
    }
} satisfies Story;








