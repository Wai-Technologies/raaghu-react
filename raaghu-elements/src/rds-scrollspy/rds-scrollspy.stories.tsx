import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsScrollspy from "./rds-scrollspy";

export default {
    title: "Elements/Scrollspy",
    component: RdsScrollspy,
    argTypes: {
    
    }
} as ComponentMeta<typeof RdsScrollspy>;

const Template: ComponentStory<typeof RdsScrollspy> = (args) => (
    <RdsScrollspy {...args}/>
);

export const Scrollspy = Template.bind({});
Scrollspy.args = {
};
