import RdsDatepicker, { RdsDatepickerProps } from "./rds-datepicker";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Datepicker',
    component: RdsDatepicker,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ["default", "advanced", "withTime"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsDatepicker>;

export default meta;
type Story = StoryObj<typeof RdsDatepicker>;

export const Default: Story = {
    args: {
        DatePickerLabel: "Select Date",
        type: "default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['DatePickerLabel', 'type'] } };

export const Advanced: Story = {
    args: {
        DatePickerLabel: "Select Date",
        type: "advanced"
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['DatePickerLabel', 'type'] } };

export const WithTime: Story = {
    args: {
        DatePickerLabel: "Select Date",
        type: "withTime"
    }
} satisfies Story;
WithTime.parameters = { controls: { include: ['DatePickerLabel', 'type'] } };
