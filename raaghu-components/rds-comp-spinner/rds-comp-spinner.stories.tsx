import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from "./rds-comp-spinner";

const meta: Meta = {
    title: 'Components/Spinner',
    component: RdsCompSpinner,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
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
        colorVariant: {
            options: ["primary", "secondary", "success", "danger", "warning", "info", "dark"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompSpinner>;

export default meta;
type Story = StoryObj<typeof RdsCompSpinner>;

export const Standard: Story = {
    args: {
        layout: SpinnerLayout.LabelAndSpinner,
        size: SpinnerSize.Small,
        showLabel: true,
        labelText:"Loading...",
        spinnerType: 'border',
        width: '50px',
        height: '50px',
        colorVariant: 'primary',
    },
} satisfies Story;
Standard.parameters = { controls: { include: ['spinnerType','size','colorVariant', 'width', 'height', 'showLabel', 'layout',"labelText"] } };