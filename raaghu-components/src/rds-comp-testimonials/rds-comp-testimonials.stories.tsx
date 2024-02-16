
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTestimonials from "./rds-comp-testimonials";


const meta: Meta = { 
    title: "Components/Testimonials",
    component: RdsCompTestimonials,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTestimonials>;

export default meta;
type Story = StoryObj<typeof RdsCompTestimonials>;

export const Default: Story = {
    args: {
        displayType: "basic",
        carousalItem: [
            {
                id: 1,
                imgUrl: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                name: "Sam Smith",
                roleName: "Product Manager",
                subTitle: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra."
            },
            {
                id: 2,
                imgUrl: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                name: "king John",
                roleName: "Tech Lead",
                subTitle: "this is the caption section were u can add the caption for the image",
            }
        ],
    }
} satisfies Story;


export const Advanced: Story = {
    args: {
        displayType: "advanced",
        testimonialItems: [
            [
                {
                    img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                    title: "SAM SMITH",
                    subtitle: "PRODUCT MANAGER",
                    description:
                        "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                    icon: "zapier",
                    route: "/home",
                    selected: true,
                    iconHeight: "18px",
                    iconWidth: "18px",
                    iconFill: false,
                    iconStroke: true,
                },
            ],
    
            [
                {
                    img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                    title: "King John",
                    subtitle: "PRODUCT MANAGER",
                    description:
                        "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                    icon: "zapier",
                    route: "/home",
                    selected: true,
                    iconHeight: "18px",
                    iconWidth: "18px",
                    iconFill: false,
                    iconStroke: true,
                },
            ],
            [
                {
                    img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                    title: "King John",
                    subtitle: "PRODUCT MANAGER",
                    description:
                        "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat",
                    icon: "zapier",
                    route: "/home",
                    selected: true,
                    iconHeight: "18px",
                    iconWidth: "18px",
                    iconFill: false,
                    iconStroke: true,
                },
            ],
        ],
    }
} satisfies Story;

