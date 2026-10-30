import RdsTextArea from "./rds-text-area";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
        status: { type: 'stable' },
        layout: 'padded',
        controls: {
            exclude: ['value', 'id', 'dataTestId', 'data-testid', 'onChange', 'onClick', 'onKeyDown', 'onFocus', 'onBlur', 'reset', 'validationPattern', 'validationMsg', 'multiUrl', 'isMultiUrl', 'customClasses']
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class applied to the text area container.',
            table: { category: 'Root props' }
        },
        sx: {
            control: 'object',
            description: 'MUI system styles applied to the text area container.',
            table: { category: 'Root props' }
        },
        ref: {
            control: false,
            description: 'React ref to the textarea element. Assign in code; refs cannot be set through Controls.',
            table: { category: 'Root props' }
        },
        variant: {
            control: 'select',
            options: ['Default', 'Pill', 'Bottom Outline'],
            description: 'Visual style variant of the text area'
        },
        required: {
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
        variant: 'Default',
        selected: false,
        required: false,
        rows: 4
    }
};
