import React from "react";
import RdsCard from "./rds-card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Card',
    component: RdsCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
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
} satisfies Meta<typeof RdsCard>;

export default meta;
type Story = StoryObj<typeof RdsCard>;


export const Default: Story = {
    args: {
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        buttonLabel: "Button",
        showFooter: true,
    }
} satisfies Story;

export const CardWithImage: Story = {
    args: {
        colorVariant: "primary",
        cardTitle: "Card title",
        cardText:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
        buttonLabel: "Button",
        showFooter: true,
        isImage: true,
        imageUrl: "https://picsum.photos/seed/picsum/1200/600",
    }
} satisfies Story;

export const Avatar: Story = {
    args: {
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
    }
} satisfies Story;

export const WithCenteredAvatar: Story = {
    args: {
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
    }
} satisfies Story;

