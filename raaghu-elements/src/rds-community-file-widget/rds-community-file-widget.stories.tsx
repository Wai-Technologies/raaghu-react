import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCommunityFileWidget from "./rds-community-file-widget";

const meta: Meta =  {
  title: "Components/AI ChatBox/Community File Widget",
  component: RdsCommunityFileWidget,
  parameters: {
    docs: {
      description: {
  component: `The **Community File Widget** component is a compact, card-style UI element designed to showcase files shared by community users within the AI ChatBox environment. It accepts properties such as \`cardImage\` for displaying a visual preview of the shared file, \`avtar\` for the user’s avatar image URL, and \`userName\` to identify the file owner. The component also features customizable action labels like \`viewDetails\` and \`openInChat\` to allow users to either explore more information about the file or open it directly in the chat interface. This widget enhances collaborative workflows by providing an intuitive, visually engaging representation of community-contributed content, helping users quickly identify and interact with shared resources.`
}

    }
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCommunityFileWidget>

export default meta;
type Story = StoryObj<typeof RdsCommunityFileWidget>;

export const Default : Story = {
  args: {
    cardImage:"./assets/community_file_widget.png",
    avtar :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    userName: "Jane Doe",
    viewDetails: "View Details",
    openInChat: "Open in Chat",
  }
} satisfies Story;