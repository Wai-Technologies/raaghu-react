import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsBreadcrumb from "./rds-breadcrumb";

export default {
    title: "Elements/Breadcrumb",
    component: RdsBreadcrumb,
    argTypes: {
    },
} as ComponentMeta<typeof RdsBreadcrumb>;

const Template: ComponentStory<typeof RdsBreadcrumb> = (args) => (
    <RdsBreadcrumb {...args} />
);


export const breadcrumb = Template.bind({});
breadcrumb.args = {
    breadItems: [
        {
            label: "Home",
            id: 1,
            route: "#",
            disabled: false,
            icon: "home",
            iconFill: false,
            iconstroke: true,
            iconWidth: "15px",
            iconHeight: "15px",
            iconColor: "primary",
            active: false,
        },
        {
            label: "About",
            id: 2,
            route: "#",
            disabled: false,
            icon: "information",
            iconFill: false,
            iconstroke: true,
            iconWidth: "15px",
            iconHeight: "15px",
            iconColor: "primary",
            active: false,
        },
        {
            label: "Contact",
            id: 3,
            active: false,
            disabled: true,
            icon: "phone",
            iconFill: false,
            iconstroke: true,
            iconWidth: "15px",
            iconHeight: "15px",
            iconColor: "primary",
        },
    ],
};
