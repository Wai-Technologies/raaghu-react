import RdsCompAiIcon from "./rds-comp-ai-icon";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

const meta: Meta<typeof RdsCompAiIcon> = {
    title: "Components/AI ChatBox/Icon",
    component: RdsCompAiIcon,
    parameters: {
        status: { type: "stable" },
        layout: "padded",
    },
    tags: ["autodocs", "stable"],
    argTypes: {
        className: { control: "text", description: "CSS class applied to the rendered icon." },
        sx: { control: "object", description: "MUI system styles applied to the rendered icon." },
        ref: { control: false, description: "React ref to the rendered icon element; assign it in code." },
        svgIcon: { control: false, description: "Custom SVG icon component." },
        color: {
            options: [
                "primary",
                "success",
                "error",
                "warning",
                "light",
                "info",
                "secondary",
                "dark",
            ],
            control: { type: "select" },
        },
        name: {
            options: ["person-outline", "users"],
            control: { type: "select" },
            description:
                "Material-UI icon name (can be extended using registerMaterialIcon)",
        },
    },
};

export default meta;
type Story = StoryObj<typeof RdsCompAiIcon>;

export const Default: Story = {
    args: {
        name: "person-outline",
        width: "24px",
        height: "24px",
        fill: false,
        stroke: true,
        color: "primary",
        cursorPointer: true,
    },
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
};

Default.parameters = {
    controls: {
        include: [
            "name",
            "width",
            "height",
            "color",
            "cursorPointer",
            "className",
            "sx",
            "ref",
        ],
    },
};
