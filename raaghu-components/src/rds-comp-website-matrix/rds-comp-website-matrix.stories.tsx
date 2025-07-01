import React from "react";
import RdsCompWebsiteMatrix from "./rds-comp-website-matrix";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Website Matrix',
    component: RdsCompWebsiteMatrix,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Website Matrix** component is a dynamic and customizable UI element designed to display key metrics, statistics, or highlights in a visually engaging format. It supports multiple display types, such as `default`, `withTopBorder`, `leftAligned`, `withLeftAlignedIcon`, `withCenterAlignedIcon`, and `centerAligned`, making it adaptable to various layouts and use cases. The component accepts an `item` object to define its content, including properties like `title` for the main metric, `subtitle` for additional context, `link` for further information, and optional `icon` and `description` for enhanced visual appeal. Additionally, it offers a range of color variants (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`) to align with your design system. Ideal for dashboards, landing pages, or any interface requiring structured and visually appealing data highlights, the Website Matrix component is fully customizable to meet your branding and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
            control: { type: "select" }
        }
    },
} satisfies Meta<typeof RdsCompWebsiteMatrix>;

export default meta;
type Story = StoryObj<typeof RdsCompWebsiteMatrix>;


export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['displayType', 'colorVariant', 'item'] } };

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


