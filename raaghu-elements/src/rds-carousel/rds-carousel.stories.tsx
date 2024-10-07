import React from "react";
import RdsCarousel from "./rds-carousel";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Carousel',
    component: RdsCarousel,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        role: {
            options: [
                "advanced",
                "style1",
                "style2",
                "style3",
                "style4"
            ],
            control: { type: "select" },
        },
        IndicatorType: {
            options: [
                "Circle",
                "Line",
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCarousel>;

export default meta;
type Story = StoryObj<typeof RdsCarousel>;

export const Advanced: Story = {
    args: {
        Indicators: true,
        crossFade: true,
        controls: true,
        role: "advanced",
        IndicatorType: "Circle",
        carouselItems: [
            {
                id: 1,
                imgUrl: "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
                name: "Sam Smith",
                roleName: "Product Manager",
                subTitle: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra."
            },
            {
                id: 2,
                imgUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
                name: "king John",
                roleName: "Tech Lead",
                subTitle: "this is the caption section were u can add the caption for the image"
            },
        ],
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['Indicators','IndicatorType', 'crossFade', 'controls', 'role', 'carouselItems'] } };

export const Style1: Story = {
    args: {
        Indicators: true,
        crossFade: true,
        controls: true,
        role: "style1",
        IndicatorType: "Circle",
        carouselItems: [
            {
                id: 1,
                imgUrl: "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
                name: "Sam Smith",
                roleName: "Product Manager",
                subTitle: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra."
            },
            {
                id: 2,
                imgUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
                name: "king John",
                roleName: "Tech Lead",
                subTitle: "this is the caption section were u can add the caption for the image"
            },
            
        ],
    }
} satisfies Story;
Style1.parameters = { controls: { include: ['Indicators','IndicatorType', 'crossFade', 'controls', 'role', 'carouselItems'] } };

export const Style2: Story = {
    args: {
        Indicators: true,
        crossFade: true,
        controls: true,
        role: "style2",
        IndicatorType: "Circle",
        carouselItems: [
            {
                id: 1,
                imgUrl: "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
                name: "Sam Smith",
                roleName: "Product Manager",
                subTitle: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra."
            },
            {
                id: 2,
                imgUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
                name: "king John",
                roleName: "Tech Lead",
                subTitle: "this is the caption section were u can add the caption for the image"
            },
           
        ],
    }
} satisfies Story;
Style2.parameters = { controls: { include: ['Indicators','IndicatorType', 'crossFade', 'controls', 'role', 'carouselItems'] } };

export const Style3: Story = {
    args: {
        Indicators: true,
        crossFade: true,
        controls: true,
        role: "style3",
        IndicatorType: "Circle",
        carouselItems: [
            {
                id: 1,
                imgUrl: "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
                name: "Sam Smith",
                roleName: "Product Manager",
                subTitle: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra."
            },
            {
                id: 2,
                imgUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
                name: "king John",
                roleName: "Tech Lead",
                subTitle: "this is the caption section were u can add the caption for the image"
            },
            
        ],
    }
} satisfies Story;
Style3.parameters = { controls: { include: ['Indicators','IndicatorType', 'crossFade', 'controls', 'role', 'carouselItems'] } };

export const Style4: Story = {
    args: {
        Indicators: true,
        crossFade: true,
        controls: true,
        role: "style4",
        IndicatorType: "Circle",
        carouselItems: [
            {
                id: 1,
                imgUrl: "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
                name: "Sam Smith",
                roleName: "Product Manager",
                subTitle: "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra."
            },
            {
                id: 2,
                imgUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
                name: "king John",
                roleName: "Tech Lead",
                subTitle: "this is the caption section were u can add the caption for the image"
            }
        
        ],
    }
} satisfies Story;
Style4.parameters = { controls: { include: ['Indicators','IndicatorType', 'crossFade', 'controls', 'role', 'carouselItems'] } };
