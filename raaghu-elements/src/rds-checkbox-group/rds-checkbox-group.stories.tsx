import RdsCheckboxGroup, { CheckboxState } from "./rds-checkbox-group";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Checkbox Group',
    component: RdsCheckboxGroup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
  component: `The **Checkbox Group** component provides a flexible and accessible way to present multiple related checkbox options as a single group. It supports different visual states such as \`Checkbox\` (default), \`Indeterminate\`, and \`ErrorCheckbox\` to clearly communicate selection status or validation errors.
The component allows configuration of inline display for horizontal layouts and can optionally render as toggle switches using the \`isSwitch\` prop. Each checkbox item within the group is defined through the \`itemList\` prop, which includes properties like \`id\`, \`label\`, \`checked\`, and \`disabled\`, enabling granular control over individual checkbox behavior and appearance.
An optional \`errorMessage\` prop provides user feedback when validation fails, enhancing form usability. This component is ideal for forms, filters, and settings panels where multiple selections are required, ensuring a consistent and user-friendly interface across applications.`
}
,
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(Checkbox|Indeterminate|ErrorCheckbox)"/g, '{CheckboxState.$1}');
                    return code;
                },
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            options: ["Checkbox", "Indeterminate", "ErrorCheckbox"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof RdsCheckboxGroup>;


export const Default: Story = {
    args: {
        state: CheckboxState.Checkbox,
        isSwitch: false,
        isInline: false,
        label: "Checkbox Group",
        itemList: [
            {
                id: 1,
                label: "Child Checkbox 1",
                checked: false,
                disabled: false,
            },
            {
                id: 2,
                label: "Child Checkbox 2",
                checked: false,
                disabled: false,
            },
            {
                id: 3,
                label: "Child Checkbox 3",
                checked: false,
                disabled: false,
            },
        ],
        errorMessage: "Error Message",
        multiOptionCheck:true,
    }
}
Default.parameters = { controls: { include: ['state', 'label', 'isInline', 'isDisabled', 'isSwitch', 'itemList', 'errorMessage'] } };

export const Advanced: Story = {
    args: {
        userData: [
            {
                id: 1,
                label: "Parent Checkbox 1",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                childList: [
                    {
                        id: 1,
                        parent_id: 1,
                        label: "Child Checkbox 1",
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 2,
                        parent_id: 1,
                        label: "Child Checkbox 2",
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 3,
                        parent_id: 1,
                        label: "Child Checkbox 3",
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 4,
                        parent_id: 1,
                        label: "Child Checkbox 4",
                        isSelected: false,
                        disabled: false,
                    },
                ],
            },
            {
                id: 2,
                label: "Parent Checkbox 2",
                isSelected: false,
                isIntermediate: false,
                isClosed: false,
                disabled: false,
                childList: [
                    {
                        id: 1,
                        parent_id: 2,
                        label: "Child Checkbox 1",
                        isSelected: true,
                        disabled: false,
                    },
                    {
                        id: 2,
                        parent_id: 2,
                        label: "Child Checkbox 2",
                        isSelected: true,
                        disabled: false,
                    },
                ],
            },
        ],
        multiOptionCheck: false,
    }
} satisfies Story;
Advanced.parameters = { controls : { include: ['userData'] } };