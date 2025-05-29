import type { Meta, StoryObj } from '@storybook/react';
import RdsCompBackgroundImage from "./rds-comp-background-image";


const meta: Meta = {
    title: "Components/Background Image",
    component: RdsCompBackgroundImage,
    parameters: {
        layout: "padded",
        docs: {
    description: {
        component: 
            'The **Background Image** component is a visually engaging and customizable UI element designed to display a background image with overlaid content, such as titles, subtitles, and call-to-action buttons. It supports properties like `imageUrl` to define the background image, `title` and `subtitle` for textual content, and `btnLabel` for an actionable button. Additionally, it allows customization of background styles with properties like `backgroundRepeat` and `backgroundSize` to control the image layout. This component is ideal for landing pages, promotional banners, or any interface requiring visually appealing background imagery with interactive content. Fully customizable, the Background Image component ensures a seamless user experience while maintaining consistency with your design system.'
    },
}
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