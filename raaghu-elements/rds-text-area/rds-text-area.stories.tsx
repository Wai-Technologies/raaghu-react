import RdsTextArea from "./rds-text-area";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
        status: { type: 'stable' },
        layout: 'padded',
        controls: {
            exclude: ['value', 'id', 'dataTestId', 'data-testid', 'onChange', 'onClick', 'onKeyDown', 'onFocus', 'onBlur', 'reset', 'validationPattern', 'validationMsg', 'isMultiUrl', 'customClasses']
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        style: {
            control: 'select',
            options: ['Default', 'Pill', 'Bottom Outline'],
            description: 'Visual style variant of the text area'
        },
        isMandatory: {
            control: 'boolean',
            description: 'Whether the field is required'
        },
        error: {
            control: 'boolean',
            description: 'Forces the error appearance'
        },
        selected: {
            control: 'boolean',
            description: 'Applies the selected appearance'
        },
        helperText: {
            control: 'text',
            description: 'Text shown under the field when it is in error'
        }
    }
} satisfies Meta<typeof RdsTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Enter Description",
        style: 'Default',
        selected: false,
        isMandatory: false,
        rows: 4
    }
};
