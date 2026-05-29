import RdsDatepicker, { DatePickerLayout, DatePickerState, DatePickerStyleType, RdsDatepickerProps } from "./rds-comp-datepicker";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Date Picker',
    component: RdsDatepicker,
    parameters: {
        layout: 'padded',
        docs :{
            description: {
        component:
            'The **Date Picker** component is an interactive UI element for selecting dates in various formats. It supports multiple display styles (`Dropdown`, `Selector`), layout options (`Default`, `Month Picker`, `Year Picker`, `Multi Month`), and states (`Default`, `Expanded`, `Selected`). Users can customize the icon, show an optional title, mark the field as mandatory, and set a placeholder for empty input. The component offers flexible props for appearance and behavior, making it suitable for forms, scheduling tools, and any interface where efficient date selection is required.'
    },
            source:{
                transform: (code: string) => {
                   
                    code = code.replace(/datePickerStyleType="([^"]+)"/g, (match, p1) => `datePickerStyleType={DatePickerStyleType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/datePickerStyleType:\s*"([^"]+)"/g, (match, p1) => `datePickerStyleType: DatePickerStyleType.${p1.replace(/\s+/g, '')}`);
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={DatePickerLayout.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: DatePickerLayout.${p1.replace(/\s+/g, '')}`);
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

export const DatePickerVisible: Story = {
  name: 'Interaction: Date picker renders',
  args: {
    state: DatePickerState.Default,
    showTitle: true,
    titleText: 'Date',
    placeholderText: 'Select Date',
    changeIcon: 'calendar',
    layout: DatePickerLayout.Default,
  },
  play: async ({ canvasElement }) => {
    // Date picker renders with an input or trigger button
    const trigger = canvasElement.querySelector(
      'input, button, [class*="datepicker"], [class*="DatePicker"], [class*="calendar"]'
    )
    await expect(trigger).not.toBeNull()
    await expect(canvasElement).toBeTruthy()
  }
};
