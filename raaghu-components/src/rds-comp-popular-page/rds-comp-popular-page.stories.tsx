import React from "react";
import RdsCompPopularPage from "./rds-comp-popular-page";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Popular-Page',
    component: RdsCompPopularPage,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Popular Page** component presents a list of popular resources or navigation items, 
  making it easy for users to discover key areas within your application. The \`itemList\` prop accepts 
  an array of objects, each representing a featured item with a \`title\` (main label), \`subtitle\` 
  (supporting description), \`icon\` (identifier for the associated icon), and \`route\` (URL path for 
  navigation). This component is ideal for dashboards, landing pages, or documentation portals where 
  quick access to top resources enhances user engagement and discoverability.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPopularPage>;

export default meta;
type Story = StoryObj<typeof RdsCompPopularPage>;


export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['itemList'] } };


