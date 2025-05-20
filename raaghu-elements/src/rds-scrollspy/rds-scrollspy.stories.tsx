import React from "react";
import RdsScrollspy from "./rds-scrollspy";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Scrollspy',
    component: RdsScrollspy,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsScrollspy>;

export default meta;
type Story = StoryObj<typeof RdsScrollspy>;

export const Default: Story = {
    args: {
        data: [
            {
                id: '1',
                title: 'First',
                header: 'First heading',
                content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting."
            },
            {
                id: '2',
                title: 'Second',
                header: 'Second heading',
                content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting."
            },
            {
                id: '3',
                title: 'Third',
                header: 'Third heading',
                content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting."
            }
        ]
    }
} satisfies Story;
Default.parameters = { controls: { include: ['data'] } };


