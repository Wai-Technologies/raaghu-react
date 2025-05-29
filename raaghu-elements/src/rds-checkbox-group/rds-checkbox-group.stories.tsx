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


export const MultiOptionCheckbox: Story = {
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
    }
}
MultiOptionCheckbox.parameters = { controls: { include: ['state', 'label', 'isInline', 'isDisabled', 'isSwitch', 'itemList', 'errorMessage'] } };
