import React from "react";
import RdsPopularPage from "./rds-popular-page";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Popular-Page',
    component: RdsPopularPage,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsPopularPage>;

export default meta;
type Story = StoryObj<typeof RdsPopularPage>;


export const PopularItemsPage: Story = {
    args: {
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
        ]
    }
} satisfies Story;
PopularItemsPage.parameters = { controls: { include: ['itemList'] } };


