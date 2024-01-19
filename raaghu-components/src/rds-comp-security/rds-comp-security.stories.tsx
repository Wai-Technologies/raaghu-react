import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompSecurity from "./rds-comp-security";

export default {
    title: "Components/Security",
    component: RdsCompSecurity,
} as ComponentMeta<typeof RdsCompSecurity>;

const Template: ComponentStory<typeof RdsCompSecurity> = (args) => (
    <RdsCompSecurity {...args} />
);

export const Security = Template.bind({});

Security.args = {
    checkgroupList: [
        {
            "id": 1,
            "label": "Require Digit",
            "checked": false,
            "disabled": false
        },
        {
            "id": 2,
            "label": "Require Lowercase",
            "checked": false,
            "disabled": false
        }, {
            "id": 3,
            "label": "Require Non-Alphanumeric",
            "checked": false,
            "disabled": false
        },
        {
            "id": 4,
            "label": "Require Uppercase",
            "checked": false,
            "disabled": false
        },
    ]
};



