import { StoryObj, Meta } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';
import RdsCompSpinner, { SpinnerLayout, SpinnerSize, SpinnerLevel } from "./rds-comp-spinner";

const meta: Meta = {
    title: 'Components/Spinner',
    component: RdsCompSpinner,
    parameters: {
        layout: 'padded',
        docs :{
              source :{
                transform:(code: string) => {
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={SpinnerLayout.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout:SpinnerLayout ${p1.replace(/\s+/g, "")}`);
                    code = code.replace(/size="([^"]+)"/g, (match, p1) => `size={SpinnerSize.${p1.replace(/\s+/g, "")}}`);;
                    code = code.replace(/size:\s*"([^"]+)"/g, (match, p1) => `size:SpinnerSize ${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["Default", "Small", "Large",],
            control: { type: "select" },
            description: "Size of the spinner",
        },
        layout: {
            options: ["Label on bottom", "Spinner + Label", "Label + Spinner", "Label on top"],
            control: { type: "select" },
            description: "Layout of the spinner",
        },
        spinnerType: {
            options: [
                "grow",
                "border"
            ],
            control: { type: "select" },
            description: "Type of spinner",
        },
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "dark"],
            control: { type: "select" },
            description: "Color variant of the spinner",
        },
        level: {
            options: ["01", "02", "03", "04"],
            control: { type: "select" },
            description: "Customize the level of the spinner from 25% to 100%",
        },
    },
} satisfies Meta<typeof RdsCompSpinner>;

export default meta;
type Story = StoryObj<typeof RdsCompSpinner>;

export const Default: Story = {
    args: {
        layout: SpinnerLayout.LabelAndSpinner,
        size: SpinnerSize.Default,
        showLabel: true,
        labelText:"Loading...",
        spinnerType: 'border',
        width: '50px',
        height: '50px',
        colorVariant: 'primary',
        level: SpinnerLevel.Level04,
    },
} satisfies Story;
Default.parameters = { controls: { include: ['spinnerType','size','colorVariant', 'showLabel', 'layout',"labelText", 'level'] } };

export const SpinnerVisible: Story = {
    name: 'Interaction: Spinner Renders',
    args: {
        layout: SpinnerLayout.LabelAndSpinner,
        size: SpinnerSize.Default,
        showLabel: true,
        labelText: 'Loading...',
        spinnerType: 'border',
        colorVariant: 'primary',
        level: SpinnerLevel.Level04,
    },
    play: async ({ canvasElement }) => {
        const spinner = canvasElement.querySelector(
            '[class*="spinner"], [role="progressbar"]'
        )
        await expect(spinner).not.toBeNull()
        await expect(spinner).toBeVisible()
    }
} satisfies Story;