import RdsDatepicker, { DatePickerLayout, DatePickerState, DatePickerStyleType, RdsDatepickerProps } from "./rds-datepicker";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Datepicker',
    component: RdsDatepicker,
    parameters: {
        layout: 'padded',
        docs :{
            source:{
                transform: (code: string) => {
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/datePickerStyleType="([^"]+)"/g, (match, p1) => `datePickerStyleType={DatePickerStyleType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/datePickerStyleType:\s*"([^"]+)"/g, (match, p1) => `datePickerStyleType: DatePickerStyleType.${p1.replace(/\s+/g, '')}`);
                    // Transform layout enum - remove spaces and transform
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={DatePickerLayout.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: DatePickerLayout.${p1.replace(/\s+/g, '')}`);
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={DatePickerState.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: DatePickerState.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        datePickerStyleType: {
            options: ["Dropdown", "Selector"],
            control: { type: "select" },
        },
        layout: {
            options: ["Default", "Month Picker", "Year Picker", "Multi Month"],
            control: { type: "select" },
        }, 
        state: {
            options: ["Default", "Expanded", "Selected"],
            control: { type: "select" },
        },
        type: {
            options: ["Default", "Custom"],
            control: { type: "select" },
        },
        changeIcon: {
            options: ["calendar", "dashboard_settings"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsDatepicker>;

export default meta;
type Story = StoryObj<typeof RdsDatepicker>;

export const Default: Story = {
    args: {
        state: DatePickerState.Default,
        type: "Custom",
        showTitle: true,
        titleText: "Date",
        isMandatory : true,
        placeholderText: "Select Date",
        changeIcon: "calendar",
        datePickerStyleType: DatePickerStyleType.Selector,
        layout: DatePickerLayout.Default,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['state','type','changeIcon','layout', 'showTitle','title','isMandatory','placeholderText','datePickerStyleType'] } };

// export const Advanced: Story = {
//     args: {
//         title: "Date",
//         showTitle: true,
//         datepickerStyle: "Dropdown",
//         type: "advanced",
//         isMandatory : true,
//         placeholderText: "Select Date",
//         layout: "Default",
//     }
// } satisfies Story;
// Advanced.parameters = { controls: { include: ['layout', 'showTitle','title','isMandatory','placeholderText','datepickerStyle'] } };

// export const WithTime: Story = {
//     args: {
//         title: "Date",
//         showTitle: true,
//         datepickerStyle: "Dropdown",
//         type: "withTime",
//         isMandatory : true,
//         placeholderText: "Select Date",
//     }
// } satisfies Story;
// WithTime.parameters = { controls: { include: ['showTitle','title','isMandatory','placeholderText','datepickerStyle'] } };
