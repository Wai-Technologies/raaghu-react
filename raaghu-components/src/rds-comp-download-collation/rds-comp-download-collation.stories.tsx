// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompDownloadCollation from "./rds-comp-download-collation";

// export default {
//     title: "Components/Download Collation",
//     component: RdsCompDownloadCollation,

// } as ComponentMeta<typeof RdsCompDownloadCollation>;


// const Template: ComponentStory<typeof RdsCompDownloadCollation> = (args) => (
//     <RdsCompDownloadCollation  {...args} />
// );


// export const DownloadCollation = Template.bind({});

// DownloadCollation.args = {
//     downloadTable: [
//         {
//             "DateofData": "08/07/2022",
//             "NummberofDay": "5 days ago",
//             "downloadUrl": "assets/Group.jpg"
//         },
//         {
//             "DateofData": "08/07/2022",
//             "NummberofDay": "5 days ago",
//             "downloadUrl": "assets/DeleteIcon.jpg"
//         },
//         {
//             "DateofData": "08/07/2022",
//             "NummberofDay": "5 days ago",
//             "downloadUrl": "assets/Photp.jpeg"
//         }
//     ]
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDownloadCollation from "./rds-comp-download-collation";


const meta: Meta = { 
    title: "Components/Download Collection",
    component: RdsCompDownloadCollation,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Download Collection** component is a customizable UI element designed to display and manage downloadable resources in a structured table format. It supports a `downloadTable` array to define the list of downloadable items, with properties such as `DateofData` (date of the resource), `NummberofDay` (time since the resource was added), and `downloadUrl` (URL for downloading the resource). This component is ideal for dashboards, resource management systems, or any interface requiring organized and user-friendly access to downloadable content. Fully customizable, the Download Collection component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDownloadCollation>;

export default meta;
type Story = StoryObj<typeof RdsCompDownloadCollation>;

export const Default: Story = {
    args: {
        downloadTable: [
                    {
                        "DateofData": "08/07/2024",
                        "NummberofDay": "25 days ago",
                        "downloadUrl": "assets/Group.jpg"
                    },
                    {
                        "DateofData": "02/08/2024",
                        "NummberofDay": "15 days ago",
                        "downloadUrl": "assets/DeleteIcon.jpg"
                    },
                    {
                        "DateofData": "05/09/2024",
                        "NummberofDay": "5 days ago",
                        "downloadUrl": "assets/Photp.jpeg"
                    }
                ]
    }
} satisfies Story;