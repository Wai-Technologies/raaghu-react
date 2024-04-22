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
        imageUrl: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80.jpg",
        title: "New arrivals are here",
        btnLabel: "CHECK NEW ARRIVALS HERE",
        subtitle: "The new arrivals have, well newly arrived. Check out the latest options from our summer small-batch release while they are still in stock.",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
} satisfies Story;