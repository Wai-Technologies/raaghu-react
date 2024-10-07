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
        videoLink: "https://www.w3schools.com/html/mov_bbb.mp4",  // Example of a default .mp4 video
    }
} satisfies Story;

export const Vimeo: Story = {
    args: {
        width: "480px",
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://vimeo.com/76979871",  // Replace with a valid Vimeo link
    }
} satisfies Story;

export const YouTube: Story = {
    args: {
        width: "480px",
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://youtu.be/7sDY4m8KNLc",  // YouTube link
    }
} satisfies Story;
