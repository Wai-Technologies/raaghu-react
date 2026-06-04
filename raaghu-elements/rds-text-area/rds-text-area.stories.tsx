import RdsTextArea, { TextareaState, TextareaStyle } from "./rds-text-area";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from 'storybook/test';

const meta: Meta<typeof RdsTextArea> = {
    title: 'Elements/Text Area',
    component: RdsTextArea,
    parameters: {
        layout: 'padded',
        controls: {
            exclude: ['value', 'id', 'dataTestId', 'onChange', 'onClick', 'onKeyDown', 'onFocus', 'onBlur', 'reset', 'validationPattern', 'validationMsg', 'isMultiUrl', 'customClasses']
        },
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={TextareaState.${p1}}`);
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={TextareaStyle.${p1.replace(/\s+/g, "")}}`);
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
        style: {
            control: 'select',
            options: ['Default', 'Pill', 'Bottom Outline'],
            description: 'Visual style variant of the text area'
        },
        isMandatory: {
            control: 'boolean',
            description: 'Whether the field is required'
        },
        showTitle: {
            control: 'boolean',
            description: 'Whether to show the label (true = show, false = hide)'
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
        style: TextareaStyle.Default,
        isMandatory: false,
        showTitle: true,
        rows: 4
    }
};
export const TypeText: Story = {
  name: 'Interaction: Type in textarea',
  args: {
    placeholder: 'Type here...',
    rows: 4,
    showTitle: true,
    style: TextareaStyle.Default,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await expect(textarea).toBeVisible()
    await userEvent.click(textarea)
    await expect(textarea).toHaveFocus()
    await userEvent.type(textarea, 'Hello Raaghu')
    await expect(textarea).toHaveValue('Hello Raaghu')
  }
};
