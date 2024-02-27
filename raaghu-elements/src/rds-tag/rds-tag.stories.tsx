import React from "react";
import RdsTag from "./rds-tag";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Tag',
    component: RdsTag,
    parameters: { 
        layout: 'padded',
    },
    tags:['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        tagType:{
            options:["square" , "round"],
            control: { type: "select" },
        },
        role:{
            options:["basic" , "tagWithScroll"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsTag>;

export default meta;
type Story = StoryObj<typeof RdsTag>;


export const Tag :Story={
    args:{
        tagType:"square" ,
        role:"basic",
        colorVariant:"primary",
        fillClose:false,
        tagArray:[ "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "dark",
        "light",]
    }
} satisfies Story;

Tag.parameters = { controls: { include: ['role', 'colorVariant','fillClose'] } };


// export const Advanced = Template.bind({});
// Advanced.args = {
  
//     displayType:"advanced",
//     colorVariant: "primary",
//     items: [
//         {
//           "title": "SAM SMITH",
//           "value": "2370",
//           "icon": "star",
//           "iconHeight": "80px",
//           "iconWidth": "80px",
//           "iconFill": true,
          
//         },
//       ]
// };
