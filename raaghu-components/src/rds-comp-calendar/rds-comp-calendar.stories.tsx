// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompCalendar from "./rds-comp-calendar";

// export default {
//     title: "Components/Calendar",
//     component: RdsCompCalendar,

//     argTypes: {
//         onclick: { action: "deleted" },
//     },
// } as ComponentMeta<typeof RdsCompCalendar>;

// const Template: ComponentStory<typeof RdsCompCalendar> = (args: any) => (
//     <RdsCompCalendar {...args} />
// );

// export const Calendar = Template.bind({});

// Calendar.args = {
//     events: [
//         {
//             title: "Big Meeting",
//             allDay: true,
//             start: new Date(2021, 6, 10),
//             end: new Date(2021, 6, 12),
//         },
//         {
//             title: "Vacation",
//             start: new Date(2021, 6, 7),
//             end: new Date(2021, 6, 10),
//         },
//         {
//             title: "Conference",
//             start: new Date(2021, 6, 20),
//             end: new Date(2021, 6, 23),
//         },
//     ],
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCalendar from "./rds-comp-calendar";


const meta: Meta = { 
    title: "Components/Calendar",
    component: RdsCompCalendar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCalendar>;

export default meta;
type Story = StoryObj<typeof RdsCompCalendar>;

export const Default: Story = {
    args: {
        events: [
                    {
                        title: "Big Meeting",
                        allDay: true,
                        start: new Date(2021, 6, 10),
                        end: new Date(2021, 6, 12),
                    },
                    {
                        title: "Vacation",
                        start: new Date(2021, 6, 7),
                        end: new Date(2021, 6, 10),
                    },
                    {
                        title: "Conference",
                        start: new Date(2021, 6, 20),
                        end: new Date(2021, 6, 23),
                    },
                ],
    }
} satisfies Story;