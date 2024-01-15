import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsSearch from "./rds-search";

export default {
    title: "Elements/Search",
    component: RdsSearch,
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        iconPosition:{
            options: ["left", "right"],
            control: { type: "select" },
        },
        labelPosition:{
            options:["top","bottom","left","right"],
            control:{type:"select"}
        }
    },
} as ComponentMeta<typeof RdsSearch>;

const Template: ComponentStory<typeof RdsSearch> = (args) => (
    <RdsSearch {...args} />
);

export const Search = Template.bind({});
Search.args = {
    label:'Search',
    labelPosition:'top',
    placeholder: "Search",
    size: "small",
    iconPosition:"left",
};
