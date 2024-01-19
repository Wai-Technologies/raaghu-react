import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompDownloadCollation from "./rds-comp-download-collation";

export default {
    title: "Components/Download Collation  ",
    component: RdsCompDownloadCollation,

} as ComponentMeta<typeof RdsCompDownloadCollation>;


const Template: ComponentStory<typeof RdsCompDownloadCollation> = (args) => (
    <RdsCompDownloadCollation  {...args} />
);


export const DownloadCollation = Template.bind({});

DownloadCollation.args = {
    downloadTable: [
        {
            "DateofData": "08/07/2022",
            "NummberofDay": "5 days ago",
            "downloadUrl": "assets/Group.jpg"
        },
        {
            "DateofData": "08/07/2022",
            "NummberofDay": "5 days ago",
            "downloadUrl": "assets/DeleteIcon.jpg"
        },
        {
            "DateofData": "08/07/2022",
            "NummberofDay": "5 days ago",
            "downloadUrl": "assets/Photp.jpeg"
        }
    ]
};