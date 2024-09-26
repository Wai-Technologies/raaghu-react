import React from "react";
import RdsBanner from "./rds-banner";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Banner',
    component: RdsBanner,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            options: ["top", "bottom"],
            control: { type: "radio" },
            if: { arg: "sticky" }
        },
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
            control: { type: "select" }
        },
        textAlign: {
            options: ["start", "end", "center"],
            control: { type: "radio" }
        },
    },
} satisfies Meta<typeof RdsBanner>;

export default meta;
type Story = StoryObj<typeof RdsBanner>;

export const Banner: Story = {
    args: {
        textAlign: "start",
        bannerText: "Big news ! We are excited to announce a brand new product.",
        sticky: false,
        position: "top",
        colorVariant: "info",
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        iconStroke: true,
        iconFill: false
    }
} satisfies Story;
Banner.parameters = { controls: { include: ['textAlign', 'bannerText', 'sticky', 'position', 'colorVariant', 'icon', 'iconHeight', 'iconWidth', 'iconStroke', 'iconFill'] } };

