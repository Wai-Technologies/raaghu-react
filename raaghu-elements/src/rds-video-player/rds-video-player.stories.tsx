import React from "react";
import RdsVideoPlayer from "./rds-video-player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Video Player',
    component: RdsVideoPlayer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['Default', 'YouTube', 'Vimeo'],
            description: "Select the type of video source",
        },
    },
} satisfies Meta<typeof RdsVideoPlayer>;

export default meta;
type Story = StoryObj<typeof RdsVideoPlayer>;

export const Default: Story = {
    args: {
        type: "Default",
        width: "480px", 
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    }
} satisfies Story;

Default.parameters = { controls: { include: ['type'] } };

