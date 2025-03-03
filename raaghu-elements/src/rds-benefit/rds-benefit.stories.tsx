import RdsBenefit from "./rds-benefit";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Benefits',
    component: RdsBenefit,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsBenefit>;

export default meta;
type Story = StoryObj<typeof RdsBenefit>;

export const Default: Story = {
    args: {
        displayType: "default",
        item: {
            "id": 1,
            "icon": "currency_dollar_circle",
            "iconHeight": "35px",
            "iconWidth": "35px",
            "iconFill": false,
            "iconstroke": true,
            "iconColorVarient": "primary",
            "title": "International delivery",
            "description": "Get your order in 2 days"
        }
    }
} satisfies Story;
Default.parameters = { controls: { include: ['displayType', 'item'] } };

export const LeftAligned: Story = {
    args: {
        displayType: "Left Aligned",
        item: {
            "id": 3,
            "icon": "currency_dollar_circle",
            "iconHeight": "35px",
            "iconWidth": "35px",
            "iconFill": false,
            "iconstroke": true,
            "iconColorVarient": "primary",
            "title": "Free delivery all year long",
            "description": "Name another place that offers year long free delivery? We'll be waiting. Order now and you'll get delivery absolutely free."
        }
    }
} satisfies Story;
LeftAligned.parameters = { controls: { include: ['displayType', 'item'] } };

export const CenterAligned: Story = {
    args: {
        displayType: "Center Aligned",
        item: {
            "id": 6,
            "iconHeight": "40px",
            "iconWidth": "40px",
            "icon": "truck",
            "iconFill": false,
            "iconstroke": true,
            "iconColorVarient": "primary",
            "title": "Free shipping",
            "description": "Free delivery is our main part of company we just price it into the products. Someone's paying for it, and it's not us."
        }
    }
} satisfies Story;
CenterAligned.parameters = { controls: { include: ['displayType', 'item'] } };

export const WithLabel: Story = {
    args: {
        displayType: "With Label",
        item: {
            "id": 7,
            "status": "Active",
            "colorVarient": "success",
            "imgSrc": "https://cdn4.vectorstock.com/i/1000x1000/45/38/gear-icon-line-symbol-vector-21084538.jpg",
            "imgHeight": "40px",
            "imgWidth": "40px",
            "title": "Free delivery all year long",
            "description": "Name another place that offers year long free delivery? We'll be waiting. Order now and you'll get delivery absolutely free."
        }
    }
} satisfies Story;
WithLabel.parameters = { controls: { include: ['displayType', 'item'] } };

export const WithoutLabel: Story = {
    args: {
        displayType: "Without Label",
        item: {
            "id": 7,
            "iconHeight": "40px",
            "iconWidth": "40px",
            "icon": "truck",
            "iconFill": false,
            "iconstroke": true,
            "iconColorVarient": "primary",
            "title": "Free shipping world wide",
            "description": "Free delivery is our main part of company"
        }
    }
} satisfies Story;
WithoutLabel.parameters = { controls: { include: ['displayType', 'item'] } };


export const HeadingWithIcon: Story = {
    args: {
        displayType: "Heading With Icon",
        item:
        {
            "iconHeight": "40px",
            "iconWidth": "40px",
            "icon": "truck",
            "iconFill": false,
            "iconstroke": true,
            "iconColorVarient": "primary",
            "title": "Free delivery all year long",
        }
    }
} satisfies Story;
HeadingWithIcon.parameters = { controls: { include: ['displayType', 'item'] } };


