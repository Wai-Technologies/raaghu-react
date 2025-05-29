import RdsRange from "./rds-range";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Range',
    component: RdsRange,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Range** component provides a customizable slider input for selecting a numeric value within a specified range. It accepts \`min\` and \`max\` props to define the bounds of the range, and the \`rangeType\` prop to control the visual style or behavior of the slider. Supported types include \`default\`, \`type1\`, and \`type2\`, each offering distinct UI variations. This component is useful for filtering, setting values, or any interface requiring intuitive numeric input within limits.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsRange>;

export default meta;
type Story = StoryObj<typeof RdsRange>;

export const Default: Story = {
    args: {
        max: 200,
        min: 10,
        rangeType: "default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['max', 'min', 'rangeType'] } };

export const RangeType_1: Story = {
    args: {
        max: 200,
        min: 10,
        rangeType: "type1"
    }
} satisfies Story;
RangeType_1.parameters = { controls: { include: ['max', 'min', 'rangeType'] } };

export const RangeType_2: Story = {
    args: {
        max: 200,
        min: 10,
        rangeType: "type2"
    }
} satisfies Story;
RangeType_2.parameters = { controls: { include: ['max', 'min', 'rangeType'] } };




