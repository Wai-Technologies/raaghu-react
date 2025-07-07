import React from "react";
import RdsVideoPlayer from "./rds-video-player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Video Player',
    component: RdsVideoPlayer,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Video Player** element offers a streamlined way to embed video content within user interfaces. It supports various video sources including \`Default\` (MP4), \`YouTube\`, and \`Vimeo\`, allowing for versatile media integration. Developers can configure properties such as \`width\`, \`height\`, \`autoplay\`, and \`muted\` to tailor playback behavior. The \`videoLink\` defines the video source, while the \`type\` determines the rendering logic specific to the platform. As a reusable UI element, it is ideal for dashboards, tutorials, and promotional content, delivering consistent media experiences across devices while aligning with design system standards.`
}

        }
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

export const Standard: Story = {
    args: {
        type: "Default",
        width: "480px", 
        height: "240px",
        autoplay: false,
        muted: false,
        videoLink: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    }
} satisfies Story;

Standard.parameters = { controls: { include: ['type'] } };

