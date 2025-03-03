import RdsCheckboxGroup from "./rds-checkbox-group";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Checkbox Group',
    component: RdsCheckboxGroup,
    parameters: {
        layout: 'padded',
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
        state: "Checkbox",
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
