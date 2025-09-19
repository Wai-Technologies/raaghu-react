import RdsCompDatePicker, { DatePickerDemo } from "./rds-comp-date-and-time-picker";
import { Meta, StoryObj } from "@storybook/react";
import dayjs from 'dayjs';

const meta: Meta = { 
    title: "Components/Date Time Picker",
    component: RdsCompDatePicker,
    parameters: {
        layout: 'padded',
        controls: {exclude: ['type']},
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['date', 'time', 'datetime', 'daterange', 'timerange', 'datetimerange'],
            description: 'The type of date picker to display'
        },
        layout: {
            control: { type: 'select' },
            options: ['Default', 'Year Picker', 'Month Picker', 'Multi Month'],
            description: 'Layout of the date picker (only for date variant)'
        },
        label: {
            control: { type: 'text' },
            description: 'Label for the date picker'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the date picker is disabled'
        },
        readOnly: {
            control: { type: 'boolean' },
            description: 'Whether the date picker is read-only'
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether to show error state'
        },
        helperText: {
            control: { type: 'text' },
            description: 'Helper text to display below the input'
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the input'
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium'],
            description: 'Size of the date picker'
        },
        type: {
            control: { type: 'select' },
            options: ['dropdown', 'selector'],
            description: 'Type of the date picker'
        },
        style: {
            control: { type: 'select' },
            options: ['default', 'custom'],
            description: 'Variant of the date picker'
        },
        showSeconds: {
            control: { type: 'boolean' },
            description: 'Whether to show seconds in time-related pickers (time, datetime, timerange, datetimerange)'
        },
        isRequired: {
            control: { type: 'boolean' },
            description: 'Whether the field is required (shows * indicator)'
        }
    },
} satisfies Meta<typeof RdsCompDatePicker>;

export default meta;
type Story = StoryObj<typeof RdsCompDatePicker>;

export const Default: Story = {
    args: {
        variant: 'date',
        layout: 'Default',
        label: 'Select Date',
        placeholder: 'Choose a date...',
        size: 'small',
        style: 'default',
        isRequired: true,
    },
    render: (args) => (
        <RdsCompDatePicker
            {...args}
            minDate={dayjs('1900-01-01')}
        />
    ),
} satisfies Story;

export const TimePicker: Story = {
    args: {
        variant: 'time',
        label: 'Select Time',
        placeholder: 'HH:MM AM/PM',
        size: 'small',
        showSeconds: true,
    }
} satisfies Story;

export const DateTimePicker: Story = {
    args: {
        variant: 'datetime',
        label: 'Select Date & Time',
        placeholder: 'MM/DD/YYYY HH:MM:SS AM/PM',
        size: 'small',
        showSeconds: true,
    },
    render: (args) => (
        <RdsCompDatePicker
            {...args}
            minDate={dayjs('1900-01-01')}
        />
    ),
} satisfies Story;

export const DateRangePicker: Story = {
    args: {
        variant: 'daterange',
        placeholder: 'Start date - End date',
        style: 'default',
        size: 'small',
    },
    render: (args) => (
        <RdsCompDatePicker
            {...args}
            minDate={dayjs('1900-01-01')}
        />
    ),
} satisfies Story;

export const TimeRangePicker: Story = {
    args: {
        variant: 'timerange',
        placeholder: 'Start time - End time',
        size: 'small',
        showSeconds: true,
    }
} satisfies Story;

// export const DateTimeRangePicker: Story = {
//     args: {
//         variant: 'datetimerange',
//         placeholder: 'Start date & time - End date & time',
//         size: 'small',
//         showSeconds: true,
//     },
//     render: (args) => (
//         <RdsCompDatePicker
//             {...args}
//             minDate={dayjs('1900-01-01')}
//         />
//     ),
// } satisfies Story;
