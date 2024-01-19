import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPopularPage from "./rds-popular-page";

export default {
    title: "Elements/Popular-Page",
    component: RdsPopularPage,
    argTypes: {},
} as ComponentMeta<typeof RdsPopularPage>;

const Template: ComponentStory<typeof RdsPopularPage> = (args) => (
    <RdsPopularPage {...args} />
);

export const PopularPage = Template.bind({});
PopularPage.args = {
    itemList: [
        {
            title: "Documentation",
            subtitle: "Learn how to integrate our tools with your app",
            icon: "folder",
            route: "/home",
        },
        {
            title: "API References",
            subtitle: "A Complete API references of our libraries",
            icon: "code_computer",
            route: "/home",
        },
        {
            title: "Guides",
            subtitle: "Installation guides that cover popular setups",
            icon: "features",
            route: "/home",
        },
        {
            title: "Blog",
            subtitle: "Read our latest news and articles",
            icon: "blog",
            route: "/home",
        },
    ],
};
