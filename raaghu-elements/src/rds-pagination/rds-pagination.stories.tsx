import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPagination from "./rds-pagination";

export default {
    title: "Elements/Pagination",
    component: RdsPagination,
    argTypes: {
        paginationType:{
            options:[
                "default",
                "advance"
            ],
            control: { type: "select" },
        },
        alignmentType:{
            options:[
                "start",
                "center",
                "end"
            ],
            control: { type: "select" },
        }
    }
} as ComponentMeta<typeof RdsPagination>;

const Template: ComponentStory<typeof RdsPagination> = (args) => (
    <RdsPagination {...args}/>
);

export const Default = Template.bind({});
Default.args = {
    paginationType : "default",
    totalRecords:10,
    recordsPerPage:3,
    size:"sm",
    alignmentType: "start",
  
};

export const Advanced = Template.bind({});
Advanced.args = {
    paginationType : "advance",
    totalRecords:10,
    recordsPerPage:3,
    size:"sm",
    alignmentType: "start"
};
