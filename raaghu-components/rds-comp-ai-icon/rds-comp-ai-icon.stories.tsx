import React from "react";
import RdsCompAiIcon, { registerMaterialIcon, registerMaterialIcons } from "./rds-comp-ai-icon";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/AI ChatBox/Icon',
    component: RdsCompAiIcon,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Icon** component renders scalable vector icons with customizable properties such as \`name\`, \`width\`, and \`height\`. It supports styling options including \`fill\` and \`stroke\` toggles, various \`colorVariant\` themes, and an optional cursor pointer for interactivity. The component also supports displaying images as icons via an \`imageUrl\` prop. Additionally, it can show tooltips with configurable placement and titles to enhance usability. This makes the Icon component versatile for UI designs requiring interactive icons, buttons, or image placeholders with rich styling and accessibility features.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "success", "danger", "warning", "light", "info", "secondary", "dark"],
            control: { type: "select" },
        },
        name: {
            options: ["users", "person-outline"],
            control: { type: "select" },
            description: "Material-UI icon name (can be extended using registerMaterialIcon)",
        }
    },
} satisfies Meta<typeof RdsCompAiIcon>;

export default meta;
type Story = StoryObj<typeof RdsCompAiIcon>;

export const Default: Story = {
    args: {
        name: "users",
        width: "24px",
        height: "24px",
        fill: false,
        stroke: true,
        colorVariant: "primary",
        isCursorPointer: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['name', 'width', 'height', 'fill', 'stroke', 'colorVariant', 'isCursorPointer'] } };
