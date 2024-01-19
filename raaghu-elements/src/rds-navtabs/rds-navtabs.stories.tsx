import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsNavtabs from "./rds-navtabs";

export default {
    title: "Elements/Navtabs",
    component: RdsNavtabs

} as ComponentMeta<typeof RdsNavtabs>;

const Template: ComponentStory<typeof RdsNavtabs> = (args) => (
    <RdsNavtabs {...args} />
);

export const Default = Template.bind({});
Default.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext",id:"active"  },
        { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id:"home" },
        { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext",id:"about" },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id:"disabled" },
    ],
};

export const Pills = Template.bind({});
Pills.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext",  id:"active"  },
        { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile" , id:"home"},
        { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext",  id:"about"  },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id:"disabled" },
    ],
    type: "pills",
    fill: false,
    justified: false
};

export const Tabs = Template.bind({});
Tabs.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id:"active" },
        { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id:"home" },
        { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id:"about" },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id:"disabled" },
    ],
    type: "tabs",
    fill: false,
    justified: false
};

export const Vertical = Template.bind({});
Vertical.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext" ,id:"active"  },
        { label: "Link", tablink: "#nav-profile", ariacontrols: "nav-profile", id:"home" },
        { label: "Link", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext",id:"about" },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext",id:"disabled" },
    ],
    type: "vertical",
    fill: false,
    justified: false
};

export const Fill = Template.bind({});
Fill.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id:"active" },
        { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id:"home" },
        { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id:"about" },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id:"disabled" },
    ],
    type: "default",
    fill: true,
    justified: false
};

export const Justified = Template.bind({});
Justified.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id:"active" },
        { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id:"home" },
        { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id:"about" },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id:"disabled" },
    ],
    type: "default",
    fill: false,
    justified: true
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    navtabsItems: [
        { label: "Active", tablink: "#nav-home", ariacontrols: "nav-home", subText: "Active subtext", id:"active" },
        { label: "Home", tablink: "#nav-profile", ariacontrols: "nav-profile", id:"home" },
        { label: "About", tablink: "#nav-contact", ariacontrols: "nav-contact", subText: "Home subtext", id:"about" },
        { label: "Disabled", tablink: "#nav-deabled", disabled: true, subText: "Disble subtext", id:"disabled" },
    ],
    type: "default",
    fill: false,
    justified: false
};







