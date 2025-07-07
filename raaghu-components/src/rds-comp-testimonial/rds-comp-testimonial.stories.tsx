import React from "react";
import RdsCompTestimonial from "./rds-comp-testimonial";
import { Meta, StoryObj } from "@storybook/react-vite";


const meta: Meta = {
    title: 'Components/Testimonial',
    component: RdsCompTestimonial,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Testimonial** component is a flexible and customizable UI element designed to showcase user feedback, reviews, or quotes in your application. It supports displaying key details such as the reviewer’s **name**, **designation**, **profile image**, and **testimonial description**. The component also allows the inclusion of an **icon** (e.g., quotation marks) with customizable properties like `iconHeight`, `iconWidth`, `iconFill`, and `iconStroke`. You can dynamically populate the component using the **testimonialItems** array, where each object represents a testimonial with properties like `img`, `title`, `subtitle`, `description`, and `icon`. This component is ideal for creating testimonial sections on websites, product pages, or any interface requiring structured and visually appealing user feedback. Fully customizable, the Testimonial component can be tailored to fit your design system and branding requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTestimonial>;

export default meta;
type Story = StoryObj<typeof RdsCompTestimonial>;


export const Standard: Story = {
    args: {
        testimonialItems: [
            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "SAM SMITH",
                subtitle: "PRODUCT MANAGER",
                description: "Nulla metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "quote_right",
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: true,
                iconStroke: true
            },

            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "King John",
                subtitle: "PRODUCT MANAGER",
                description: "Nulla metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "quote_right",
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: true,
                iconStroke: true,
            },

            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "King John",
                subtitle: "PRODUCT MANAGER",
                description: "Nulla metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "quote_right",
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: true,
                iconStroke: true,
            },
            {
                img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                title: "King John",
                subtitle: "PRODUCT MANAGER",
                description: "Nulla metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                icon: "quote_right",
                iconHeight: "18px",
                iconWidth: "18px",
                iconFill: true,
                iconStroke: true,
            },
        ]
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['testimonialItems'] } };

