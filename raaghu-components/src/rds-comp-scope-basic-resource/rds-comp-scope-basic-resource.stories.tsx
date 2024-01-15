
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompScopeBasicResource from "./rds-comp-scope-basic-resource";

export default {
    title: "Components/Api Scope Basic Resource",
    component: RdsCompScopeBasicResource,

} as ComponentMeta<typeof RdsCompScopeBasicResource>;

const Template: ComponentStory<typeof RdsCompScopeBasicResource> = (args) =>
    <RdsCompScopeBasicResource {...args} />;

export const Default = Template.bind({});

Default.args = {
    resourceData: {
        "Name": "",
        "Displayname": "",
        "Description": "",
        checklist: [
            {
                "id": 1,
                "label": "Enables",
                "checked": false,
                "disabled": false
            },
            {
                "id": 2,
                "label": "Required",
                "checked": false,
                "disabled": false
            },
            {
                "id": 3,
                "label": "Emphasize",
                "checked": false,
                "disabled": false
            },
            {
                "id": 4,
                "label": "Show in discovery Documents",
                "checked": false,
                "disabled": false
            },
        ]

    }
};

