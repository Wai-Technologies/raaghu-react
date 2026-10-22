import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from 'storybook/test';

const meta: Meta<typeof RdsTextArea> = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        controls: {
            exclude: ['value', 'id', 'dataTestId', 'data-testid', 'onChange', 'onClick', 'onKeyDown', 'onFocus', 'onBlur', 'reset', 'validationPattern', 'validationMsg', 'multiUrl', 'isMultiUrl','customClasses']
        },
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={TextareaState.${p1}}`);
                    code = code.replace(/variant="([^"]+)"/g, (match, p1) => `variant={TextareaStyle.${p1.replace(/\s+/g, "")}}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        state: {
            control: 'select',
            options: ['Default', 'Active', 'Selected', 'Disabled', 'Error'],
            description: 'Current state of the text area'
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
        helperText: {
            control: 'text',
            description: 'Text shown under the field when it is in error'
        }
    } as any,
} satisfies Meta<typeof RdsTextArea>;

export default meta;
type Story = StoryObj<typeof RdsTextArea>;

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "Enter Description",
        state: TextareaState.Default,
        variant: TextareaStyle.Default,
        required: false,
        rows: 4
    }
};
