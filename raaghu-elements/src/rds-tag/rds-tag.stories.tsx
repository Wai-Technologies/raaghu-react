import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsTag from "./rds-tag";

export default {
    title: "Elements/Tag",
    component: RdsTag,
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
    }
} as ComponentMeta<typeof RdsTag>;

const Template: ComponentStory<typeof RdsTag> = (args) => (
    <RdsTag {...args}/>
);

export const Tag = Template.bind({});
Tag.args = {
    tagType: "square" ,
    role: "basic",
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
};

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
