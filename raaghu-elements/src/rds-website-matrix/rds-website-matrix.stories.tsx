import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsWebsiteMatrix from "./rds-website-matrix";

export default {
    title: "Elements/Website Matrix",
    component: RdsWebsiteMatrix,
    argTypes: {
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
            control: { type: "select" }
        }},
} as ComponentMeta<typeof RdsWebsiteMatrix>;

const Template: ComponentStory<typeof RdsWebsiteMatrix> = (args) => (
    <RdsWebsiteMatrix {...args}/>
);

export const Default = Template.bind({});
Default.args = {
    item :{
        "title": "510+",
        "link": "Learn more",
        "subtitle": "Clients Worked with"
    },
    displayType:"default", 
    colorVariant: "primary",
};


export const withTopBorder = Template.bind({});
withTopBorder.args = {
    colorVariant: "primary", 
    displayType: "withTopBorder",
    item: {
        title: "510+",
        link: "Learn more",
        subtitle: "Clients Worked with"

    }
};

export const leftAligned = Template.bind({});
leftAligned.args = {
    colorVariant: "primary", 
    displayType: "leftAligned",
    item: {
        title: "510+",
        link: "Learn more",
        subtitle: "Clients Worked with",
        icon: "edit",
        iconHeight: "20px",
        iconWidth: "20px"
    }
};
export const withLeftAlignedIcon = Template.bind({});

withLeftAlignedIcon.args = {
    colorVariant: "primary", 
    displayType: "withLeftAlignedIcon",
    item: {
        title: "510+",
        link: "Learn more",
        subtitle: "Clients Worked with",
        icon: "edit",
        iconHeight: "20px",
        iconWidth: "20px",

    }
};
export const withCenterAlignedIcon = Template.bind({});
withCenterAlignedIcon.args = {
    colorVariant: "primary", 
    displayType: "withCenterAlignedIcon",
    item: {
        title: "510+",
        icon: "edit",
        iconHeight: "20px",
        iconWidth: "20px",
        link: "Learn more",
        subtitle: "Clients Worked with"


    }
};
export const centerAligned = Template.bind({});
centerAligned.args = {
    colorVariant: "primary", 
    displayType: "centerAligned",
    item: {
        title: "510+",
        link: "Learn more",
        subtitle: "Clients Worked with",
        description: "We have successfully onboard more than 510 clients as of now. Amazing work experience with them"
    }
};
