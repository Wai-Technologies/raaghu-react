import React from 'react';
import { Story, Meta } from '@storybook/react';
import RdsAdvanceAvatar, { RdsAdvanceAvatarProps } from './rds-advance-avatar';

const textAlignArgTypes = {
    titleAlign: {
        options: ["horizontal", "vertical"],
        control: { type: "select" },
    },
    size: {
        options: ["smallest", "small", "medium", "large", "largest"],
        control: { type: "select" },
    },
    activityChain: {
        control: { type: "boolean" },
    },
    activeDotTop: {
        control: { type: "boolean" },
    },
    activeDotBottom: {
        control: { type: "boolean" },
    },
    withProfilePic: {
        control: { type: "boolean" },
    },
    colorVariant: {
        options: [          
            "primary",
            "success",
            "danger",
            "warning",
            "light",
            "info",
            "secondary",
            "dark",
        ],
        control: { type: "select" },
    },
};

export default {
    title: 'Elements/Advance Avatar',
    component: RdsAdvanceAvatar,
    argTypes: textAlignArgTypes,
} as Meta;

const Template: Story<RdsAdvanceAvatarProps> = (args) => <RdsAdvanceAvatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    titleAlign: 'horizontal',
    size: 'medium',
    colorVariant: 'primary',
    withProfilePic: false,
    activityChain: false,
    activeDotTop: false,
    activeDotBottom: false,
};
