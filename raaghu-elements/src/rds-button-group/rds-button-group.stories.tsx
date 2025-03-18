import RdsButtonGroup from "./rds-button-group";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Button Group',
    component: RdsButtonGroup,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "light",
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
    },
} satisfies Meta<typeof RdsButtonGroup>;

export default meta;
type Story = StoryObj<typeof RdsButtonGroup>;



export const Default: Story = {
    args: {
        vertical: false,
        size: "medium",
        colorVariant: "primary",
        role: "button",
        buttonGroupItems: [
            {
                label: "Left",
                id: "",
                name: "",

            },
            {
                label: "Middle",
                id: "",
                name: "",
            },
            {
                label: "Right",
                id: "",
                name: "",
            }

        ]
    }
} satisfies Story;
Default.parameters = { controls: { include: ['vertical', 'size', 'colorVariant', 'buttonGroupItems'] } };


export const CheckboxButtonGroup: Story = {
    args: {
        vertical: false,
        size: "medium",
        colorVariant: "primary",
        isOutline: true,
        role: "checkbox",
        buttonGroupItems: [
            {
                label: "Checkbox 1",
                id: "checkbox1",
                name: "",

            },
            {
                label: "Checkbox 2",
                id: "checkbox2",
                name: "",
            },
            {
                label: "Checkbox 3",
                id: "checkbox3",
                name: "",
            }

        ]
    }
} satisfies Story;
CheckboxButtonGroup.parameters = { controls: { include: ['vertical', 'size', 'colorVariant', 'isOutline', 'buttonGroupItems'] } };

export const IconButtonGroup: Story = {
    args: {
        vertical: false,
        size: "medium",
        colorVariant: "primary",
        role: "button",
        isOutline: true,
        buttonGroupItems: [
            {
                label: "",
                id: "",
                name: "",
                icon: "plus",
                iconWidth: "14px",
                iconHeight: "14px",
                colorVariant: "light"
            },
            {
                label: "",
                id: "",
                name: "",
                icon: "pencil",
                iconWidth: "14px",
                iconHeight: "14px",
                colorVariant: "light"
            },
            {
                label: "",
                id: "",
                name: "",
                icon: "delete",
                iconWidth: "14px",
                iconHeight: "14px",
                colorVariant: "light"
            }

        ]
    }
} satisfies Story;
IconButtonGroup.parameters = { controls: { include: ['vertical', 'size', 'colorVariant', 'isOutline', 'buttonGroupItems'] } };

export const RadioButtonGroup: Story = {
    args: {
        vertical: false,
        size: "medium",
        colorVariant: "primary",
        isOutline: true,
        role: "radio",
        buttonGroupItems: [
            {
                label: "radio1",
                id: "radio1",
                name: "btnradio",
                checked: true
            },
            {
                label: "radio2",
                id: "radio2",
                name: "btnradio",
                checked: true
            },
            {
                label: "radio3",
                id: "radio3",
                name: "btnradio",
                checked: true
            }

        ]
    }
} satisfies Story;
RadioButtonGroup.parameters = { controls: { include: ['vertical', 'size', 'colorVariant', 'isOutline', 'buttonGroupItems'] } };



export const Vertical: Story = {
    args: {
        vertical: true,
        size: "medium",
        colorVariant: "primary",
        role: "button",
        buttonGroupItems: [
            {
                label: "Left",
                id: "",
                name: "",
            },
            {
                label: "Middle",
                id: "",
                name: "",
            },
            {
                label: "Right",
                id: "",
                name: "",
            }

        ]
    }
} satisfies Story;
Vertical.parameters = { controls: { include: ['vertical', 'size', 'colorVariant', 'buttonGroupItems'] } };

