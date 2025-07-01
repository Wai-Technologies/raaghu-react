import { StoryObj, Meta } from "@storybook/react-vite";
import RdsSpinner, { SpinnerLayout, SpinnerSize } from "./rds-spinner";

const meta: Meta = {
    title: 'Elements/Spinner',
    component: RdsSpinner,
    parameters: {
        layout: 'padded',
        docs : {
            description: {
  component: `The **Spinner** element is a versatile and essential loading indicator designed to signal ongoing processes such as data fetching, form submissions, or page transitions. It supports multiple **spinner types** (\`border\`, \`grow\`) and is available in various **sizes** (\`Small\`, \`Default\`, \`Large\`) through the \`SpinnerSize\` enum. The layout of the spinner and its label can be customized using the \`SpinnerLayout\` enum, allowing placement of the label above, below, or beside the spinner. Optional props like \`showLabel\`, \`labelText\`, and color variants enable further personalization. The component also supports **custom dimensions** using \`width\` and \`height\` props when size is set to custom. It is ideal for use in dashboards, buttons, modals, or any section requiring visual loading feedback aligned with your design system.`,
}
,
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
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        size: {
            options: ["Default", "Small", "Large",],
            control: { type: "select" },
        },
        layout: {
            options: ["Label on bottom", "Spinner + Label", "Label + Spinner", "Label on top"],
            control: { type: "select" },
        },
        spinnerType: {
            options: [
                "grow",
                "border"
            ],
            control: { type: "radio" },
        },
        width: {
            control: { type: 'text' },
            if: { arg: 'size', eq: 'custom' },
        },
        height: {
            control: { type: 'text' },
            if: { arg: 'size', eq: 'custom' },
        }
    },
} satisfies Meta<typeof RdsSpinner>;

export default meta;
type Story = StoryObj<typeof RdsSpinner>;

export const Default: Story = {
    args: {
        layout: SpinnerLayout.LabelAndSpinner,
        size: SpinnerSize.Small,
        showLabel: true,
        labelText:"Loading...",
        spinnerType: 'border',
        colorVariant: 'primary',
        width: '50px',
        height: '50px',
    },
} satisfies Story;
Default.parameters = { controls: { include: ['spinnerType','size','colorVariant', 'width', 'height', 'showLabel', 'layout',"labelText"] } };