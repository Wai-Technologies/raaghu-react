import RdsStat from "./rds-stat";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Stat',
    component: RdsStat,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Stat** component displays key statistical data in either a basic or advanced format. It accepts a \`displayType\` prop to toggle between "basic" and "advanced" views. The \`colorVariant\` prop controls the color theme, supporting options like "primary", "secondary", "success", "info", "warning", "danger", "dark", and "light". The \`items\` prop is an array of stat objects, each containing properties such as \`title\` (label for the stat), \`value\` (numeric or string data), and optionally \`icon\` details including icon name, size, and styling options. The basic display type includes icons alongside the data, while the advanced type focuses on a clean textual representation. This component is ideal for dashboards, analytics, or any interface requiring prominent display of key metrics.`
}

        }
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
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsStat>;

export default meta;
type Story = StoryObj<typeof RdsStat>;

export const Default: Story = {
    args: {
        displayType: "basic",
        colorVariant: "primary",
        items: [
            {
                title: "Downloads",
                value: "2370",
                icon: "cloud_download",
                iconHeight: "80px",
                iconWidth: "80px",
                iconFill: false,
                iconStroke: true
            },
        ],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['displayType', 'colorVariant', 'items'] } };

export const Advanced: Story = {
    args: {
        displayType: "advanced",
        colorVariant: "primary",
        items: [
            {
                title: "Downloads",
                value: "2370"
            },
        ],
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['displayType', 'colorVariant', 'items'] } };