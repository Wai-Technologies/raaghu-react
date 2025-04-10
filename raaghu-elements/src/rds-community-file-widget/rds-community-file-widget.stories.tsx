import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsCommunityFileWidget from "./rds-community-file-widget";

const meta: Meta =  {
  title: "Components/AI ChatBox/Community File Widget",
  component: RdsCommunityFileWidget,
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
    followers: "5k",
    viewDetails: "View Details",
    openInChat: "Open in Chat",
    userTab: "user_tab"
  }
} satisfies Story;

// Default.parameters = { controls: { include: [] } };