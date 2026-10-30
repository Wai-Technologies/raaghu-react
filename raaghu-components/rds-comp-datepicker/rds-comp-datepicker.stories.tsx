import RdsCompDatepicker from "./rds-comp-datepicker";
import SettingsIcon from "@mui/icons-material/Settings";
import { DatePickerLayout } from "./rds-comp-datepicker.types";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Date Picker',
    component: RdsCompDatepicker,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs :{
            description: {
        component:
            'The Date Picker component is an interactive UI element for selecting dates in various formats. It supports multiple display styles (Dropdown, Selector), layout options (Default, Month Picker, Year Picker, Multi Month), and semantic disabled and required options.'
    },
            source:{
                transform: (code: string) => {
                   
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={DatePickerLayout.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: DatePickerLayout.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the date picker root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the date picker root.' },
        ref: { control: false, description: 'React ref to the date picker root; assign it in code.' },
        variant: {
            options: ["dropdown", "selector"],
            control: { type: "select" },
        },
        layout: {
            options: ["Default", "Month Picker", "Year Picker", "Multi Month"],
            control: { type: "select" },
        }, 
        type: {
            options: ["Default", "Custom"],
            control: { type: "select" },
        },
        selected: {
            control: { type: "boolean" },
            description: "Applies the selected appearance to the date picker.",
        },
        disabled: {
    control: { type: "boolean" },
    description: "Disables the date picker when true.",
},
        openPickerIcon: {
            options: ["calendar", "dashboard_settings"],
            mapping: { calendar: undefined, dashboard_settings: <SettingsIcon className="rds-datepicker__calendar-icon" /> },
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompDatepicker>;

export default meta;
type Story = StoryObj<typeof RdsCompDatepicker>;

export const Default: Story = {
    args: {
        type: "Custom",
        showTitle: true,
        datePickerLabel: "Date",
        required: true,
        placeholder: "Select Date",
        openPickerIcon: "calendar",
        variant: "selector",
        layout: DatePickerLayout.Default,
        selected: false,
    },
    play: async ({ canvas }) => {
        const input = await canvas.findByPlaceholderText(/select date/i);
        await expect(input).toBeInTheDocument();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['type','openPickerIcon','layout','showTitle','datePickerLabel','required','disabled','placeholder','variant','selected','className','sx','ref'] } };
