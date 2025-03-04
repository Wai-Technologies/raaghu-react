import React from "react";
import RdsTestimonial from "./rds-testimonial";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Testimonial',
    component: RdsTestimonial,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsTestimonial>;

export default meta;
type Story = StoryObj<typeof RdsTestimonial>;


export const CustomizableTestimonialItem: Story = {
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
CustomizableTestimonialItem.parameters = { controls: { include: ['testimonialItems'] } };

