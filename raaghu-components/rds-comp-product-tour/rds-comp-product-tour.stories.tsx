import RdsCompProductTour from "./rds-comp-product-tour";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';

const meta: Meta = {
    title: "Components/Product Tour",
    component: RdsCompProductTour,
    parameters: {
            status: { type: 'stable' },
        layout: "padded",
    },
    tags: ["autodocs", 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the product tour root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the product tour root.' },
        ref: { control: false, description: 'React ref to the product tour root; assign it in code.' },
        variant: {
            options: ["Image", "Carousel", "Form", "GIF"],
            control: { type: "select" },
        },
        anchorCorner: {
            options: ["top-left", "top-right", "bottom-left", "bottom-right", "top", "bottom", "all"],
            control: { type: "select" },
            description: "Corner dots: one corner, `top` (both top), `bottom` (both bottom), or `all` (four dots).",
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
        variant: "Image",
        anchorCorner: "top-left",
        showDismiss: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showTertiaryButton: true,
        showVisualPlaceholder: true,
        subtitle:" Getting Started Tour",
        title: "Tour Title",
        description: "In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.Aliquam erat vo.In a laoreet purus.",
        steps: 3,
        activeStep: 1,
        items: ["Designers", "Developers", "Managers"],
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