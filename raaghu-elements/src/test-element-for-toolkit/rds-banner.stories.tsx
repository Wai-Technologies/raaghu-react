import React from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import RdsBanner from "./rds-banner";

export default {
    title: "Elements/Banner",
    component: RdsBanner,
    argTypes: {
        position: {
            options: ["top", "bottom"],
            control: { type: "radio" }
        },
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
            control: { type: "select" }
        },
        textAlign: {
            options:["start" , "end" , "center"] ,
            control: { type: "radio" }
        },
    }
} as ComponentMeta<typeof RdsBanner>;

const Template: ComponentStory<typeof RdsBanner> = (args) => <RdsBanner {...args} />;

export const Banner = Template.bind({});
Banner.args = {
    textAlign: "start",
    bannerText: "Big news! We are excited to announce a brand new product.",
    sticky: false,
    position: "top",
    colorVariant: "info",
    icon:"information",
    iconHeight: "20px",
    iconWidth: "20px",
    iconStroke: true,
    iconFill: false
};
