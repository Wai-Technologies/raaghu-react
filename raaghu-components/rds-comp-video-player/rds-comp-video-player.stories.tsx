import React from "react";
import RdsCompVideoPlayer, { VideoPlayerType } from "./rds-comp-video-player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Video Player',
    component: RdsCompVideoPlayer,
    parameters: {
        layout: 'padded',
        controls: {
            exclude: ['width', 'height'],
        },
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/type="(Default|YouTube|Vimeo)"/g, 'type={VideoPlayerType.$1}');
                    code = code.replace(/type:\s*"(Default|YouTube|Vimeo)"/g, 'type: VideoPlayerType.$1');
                    return code;
                }
            }
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        type: {
            control: {
                type: 'select',
                labels: {
                    [VideoPlayerType.Default]: 'Default',
                    [VideoPlayerType.YouTube]: 'YouTube',
                    [VideoPlayerType.Vimeo]: 'Vimeo'
                }
            },
            options: Object.values(VideoPlayerType),
            description: "Select the type of video source",
        },
        width: {
            table: { disable: true },
            control: false,
        },
        height: {
            table: { disable: true },
            control: false,
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
        type: VideoPlayerType.Default,
        width: "100%",
        height: "400px",
        autoplay: false,
        muted: false,
        controls: true,
        volume: 0.8,
        disabled: false,
        videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
};