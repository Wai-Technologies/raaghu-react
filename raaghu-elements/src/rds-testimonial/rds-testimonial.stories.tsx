import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsTestimonial from "./rds-testimonial";

export default {
    title: "Elements/Testimonial",
    component: RdsTestimonial,
    argTypes: {
    
    },
} as ComponentMeta<typeof RdsTestimonial>;

const Template: ComponentStory<typeof RdsTestimonial> = (args) => (
    <RdsTestimonial {...args} />
);

export const Testimonial = Template.bind({});
Testimonial.args = {
    testimonialItems: [
        { img:"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
            title:"SAM SMITH",
            subtitle: "PRODUCT MANAGER", 
            description: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat", 
            icon: "quote_right",
            iconHeight:"18px",
            iconWidth:"18px",
            iconFill:true,
            iconStroke:true},
    
        { img:"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
            title:"King John",
            subtitle: "PRODUCT MANAGER", 
            description: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat", 
            icon: "quote_right",
            iconHeight:"18px",
            iconWidth:"18px",
            iconFill:true,
            iconStroke:true,
        },

        { img:"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
            title:"King John",
            subtitle: "PRODUCT MANAGER", 
            description: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat", 
            icon: "quote_right",
            iconHeight:"18px",
            iconWidth:"18px",
            iconFill:true,
            iconStroke:true,
        },
        { img:"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
            title:"King John",
            subtitle: "PRODUCT MANAGER", 
            description: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat", 
            icon: "quote_right",
            iconHeight:"18px",
            iconWidth:"18px",
            iconFill:true,
            iconStroke:true,
        },
    ] 
};
