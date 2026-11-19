import RdsCompAiFabMenu from "./rds-comp-ai-fab-menu";
import { Meta, StoryObj } from "@storybook/react-vite";
const meta: Meta = {
    title: 'Components/AI ChatBox/Fab Menu',
    component: RdsCompAiFabMenu,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <div className="rds-fab-menu-offset">
                <Story />
            </div>
        )
    ],
    tags: ['autodocs', 'stable'],
    argTypes: {
        color: {
            options: [
                "primary",
                "secondary",
                "success",
                "warning",
                "error",
                "dark",
                "light",
            ],
            control: { type: "select" },
            description: "Button color",
        },
        colorVariant: { control: { disable: true }, table: { disable: true } },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        alignment: {
            options: ["left", "right"],
            control: { type: "select" },
        },
        menuIcon: {
            options: ["list", "users", "person-outline", "refresh", "export", "delete", "download"],
            control: { type: "select" },
            description: "Icon for the fab menu button (icons registered by this component)"
        },
        backgroundType: {
            options: ["circular", "rectangular", "none"],
            control: { type: "select" },
            description: "Background type for the menu button"
        },
    },
} satisfies Meta<typeof RdsCompAiFabMenu>;

export default meta;
type Story = StoryObj<typeof RdsCompAiFabMenu>;

export const Default: Story = {
    args: {
        color: "light",
        size: "medium",
        menuIcon: "list",
        alignment: "left",
        backgroundType: "circular",
        listItems: [
            { value: "New Role", key: "new", icon: "users" },
            { value: "Refresh", key: "refresh", icon: "refresh" },
            { value: "Export to excel", key: "export", icon: "export" },
            { value: "Delete", key: "delete", icon: "delete" },
            { value: "Download", key: "download", icon: "download" },
        ]
    },
} satisfies Story;
Default.parameters = { controls: { include: ['color', 'menuIcon', 'size', 'backgroundType', 'alignment', 'listItems'] } };
