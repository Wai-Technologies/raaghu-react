import RdsCompAiIcon from "./rds-comp-ai-icon";
import { Meta, StoryObj } from "@storybook/react-vite";
const meta: Meta = {
    title: 'Components/AI ChatBox/Icon',
    component: RdsCompAiIcon,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        color: {
            options: ["primary", "secondary", "success", "error", "warning", "light", "dark"],
            control: { type: "select" },
            description: "Icon color",
        },
        colorVariant: { control: { disable: true }, table: { disable: true } },
        name: {
            options: ["person-outline","users"],
            control: { type: "select" },
            description: "Material-UI icon name (can be extended using registerMaterialIcon)",
        }
    },
} satisfies Meta<typeof RdsCompAiIcon>;

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
        isCursorPointer: true,
    },
} satisfies Story;
Default.parameters = { controls: { include: ['name', 'width', 'height', 'color', 'isCursorPointer'] } };
