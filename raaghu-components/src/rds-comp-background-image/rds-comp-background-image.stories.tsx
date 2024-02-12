import type { Meta, StoryObj } from '@storybook/react';
import RdsCompBackgroundImage from "./rds-comp-background-image";


const meta: Meta = {
    title: "Components/Background Image",
    component: RdsCompBackgroundImage,
    parameters: {
        layout: "padded",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompBackgroundImage>;

export default meta;
type Story = StoryObj<typeof RdsCompBackgroundImage>;

export const Default: Story = {
    args: {
            imageUrl: "https://cdn.pixabay.com/photo/2020/12/18/16/56/laptop-5842509_960_720.jpg",
            title: "New arrivals are here",
            btnLabel: "CHECK NEW ARRIVALS HERE",
            subtitle: "The new arrivals have, well newly arrived. Check out the latest options from our summer small-batch release while they are still in stock.",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
    }
} satisfies Story;