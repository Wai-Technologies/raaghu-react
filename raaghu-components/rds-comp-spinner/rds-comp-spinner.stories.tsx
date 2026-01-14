import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from "./rds-comp-spinner";

const meta: Meta = {
    title: 'Components/Spinner',
    component: RdsCompSpinner,
    parameters: {
        layout: 'padded',
        docs :{
              source :{
                transform:(code: string) => {
                    // Transform layout enum - remove spaces and transform
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={SpinnerLayout.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout:SpinnerLayout ${p1.replace(/\s+/g, "")}`);
                    // Transform size enum - remove spaces and transform
                    code = code.replace(/size="([^"]+)"/g, (match, p1) => `size={SpinnerSize.${p1.replace(/\s+/g, "")}}`);
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
    },
} satisfies Story;
Default.parameters = { controls: { include: ['spinnerType','size','colorVariant', 'showLabel', 'layout',"labelText"] } };