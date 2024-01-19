import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCard from "./rds-card";

export default {
    title: "Elements/Card",
    component: RdsCard,
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
        borderColor: {
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
    },
} as ComponentMeta<typeof RdsCard>;

const Template: ComponentStory<typeof RdsCard> = (args) => (
    <RdsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
    colorVariant: "primary",
    borderColor: "",
    cardTitle: "Card title",
    cardText:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
    buttonLabel: "Button",
    showFooter: true,
};
export const CardWithImage = Template.bind({});
CardWithImage.args = {
    colorVariant: "primary",
    cardTitle: "Card title",
    cardText:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
    buttonLabel: "Button",

    showFooter: true,
    isImage: true,
    imageUrl: "https://picsum.photos/seed/picsum/1200/600",
};
export const Avatar = Template.bind({});
Avatar.args = {
    colorVariant: "primary",
    cardTitle: "Card title",
    cardText:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
    buttonLabel: "Button",

    showFooter: true,
    isImage: true,
    imageUrl: "https://picsum.photos/seed/picsum/1200/600",
    avatarUrl: "https://placekitten.com/300/300",
    isAvatar: true,
    centerAlign: false,
};
export const WithCenteredAvatar = Template.bind({});
WithCenteredAvatar.args = {
    colorVariant: "primary",
    cardTitle: "Card title",
    cardText:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
    buttonLabel: "Button",

    showFooter: true,
    isImage: true,
    imageUrl: "https://picsum.photos/seed/picsum/1200/600",
    avatarUrl: "https://placekitten.com/300/300",
    isAvatar: true,
    centerAlign: true,
};
