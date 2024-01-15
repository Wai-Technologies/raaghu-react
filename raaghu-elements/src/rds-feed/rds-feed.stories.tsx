import React from "react";
import { ComponentStory } from "@storybook/react";
import RdsFeed from "./rds-feed";

export default {
    title: "Elements/Feed"
};

const Template: ComponentStory<typeof RdsFeed> = (args) => (
    <RdsFeed {...args} />
);

export const Feed = Template.bind({});

Feed.args = {


    itemList: [
        {
            name: "Jijo Fleshman",
            username: "@jijolife123.15 hours ago",
            date: new Date(),
            feedIcon: "person",
            description:
        "This bag is of the quality expected for the price. The lining inside the bag seems like satin and it is very strong one It has huge space inside inside as the zipper can be opened in either side.",
            reviews: "See all 123 review",
            rating: 1,
            fill: false,
            Stroke: true,

        }
    ],
};
