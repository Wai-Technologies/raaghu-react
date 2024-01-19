import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsNavbar from "./rds-navbar";

export default {
    title: "Elements/Navbar",
    component: RdsNavbar,
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsNavbar>;

const Template: ComponentStory<typeof RdsNavbar> = (args) => (
    <RdsNavbar {...args} />
);

export const Navbar = Template.bind({});
Navbar.args = {
    title:"Navbar",
    size:"small",
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
};
