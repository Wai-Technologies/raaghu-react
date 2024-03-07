import RdsCollapse from "./rds-collapse";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Collapse',
    component: RdsCollapse,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCollapse>;


export default meta;
type Story = StoryObj<typeof RdsCollapse>;


export const Collapse: Story = {
    args: {
        buttonList: [
            {
                "colorVariant": "primary",
                "label": "Toggle Element",
                "id": "collapseExample"
            }
        ],
    }
} satisfies Story;
Collapse.parameters = { controls: { include: ['buttonList'] } };



