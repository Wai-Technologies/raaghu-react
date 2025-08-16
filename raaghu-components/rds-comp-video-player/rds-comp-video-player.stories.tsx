import React from "react";
import RdsCompVideoPlayer from "./rds-comp-video-player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Video Player',
    component: RdsCompVideoPlayer,
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
        width: {
            control: 'text',
            description: 'Width of the video player (CSS value)',
        },
        height: {
            control: 'text',
            description: 'Height of the video player (CSS value)',
        },
        autoplay: {
            control: 'boolean',
            description: 'Auto-play the video when loaded',
        },
        muted: {
            control: 'boolean',
            description: 'Mute the video by default',
        },
        controls: {
            control: 'boolean',
            description: 'Show video player controls',
        },
        volume: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Video volume (0.0 to 1.0)',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the video player',
        },
        videoLink: {
            control: 'text',
            description: 'URL of the video to play',
        },
    },
} satisfies Meta<typeof RdsCompVideoPlayer>;

export default meta;
type Story = StoryObj<typeof RdsCompVideoPlayer>;

export const Default: Story = {
    args: {
        type: "Default",
        width: "100%", 
        height: "400px",
        autoplay: false,
        muted: false,
        controls: true,
        volume: 0.8,
        disabled: false,
        videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    }
};