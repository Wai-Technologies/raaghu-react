import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompSpinner, { SpinnerLayout, SpinnerSize, SpinnerLevel } from "./rds-comp-spinner";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Spinner',
    component: RdsCompSpinner,
    parameters: {
            status: { type: 'stable' },
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
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the spinner root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the spinner root.' },
        ref: { control: false, description: 'React ref to the spinner root; assign it in code.' },
        size: {
            options: ["default", "small", "medium", "large"],
            control: { type: "select" },
            description: "Size of the spinner",
        },
        layout: {
            options: ["Label on bottom", "Spinner + Label", "Label + Spinner", "Label on top"],
            control: { type: "select" },
            description: "Layout of the spinner",
        },
        variant: {
            options: [
                "grow",
                "border"
            ],
            control: { type: "select" },
            description: "Type of spinner",
        },
        color: {
            options: ["primary", "secondary", "success", "error", "warning", "dark"],
            control: { type: "select" },
            description: "Color of the spinner (`danger` is still accepted as an alias of `error`, and `info` as an alias of `primary`)",
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
        label:"Loading...",
        variant: 'border',
        width: '50px',
        height: '50px',
        color: 'primary',
        level: SpinnerLevel.Level04,
    },
    play: async ({ canvas }) => {
        const spinner = await canvas.findByRole('status', { hidden: true });
        await expect(spinner).toBeInTheDocument();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['variant','size','color', 'showLabel', 'layout',"label", 'level', 'className', 'sx', 'ref'] } };
