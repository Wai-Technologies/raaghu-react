import React from "react";
import RdsCompScrollspy from "./rds-comp-scrollspy";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Scrollspy',
    component: RdsCompScrollspy,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Scrollspy** component provides a dynamic navigation experience by tracking page scroll position and highlighting the corresponding navigation item. It accepts a \`data\` prop, which is an array of objects each containing \`id\`, \`title\`, \`header\`, and \`content\` strings. Each object represents a scrollable section with a unique identifier, a navigation label, a section heading, and associated content. This component is ideal for long pages or documentation where users need clear context of their current position within the content.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompScrollspy>;

export default meta;
type Story = StoryObj<typeof RdsCompScrollspy>;

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


