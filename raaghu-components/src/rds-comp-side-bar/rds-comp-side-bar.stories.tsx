import React from "react";
import RdsSideBar from "./rds-comp-side-bar";
import { Meta, StoryObj } from "@storybook/react";
 
const meta: Meta = {
    title: 'Components/AI ChatBox/Side Bar',
    component: RdsSideBar,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Side Bar** component provides a vertical navigation panel typically used for app or dashboard layouts. It accepts arrays of \`labels\` and corresponding \`icons\` to display navigational items, enabling easy access to different sections such as "New Chat," "Recent," "Community," and "Settings." The component supports structured navigation through optional props like \`topItems\`, \`middleGroups\`, and \`bottomItems\` to organize links into distinct areas. Interaction handlers like \`onButtonClick\` and \`onToggle\` allow developers to respond to user actions such as item clicks and sidebar collapse toggling. The \`initialCollapsed\` boolean sets the sidebar's default collapsed state. This component is ideal for building responsive, user-friendly navigation in complex web applications.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
       
    },
} satisfies Meta<typeof RdsSideBar>;
 
export default meta;
type Story = StoryObj<typeof RdsSideBar>;
export const Default: Story = {
    args: {
        labels: [
            "New Chat",
            "Recent",
            "SAAS Dashboard",
            "Community",
            "Folder",
            "Help",
            "Activity",
            "Settings"
        ],
        icons: [
            "new_chat",
            "recent",
            "saas_chat",
            "community",
            "chat_folder",
            "chat_help",
            "activity",
            "chat_settings"
 
        ]
    },
} satisfies Story;
 