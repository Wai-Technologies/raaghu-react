import RdsBenefit from "./rds-benefit";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Benefits',
    component: RdsBenefit,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Benefits** component is designed to highlight key advantages or features in a visually appealing and customizable manner. It supports multiple display types such as \`Default\`, \`Left Aligned\`, \`Center Aligned\`, \`With Label\`, \`Without Label\`, and \`Heading With Icon\`, allowing flexible presentation to suit different UI contexts and design needs.

Each benefit item is defined through the \`item\` prop, which includes properties like \`title\`, \`description\`, and icon-related settings such as \`icon\`, \`iconHeight\`, \`iconWidth\`, \`iconFill\`, \`iconstroke\`, and \`iconColorVarient\`. The component can display either vector icons or images (in the case of the \`With Label\` variant), along with optional status labels and color variants to convey state or emphasis.

This component is ideal for showcasing service highlights, product features, or promotional points in marketing pages, dashboards, or landing sections. Its versatility in layout and styling ensures that benefits can be communicated clearly and attractively across different screen sizes and design themes.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsBenefit>;

export default meta;
type Story = StoryObj<typeof RdsBenefit>;

export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['displayType', 'item'] } };

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


