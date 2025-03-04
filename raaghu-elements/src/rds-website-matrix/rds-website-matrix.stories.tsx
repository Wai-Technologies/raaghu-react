import React from "react";
import RdsWebsiteMatrix from "./rds-website-matrix";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Website Matrix',
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
Default.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };

export const withTopBorder: Story = {
    args: {
        item: {
            "title": "510+",
            "link": "Learn more",
            "subtitle": "Clients Worked with",
        },
        displayType: "withTopBorder",
        colorVariant: "primary",
    }
} satisfies Story;
withTopBorder.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };

export const leftAligned: Story = {
    args: {
        item: {
            "title": "510+",
            "link": "Learn more",
            "subtitle": "Clients Worked with",
            icon: "edit",
            iconHeight: "30px",
            iconWidth: "20px",
        },
        displayType: "leftAligned",
        colorVariant: "primary",
    }
} satisfies Story;
leftAligned.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };

export const withLeftAlignedIcon: Story = {
    args: {
        item: {
            title: "510+",
            link: "Learn more",
            subtitle: "Clients Worked with",
            icon: "edit",
            iconHeight: "30px",
            iconWidth: "20px",

        },
        displayType: "withLeftAlignedIcon",
        colorVariant: "primary",
    }
} satisfies Story;
withLeftAlignedIcon.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };

export const withCenterAlignedIcon: Story = {
    args: {
        item: {
            title: "510+",
            link: "Learn more",
            subtitle: "Clients Worked with",
            icon: "edit",
            iconHeight: "30px",
            iconWidth: "20px",
        },
        displayType: "withCenterAlignedIcon",
        colorVariant: "primary",
    }
} satisfies Story;
withCenterAlignedIcon.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };

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
centerAligned.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };


