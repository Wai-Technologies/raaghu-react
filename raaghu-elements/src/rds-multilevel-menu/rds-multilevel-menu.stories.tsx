import RdsMultilevelMenu from "./rds-multilevel-menu";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Multilevel Menu",
    component: RdsMultilevelMenu,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            options: ["default", "large"],
            control: { type: "select" },
        },
        type: {
            options: ["selectable", "expandable"],
            control: { type: "select" },
        },
        state: {
            options: ["default", "hover", "selected"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsMultilevelMenu>;

export default meta;
type Story = StoryObj<typeof RdsMultilevelMenu>;

export const Default: Story = {
    args: {
        type: "expandable",
        state: "default",
        size: "default",
    }
} satisfies Story;

Default.parameters = {controls: {include: ['size', 'type', 'state']}};
