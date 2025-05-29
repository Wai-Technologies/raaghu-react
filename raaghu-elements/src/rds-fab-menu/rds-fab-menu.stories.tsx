import React from "react";
import RdsFabMenu from "./rds-fab-menu";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Fab Menu',
    component: RdsFabMenu,
    parameters: {
        layout: 'padded',
        docs:{
            description: {component: `The **Fab Menu** component is a floating action button that expands into a collapsible menu, providing quick access to a list of actions. It supports multiple color variants such as \`primary\`, \`secondary\`, \`success\`, \`info\`, \`warning\`, \`danger\`, \`dark\`, and \`light\`, and offers size options \`small\`, \`medium\`, and \`large\` for flexible UI integration. The \`listItems\` prop defines the menu options, each with properties like \`value\`, \`key\`, \`icon\`, and customizable icon dimensions, enabling rich and intuitive menu entries. This component is ideal for providing contextual shortcuts in applications, enhancing user productivity with an elegant, space-saving interface.`}

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
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsFabMenu>;

export default meta;
type Story = StoryObj<typeof RdsFabMenu>;


export const CollapsibleMenu: Story = {
    args: {
        colorVariant: "primary",
        listItems: [
            { value: "New Role", some: "value", key: "new", icon: "users", iconWidth: "20px", iconHeight: "20px" },
            { value: "Refresh", some: "value", key: "refresh", icon: "refresh", iconWidth: "20px", iconHeight: "20px" },
            { value: "Export to excel", some: "value", key: "export", icon: "export", iconWidth: "20px", iconHeight: "20px" },
            { value: "Delete", some: "value", key: "delete", icon: "delete", iconWidth: "20px", iconHeight: "20px" },
            { value: "Click here download sample import file.", some: "value", key: "download", icon: "download", iconWidth: "20px", iconHeight: "20px" },
        ]
    }
} satisfies Story;
CollapsibleMenu.parameters = { controls: { include: ['colorVariant', 'listItems'] } };
