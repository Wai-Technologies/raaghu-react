import RdsDoubleRange from "./rds-double-range";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Double Range',
    component: RdsDoubleRange,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        doubleRangeType: {
            options: ["default", "type_1", "type_2"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsDoubleRange>;

export default meta;
type Story = StoryObj<typeof RdsDoubleRange>;

export const RangeSlider: Story = {
    args: {
        max: 100,
        min: 0,
        doubleRangeType: "default"
    }
} satisfies Story;
RangeSlider.parameters = { controls: { include: ['max', 'min', 'doubleRangeType'] } };


