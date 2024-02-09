import React from "react";
import RdsVideoPlayer from "./rds-video-player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Video Player',
    component: RdsVideoPlayer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsVideoPlayer>;

export default meta;
type Story = StoryObj<typeof RdsVideoPlayer>;


export const VideoPlayer: Story = {
    args: {
        width: "480px",
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://youtu.be/7sDY4m8KNLc",
    }
} satisfies Story;
