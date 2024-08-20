import React from "react";
import RdsCard from "./rds-card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Card',
    component: RdsCard,
    parameters: {
        layout: 'padded',
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
Default.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter'] } };

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
        borderColor: "",
    }
} satisfies Story;
CardWithImage.parameters = { controls: { include: ['colorVariant', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter', 'isImage', 'imageUrl', 'borderColor'] } };

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
        src: "./assets/raaghu_icon.png",
        isAvatar: true,
        centerAlign: false,
        borderColor: "",
    }
} satisfies Story;
Avatar.parameters = { controls: { include: ['colorVariant', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter', 'isImage', 'imageUrl', 'src', 'isAvatar', 'centerAlign', 'borderColor'] } };

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
        src: "./assets/raaghu_icon.png",
        isAvatar: true,
        centerAlign: true,
        borderColor: "",
    }
} satisfies Story;
WithCenteredAvatar.parameters = { controls: { include: ['colorVariant', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter', 'isImage', 'imageUrl', 'src', 'isAvatar', 'centerAlign', 'borderColor'] } };

