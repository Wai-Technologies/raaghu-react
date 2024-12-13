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
        datepickerStyle: {
            options: ["Dropdown", "Selector"],
            control: { type: "select" },
        },
        layout: {
            options: ["Default", "Month Picker", "Year Picker", "Multi Month"],
            control: { type: "select" },
        }, 
    },
} satisfies Meta<typeof RdsDatepicker>;

export default meta;
type Story = StoryObj<typeof RdsDatepicker>;

export const Default: Story = {
    args: {
        title: "Date",
        showTitle: true,
        datepickerStyle: "Dropdown",
        type: "default",
        isMandatory : true,
        placeholderText: "Select Date",
        layout: "Default",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['layout', 'showTitle','title','isMandatory','placeholderText','datepickerStyle'] } };

export const Advanced: Story = {
    args: {
        title: "Date",
        showTitle: true,
        datepickerStyle: "Dropdown",
        type: "advanced",
        isMandatory : true,
        placeholderText: "Select Date",
        layout: "Default",
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['layout', 'showTitle','title','isMandatory','placeholderText','datepickerStyle'] } };

export const WithTime: Story = {
    args: {
        title: "Date",
        showTitle: true,
        datepickerStyle: "Dropdown",
        type: "withTime",
        isMandatory : true,
        placeholderText: "Select Date",
    }
} satisfies Story;
WithTime.parameters = { controls: { include: ['showTitle','title','isMandatory','placeholderText','datepickerStyle'] } };
