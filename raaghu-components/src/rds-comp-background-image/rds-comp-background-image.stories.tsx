
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompBackgroundImage from "./rds-comp-background-image";

export default {
    title: "Components/Background Image ",
    component: RdsCompBackgroundImage,

} as ComponentMeta<typeof RdsCompBackgroundImage>;


const Template: ComponentStory<typeof RdsCompBackgroundImage> = (args) => (
    <RdsCompBackgroundImage {...args} />
);


export const BackgroundImage = Template.bind({});

BackgroundImage.args = {
    imageUrl: "https://cdn.pixabay.com/photo/2020/12/18/16/56/laptop-5842509_960_720.jpg",
    title: "New arrivals are here",
    btnLabel: "CHECK NEW ARRIVALS HERE",
    subtitle: "The new arrivals have, well newly arrived. Check out the latest options from our summer small-batch release while they are still in stock.",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

};

