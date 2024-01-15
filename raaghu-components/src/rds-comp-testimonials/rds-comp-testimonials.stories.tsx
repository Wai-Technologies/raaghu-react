import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTestimonials from "./rds-comp-testimonials";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Testimonials",
    component: RdsCompTestimonials,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompTestimonials>;

const Template: ComponentStory<typeof RdsCompTestimonials> = (args) => (
    <RdsCompTestimonials {...args} />
);

export const Testimonials = Template.bind({});
Testimonials.args = {
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
};



export const Advanced = Template.bind({});
Advanced.args = {
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
};
