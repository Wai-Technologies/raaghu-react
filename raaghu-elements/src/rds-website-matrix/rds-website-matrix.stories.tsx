import React from "react";
import RdsWebsiteMatrix from "./rds-website-matrix";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Website Matrix',
    component: RdsWebsiteMatrix,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
            control: { type: "select" }
        }
    },
} satisfies Meta<typeof RdsWebsiteMatrix>;

export default meta;
type Story = StoryObj<typeof RdsWebsiteMatrix>;


export const Default: Story = {
    args: {
        item: {
            "title": "510+",
            "link": "Learn more",
            "subtitle": "Clients Worked with"
        },
        displayType: "default",
        colorVariant: "primary",
    }
} satisfies Story;

export const withTopBorder: Story = {
    args: {
        item: {
            "title": "510+",
            "link": "Learn more",
            "subtitle": "Clients Worked with"
        },
        displayType: "withTopBorder",
        colorVariant: "primary",
    }
} satisfies Story;

export const leftAligned: Story = {
    args: {
        item: {
            "title": "510+",
            "link": "Learn more",
            "subtitle": "Clients Worked with"
        },
        displayType: "leftAligned",
        colorVariant: "primary",
    }
} satisfies Story;

export const withLeftAlignedIcon: Story = {
    args: {
        item: {
            title: "510+",
            link: "Learn more",
            subtitle: "Clients Worked with",
            icon: "edit",
            iconHeight: "20px",
            iconWidth: "20px",

        },
        displayType: "withLeftAlignedIcon",
        colorVariant: "primary",
    }
} satisfies Story;

export const withCenterAlignedIcon: Story = {
    args: {
        item: {
            title: "510+",
            link: "Learn more",
            subtitle: "Clients Worked with",
            icon: "edit",
            iconHeight: "20px",
            iconWidth: "20px",
        },
        displayType: "withCenterAlignedIcon",
        colorVariant: "primary",
    }
} satisfies Story;

export const centerAligned: Story = {
    args: {
        item: {
            title: "510+",
            link: "Learn more",
            subtitle: "Clients Worked with",
            description: "We have successfully onboard more than 510 clients as of now. Amazing work experience with them"
        },
        displayType: "centerAligned",
        colorVariant: "primary",
    }
} satisfies Story;


