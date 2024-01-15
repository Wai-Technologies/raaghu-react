import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsLikeDislike from "./rds-like-dislike";


export default {
    title: "Elements/Like-Dislike",
    component: RdsLikeDislike,
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
    }
} as ComponentMeta<typeof RdsLikeDislike>;

const Template: ComponentStory<typeof RdsLikeDislike> = (args) => (
    <RdsLikeDislike {...args} />
);

export const LikeDislike = Template.bind({});
LikeDislike.args = {
    like: 0,
    dislike: 0,
};
