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
    },
} satisfies Meta<typeof RdsVideoPlayer>;

export default meta;
type Story = StoryObj<typeof RdsVideoPlayer>;

export const Default: Story = {
    args: {
        width: "480px",
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",  // Example of a hosted .mp4 file
    }
} satisfies Story;

export const Vimeo: Story = {
    args: {
        width: "480px",
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://vimeo.com/420192272",  // React tutorial on Vimeo
    }
} satisfies Story;

Vimeo.parameters = { controls: { include: ['width', 'height', 'autoplay', 'muted', 'videoLink'] } };

export const YouTube: Story = {
    args: {
        width: "480px",
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://youtu.be/7sDY4m8KNLc",  // YouTube link
    }
} satisfies Story;
