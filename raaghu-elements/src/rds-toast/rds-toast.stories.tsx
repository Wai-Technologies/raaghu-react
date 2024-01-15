import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsToast from "./rds-toast";


export default {
    title: "Elements/Toast",
    component: RdsToast,
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        }, 
        borderColor: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
    }
} as ComponentMeta<typeof RdsToast>;

const Template: ComponentStory<typeof RdsToast> = (args) => (
    <RdsToast {...args}> </RdsToast>
);


export const Default = Template.bind({});
Default.args = {
    headerTitle: "Toast",
    message: "This is a sample toast",
    colorVariant: "light",
    showHeader:true,
    withIcon:true,
    iconName:"folder",
    iconColorvariant:"primary",
    iconHeight:"18px",
    iconWidth:"18px",
    iconFill:false
};
export const toastWithAutohide = Template.bind({});
toastWithAutohide.args = {
    headerTitle: "Toast",
    message: "This is a sample toast",
    delay:5000,
    autohide: true,
    withIcon:true,
    showHeader:true,
    iconName:"folder",
    colorVariant: "light",
    iconColorvariant:"primary",
    iconHeight:"18px",
    iconWidth:"18px",
    iconFill:false
};
export const toastWithoutHeader = Template.bind({});
toastWithoutHeader.args = {
    headerTitle: "Toast",
    autohide: false,
    withIcon:true,
    delay:5000,
    showHeader: false,
    message: "This is a sample toast",
    colorVariant: "light",
    iconName:"folder",
    iconColorvariant:"primary",
    iconHeight:"18px",
    iconWidth:"18px",
    iconFill:false
};
