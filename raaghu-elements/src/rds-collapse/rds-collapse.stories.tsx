import RdsCollapse from "./rds-collapse";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Collapse',
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


export const CollapseView: Story = {
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
CollapseView.parameters = { controls: { include: ['buttonList'] } };



