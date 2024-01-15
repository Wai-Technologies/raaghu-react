import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompDynamicEntityProperty from "./rds-comp-dynamic-entity-property";
import React from "react";

export default {
    title: "Components/ Dynamic Entity Properties",
    component: RdsCompDynamicEntityProperty,
} as ComponentMeta<typeof RdsCompDynamicEntityProperty>;

const Template: ComponentStory<typeof RdsCompDynamicEntityProperty> = (args) => (
    <RdsCompDynamicEntityProperty {...args} />
);

export const DynamicEntityProperty = Template.bind({});

DynamicEntityProperty.args = {
    initialSelectedItems: {
        entity: "ANZAngular105Demo.Authorization.Users.User",
        parameter: [{ label: "Demo 1", },
        { label: "Demo 2", }]
    },
    parameterList: [
        {
            label: "Demo 1",
        },
        {
            label: "Demo 2",
        },
        {
            label: "Demo 3",
        },
        {
            label: "Demo 4",
        }
    ],
    entityNames: [{ label: "ANZAngular105Demo.Authorization.Users.User" }, { label: "ANZAngular105Demo.Authorization" },]
};



