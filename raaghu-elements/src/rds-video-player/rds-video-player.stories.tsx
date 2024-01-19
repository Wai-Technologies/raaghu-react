import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsVideoPlayer from "./rds-video-player";

export default {
    title: "Elements/Video Player",
    component: RdsVideoPlayer,
} as ComponentMeta<typeof RdsVideoPlayer>;

const Template: ComponentStory<typeof RdsVideoPlayer> = (args) => (
    <RdsVideoPlayer {...args} />
);

export const VideoPlayer = Template.bind({});
VideoPlayer.args = {
    width: "480px",
    height: "240px",
    autoplay: false,
    muted: false,
    videoLink: "https://youtu.be/7sDY4m8KNLc",
};
