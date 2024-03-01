import React, { useState } from "react";
import RdsNavtabs from "./rds-navtabs";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Navtabs',
    component: RdsNavtabs,
    parameters: {
        layout: 'padded',
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
Default.parameters = { controls: { include: ['navtabsItems'] } };


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
Pills.parameters = { controls: { include: ['navtabsItems', 'type', 'fill', 'justified'] } };

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
Tabs.parameters = { controls: { include: ['navtabsItems', 'type', 'fill', 'justified'] } };

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
Vertical.parameters = { controls: { include: ['navtabsItems', 'type', 'fill', 'justified'] } };

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
Fill.parameters = { controls: { include: ['navtabsItems', 'type', 'fill', 'justified'] } };

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
Justified.parameters = { controls: { include: ['navtabsItems', 'type', 'fill', 'justified'] } };

export const WithIcon: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active", icon: "administration" },
            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home", icon: "home" },
            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about", icon: "profile_picture" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled", icon: "eye_slash" },
        ],
        type: "default",
        fill: false,
        justified: false
    }
} satisfies Story;
WithIcon.parameters = { controls: { include: ['navtabsItems', 'type', 'fill', 'justified'] } };







