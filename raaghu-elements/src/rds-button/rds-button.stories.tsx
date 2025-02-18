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
                "secondary",
                "tertiary",
                "neutral",
                "error",
                "warning",
                "success",
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
        },
        textCase: {
            options: [
                "uppercase",
                "lowercase",
                "capitalize",
                "unset"
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
        label: "Button",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : false,
        textCase: "uppercase",
    }
} satisfies Story;
Default.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","isRoundedButton","textCase"] } };

export const Disable: Story = {
    args: {
        colorVariant: "primary",
        label: "Disable",
        isDisabled: true,
        block: false,
        size: "medium",
        isRoundedButton : false,
        textCase: "capitalize",
    }
} satisfies Story;
Disable.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "isDisabled","isRoundedButton","textCase"] } };

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
        label: "Button",
        block: false,
        size: "medium",
        isRoundedButton : false,
        textCase: "uppercase",
    }
} satisfies Story;
Outline.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "isOutline","isRoundedButton","textCase"] } };

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
        textCase: "capitalize",
    }
} satisfies Story;
TextWithIcon.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner", "icon","isRoundedButton","textCase"] } };

export const RoundedButton: Story = {
    args: {
        colorVariant: "primary",
        label: "Button",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
        isRoundedButton : true,
        textCase: "uppercase",
    }
} satisfies Story;
RoundedButton.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","textCase"] } };

export const LinkButton: Story = {
    args: {
        class : "btn-link",
        label : "Link Button",      
        textCase: "capitalize",
    }
} satisfies Story;
LinkButton.parameters = { controls: { include: ["colorVariant", "label", "block", "size", "showLoadingSpinner","isRoundedButton","textCase"] } };



