import RdsCompButtonGroup, { Role } from "./rds-comp-button-group";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Button Group',
    component: RdsCompButtonGroup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
  component: `The **Button Group** component is designed to organize multiple buttons into a cohesive, interactive set that enhances user experience by grouping related actions. It supports various configurations such as \`Default\` (standard horizontal buttons), \`Checkbox Button Group\` (toggleable buttons allowing multiple selections), \`Icon Button Group\` (icon-only buttons for compact, intuitive action sets), \`Radio Button Group\` (mutually exclusive buttons for single selection), and \`Vertical\` (buttons arranged vertically for sidebars or vertical menus).

Each button within the group is customizable with properties including \`label\`, \`id\`, \`name\`, \`icon\`, and \`colorVariant\`, allowing for versatile styling and behavior tailored to different interface requirements. The component supports different sizes (\`small\`, \`medium\`, \`large\`), color variants (such as \`primary\`, \`secondary\`, \`success\`, \`danger\`), and outline styles to fit various design themes and accessibility needs.

This component is ideal for toolbars, navigation controls, filter options, or any UI where related buttons need to be visually and functionally grouped for clarity and ease of use. Its flexibility in layout and role-based configurations ensures it can be adapted to diverse user interaction patterns across applications.`
}
,
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(checkbox|radio|button)"/g, '{Role.$1}');
                    return code;
                },
            },
        },
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
} satisfies Meta<typeof RdsCompButtonGroup>;

export default meta;
type Story = StoryObj<typeof RdsCompButtonGroup>;



export const Default: Story = {
    args: {
        vertical: false,
        size: "medium",
        colorVariant: "primary",
        role: Role.Button,
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
        role: Role.Checkbox,
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
        role: Role.Button,
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
        role: Role.Radio,
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
        role: Role.Button,
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

