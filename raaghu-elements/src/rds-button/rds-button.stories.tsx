import type { Meta, StoryObj } from "@storybook/react";
import RdsButton from "./rds-button";

const meta: Meta = {
    title: "Elements/Button",
    component: RdsButton,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "success",
                "danger",
                "warning",
                "light",
                "info",
                "secondary",
                "dark",
            ],
            control: { type: "select" },
        },
        size: {
            options: [
                "small",
                "medium",
                "large"
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsButton>;

export default meta;
type Story = StoryObj<typeof RdsButton>;

export const Default: Story = {
    args: {
        colorVariant: "primary",
        label: "BUTTON",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : false,
    }
} satisfies Story;
Default.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","isRoundedButton"] } };

export const Disable: Story = {
    args: {
        colorVariant: "primary",
        label: "Disable",
        isDisabled: true,
        block: false,
        size: "medium",
        isRoundedButton : false,
    }
} satisfies Story;
Disable.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "isDisabled","isRoundedButton"] } };

export const WithIcon: Story = {
    args: {
        icon: "plus",
        colorVariant: "primary",
        size: "medium",
        isFabIcon: true,
    }
} satisfies Story;
WithIcon.parameters = { controls: { include: ["colorVariant", "icon", "size","isFabIcon"] } };

export const Outline: Story = {
    args: {
        isOutline: true,
        colorVariant: "primary",
        label: "BUTTON",
        block: false,
        size: "medium",
        isRoundedButton : false,
    }
} satisfies Story;
Outline.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "isOutline","isRoundedButton"] } };

export const Tooltip: Story = {
    args: {
        colorVariant: "primary",
        icon: "plus",
        block: false,
        size: "medium",
        databstoggle: "tooltip",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
        isRoundedButton : false,
    },
    argTypes: {
        tooltipPlacement: {
            options: [
                "right",
                "left",
                "top",
                "bottom",
            ],
            control: { type: "radio" },
        },
    }
} satisfies Story;
Tooltip.parameters = { controls: { include: ["colorVariant", "icon", "block", "size", "databstoggle", "tooltip", "tooltipPlacement", "tooltipTitle","isRoundedButton"] } };

export const TextWithIcon: Story = {
    args: {
        icon: "plus",
        colorVariant: "primary",
        label: "Button",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : false,
    }
} satisfies Story;
TextWithIcon.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner", "icon","isRoundedButton"] } };
export const RoundedButton: Story = {
    args: {
        colorVariant: "primary",
        label: "BUTTON",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : true,
    }
} satisfies Story;
RoundedButton.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner"] } };
export const LinkButton: Story = {
    args: {
        class : "btn-link",
        label : "Link Button",
      
    }
} satisfies Story;
LinkButton.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","isRoundedButton"] } };



