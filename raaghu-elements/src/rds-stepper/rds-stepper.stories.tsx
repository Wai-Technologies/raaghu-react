import RdsStepper from "./rds-stepper";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Stepper',
    component: RdsStepper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsStepper>;

export default meta;
type Story = StoryObj<typeof RdsStepper>;

export const Simple: Story = {
    args: {
        stepperType: "simple",
    }
} satisfies Story;
Simple.parameters = { controls: { include: ['stepperType'] } };

