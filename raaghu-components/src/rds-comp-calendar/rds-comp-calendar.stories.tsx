import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompCalendar, { getSampleEvents } from "./rds-comp-calendar";

const sampleEvents = getSampleEvents();

const meta: Meta = { 
    title: "Components/Calendar",
    component: RdsCompCalendar,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Calendar** component is a customizable UI element designed to display and manage events within your application. It supports an `events` array to define the list of events, with properties such as `title`, `start`, `end`, and `allDay` to specify event details and scheduling. This component is ideal for dashboards, scheduling systems, or any interface requiring a structured and visually appealing calendar view. Fully customizable, the Calendar component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
        defaultView: {
            control: 'select',
            options: ['month', 'week', 'day', 'agenda'],
            description: 'Default view to display'
        },
    },
} satisfies Meta<typeof RdsCompCalendar>;

export default meta;
type Story = StoryObj<typeof RdsCompCalendar>;


export const Day: Story = {
    args: {
        events: sampleEvents,
        defaultView: 'day'
    },
} satisfies Story;
Day.parameters = { controls: { include: ['events'] } };

export const Mini: Story = {
    args: {
        events: sampleEvents,
        minicalendar: true
    },
} satisfies Story;
Mini.parameters = { controls: { include: ['events'] } };

export const Month: Story = {
    args: {
        events: sampleEvents,
    }
} satisfies Story;
Month.parameters = { controls: { include: ['events'] } };

export const NoToolbar: Story = {
    args: {
        events: sampleEvents,
        showToolbar: false
    },
} satisfies Story;
NoToolbar.parameters = { controls: { include: ['events'] } };

export const Standard: Story = {
    args: {
        events: sampleEvents,
        defaultView: 'agenda',
        styleClass: 'agenda-view'
    },
} satisfies Story;
Standard.parameters = { controls: { include: ['events'] } };


export const Week: Story = {
    args: {
        events: sampleEvents,
        defaultView: 'work_week'
    },
} satisfies Story;
Week.parameters = { controls: { include: ['events'] } };
