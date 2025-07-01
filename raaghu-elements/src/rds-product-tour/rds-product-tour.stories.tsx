import RdsProductTour from "./rds-product-tour";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: "Elements/Product Tour",
    component: RdsProductTour,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        state: {
            options: ["Image", "Carousel", "Form", "GIF"],
            control: { type: "select" },
        },
        topLeft: {
            name: "Top Left Dot",
            control: { type: "boolean" },
        },
        topRight: {
            name: "Top Right Dot",
            control: { type: "boolean" },
        },
        bottomLeft: {
            name: "Bottom Left Dot",
            control: { type: "boolean" },
        },
        bottomRight: {
            name: "Bottom Right Dot",
            control: { type: "boolean" },
        },
        showDismiss: {
            name: "Show Dismiss",
            control: { type: "boolean" },
        },
        showPrimaryButton: {
            name: "Show Primary Button",
            control: { type: "boolean" },
        },
        showSecondaryButton: {
            name: "Show Secondary Button",
            control: { type: "boolean" },
        },
        showTertiaryButton: {
            name: "Show Tertiary Button",
            control: { type: "boolean" },
        },
        showVisualPlaceholder: {
            name: "Show Visual Placeholder Button",
            control: { type: "boolean" },
        },
    },
} satisfies Meta<typeof RdsProductTour>;

export default meta;
type Story = StoryObj<typeof RdsProductTour>;

export const Default: Story = {
    args: {
        state: "Image",
        topLeft: true,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
        showDismiss: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showTertiaryButton: true,
        showVisualPlaceholder: true,
        header: "Tour Title",
        description: "In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.",
        stepsIndicator: "1/3"
    },
};

export const WithCarousel: Story = {
    args: {
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
        showDismiss: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showTertiaryButton: true,
        showVisualPlaceholder: true,
        state: "Carousel",
        header: "Tour Title",
        description: "In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.",
        stepsIndicator: "1/3"
    },
};
export const WithForm: Story = {
    args: {
        topLeft: true,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
        showDismiss: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showTertiaryButton: true,
        showVisualPlaceholder: true,
        state: "Form",
        header: "Tour Title",
        description: "In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.",
        stepsIndicator: "1/3"

    },
};
export const WithGIF: Story = {
    args: {
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
        showDismiss: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showTertiaryButton: true,
        showVisualPlaceholder: true,
        state: "GIF",
        header: "Tour Title",
        description: "In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.",
        stepsIndicator: "1/3"
    },
};
