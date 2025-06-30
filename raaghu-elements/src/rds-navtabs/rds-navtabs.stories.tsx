import React, { useState } from "react";
import RdsNavtabs from "./rds-navtabs";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Navtabs',
    component: RdsNavtabs,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Navtabs** component offers a versatile and accessible tab navigation system for your application. The \`navtabsItems\` prop accepts an array of tab objects, each containing properties such as \`label\` (the visible tab text), \`tablink\` (the target anchor link), \`ariacontrols\` (for accessibility support), and \`id\` (a unique identifier). Additional optional properties include \`icon\` (to display an icon alongside the label), \`subText\` (supplementary descriptive text), \`disabled\` (to disable individual tabs), \`count\` (for badges or numeric indicators), and \`colorVariant\` (to customize badge colors). This component supports multiple layouts and styles, allowing you to create horizontal or vertical tab sets with customizable appearance, making it suitable for rich, user-friendly navigation interfaces.`
}

        }
    },
    tags: ['autodocs'],
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
} satisfies Meta<typeof RdsNavtabs>;

export default meta;
type Story = StoryObj<typeof RdsNavtabs>;



export const Standard: Story = {
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
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['navtabsItems', 'justified', 'style'] } };


//export const Pills: Story = {
//    args: {
//        navtabsItems: [
//            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
//            { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
//            { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
//            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
//        ],
//        style: "Pill",  
//        justified: false,
//        layout:"Horizontal"
//    }
//} satisfies Story;
//Pills.parameters = { controls: { include: ['navtabsItems', 'justified','layout','style'] } };

//export const Tabs: Story = {
//    args: {
//        navtabsItems: [
//            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
//            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
//            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
//            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
//        ],
//        justified: false,
//        layout:"Horizontal"

//    }
//} satisfies Story;
//Tabs.parameters = { controls: { include: ['navtabsItems', 'justified','layout','style'] } };

//export const Vertical: Story = {
//    args: {
//        navtabsItems: [
//            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
//            { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
//            { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
//            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
//        ],
//        justified: false,
//        layout:"Vertical"
//    }
//} satisfies Story;
//Vertical.parameters = { controls: { include: ['navtabsItems', 'justified','layout','style'] } };

//export const Fill: Story = {
//    args: {
//        navtabsItems: [
//            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
//            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
//            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
//            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
//        ],
//        justified: false,
//        layout:"Horizontal"
//    }
//} satisfies Story;
//Fill.parameters = { controls: { include: ['navtabsItems', 'justified','layout','style'] } };

//export const Justified: Story = {
//    args: {
//        navtabsItems: [
//            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active" },
//            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home" },
//            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about" },
//            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled" },
//        ],
//        justified: true,
//        layout:"Horizontal"
//    }
//} satisfies Story;
//Justified.parameters = { controls: { include: ['navtabsItems', 'justified','layout','style'] } };

export const WithIcon: Story = {
    args: {
        navtabsItems: [
            { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active", icon: "administration" },
            { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home", icon: "home" },
            { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about", icon: "profile_picture" },
            { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled", icon: "eye_slash" },
        ],
        style: "Bottom Select",
        justified: false,
        layout:"Horizontal"
    }
} satisfies Story;
WithIcon.parameters = { controls: { include: ['navtabsItems', 'justified','style'] } };

export const IconOnly: Story = {
    args: {
        navtabsItems: [
            { label: "", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id: "active", icon: "administration" },
            { label: "", tablink: "#nav-profile", ariacontrols: "nav-profile", id: "home", icon: "home" },
            { label: "", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id: "about", icon: "profile_picture" },
            { label: "", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id: "disabled", icon: "eye_slash" },
        ],       
        style: "Bottom Select", 
        justified: false,
        layout:"Horizontal",
        iconOnly: true
    }
} satisfies Story;
IconOnly.parameters = { controls: { include: ['navtabsItems', 'justified', 'style'] } };







