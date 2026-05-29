import RdsCompProductTour from "./rds-comp-product-tour";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';

const meta: Meta = {
    title: "Components/Product Tour",
    component: RdsCompProductTour,
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
} satisfies Meta<typeof RdsCompProductTour>;

export default meta;
type Story = StoryObj<typeof RdsCompProductTour>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
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
        formTitle:" Getting Started Tour",
        header: "Tour Title",
        description: "In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.",
        stepsIndicator: "1/3",
        tabTitle: ["Designers", "Developers", "Managers"],
        slides: [
            { id: 1, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
            { id: 2, imgUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"},
            { id: 3, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
            { id: 4, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
            { id: 5, imgUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"},
            { id: 6, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
            { id: 7, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
            { id: 8, imgUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"},
            { id: 9, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
            { id: 10, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"},
        ],
    },
};