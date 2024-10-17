import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsAvatar from "./rds-avatar";

const colorVariantArgTypes = {

};

const textAlignArgTypes = {
    titleAlign: {
        options: ["horizontal", "vertical"],
        control: { type: "select" },
    },
};

const meta: Meta = {
    title: 'Elements/Avatar',
    component: RdsAvatar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["smallest","small", "medium", "large","largest"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsAvatar>;

export default meta;
type Story = StoryObj<typeof RdsAvatar>;


export const Default: Story = {
    args: {
        size: "medium",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size'] } };


export const withInitials: Story = {
    args: {
        //colorVariant: "primary",
        firstName: "Wai",
        avtarOnly: false,
        avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,

        lastName: "Technologies",
        size: "medium",
    }
} satisfies Story;
withInitials.parameters = { controls: { include: ['size', 'firstName', 'lastName'] } };


withInitials.argTypes = colorVariantArgTypes;

export const withLabel: Story = {
    args: {
        //colorVariant: "primary",
        firstName: "Wai",
        lastName: "Technologies",
        avtarOnly: false,
        avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,
        size: "medium",
        isTitle: true,
        titleAlign: "horizontal",
        role: "Developer",
    }
} satisfies Story;
withLabel.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'isTitle', 'titleAlign', 'role'] } };


withLabel.argTypes = colorVariantArgTypes;
withLabel.argTypes = textAlignArgTypes;

export const withProfile: Story = {
    args: {
        size: "small",
        withProfilePic: true,
        avtarOnly: false,
        avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,
        firstName: "Wai",
        lastName: "Technologies",
        titleAlign: "horizontal",
        role: "Developer",
        //colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
withProfile.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'withProfilePic', 'titleAlign', 'role', 'profilePic'] } };


withProfile.argTypes = textAlignArgTypes;

export const Avatar_Only: Story = {
    args: {
        size: "large",
        withProfilePic: false,
        avtarOnly: true,
        avtarWithName: false,
        activeDotTop: true,
        activeDotBottom: true,
        nameOnBottom: false,
        stackingAvatar: false,
        firstName: "Wai",
        lastName: "Technologies",
        titleAlign: "horizontal",
        role: "Developer",
        //colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Avatar_Only.parameters = { controls: { include: ['size', 'titleAlign', 'profilePic','activeDotTop','activeDotBottom'] } };

export const Avatar_With_Name: Story = {
    args: {
        size: "large",
        withProfilePic: false,
        avtarOnly: false,
        avtarWithName: true,
        activeDotTop: true,
        activeDotBottom: true,
        nameOnBottom: false,
        stackingAvatar: false,
        firstName: "Wai",
        lastName: "Technologies",
        titleAlign: "horizontal",
        role: "Developer",
        //colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Avatar_With_Name.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'titleAlign', 'role', 'profilePic','activeDotTop','activeDotBottom'] } };

export const Name_On_Bottom: Story = {
    args: {
        size: "large",
        withProfilePic: false,
        avtarOnly: false,
        avtarWithName: false,
        activeDotTop: true,
        activeDotBottom: true,
        nameOnBottom: true,
        stackingAvatar: false,
        firstName: "Wai",
        lastName: "Technologies",
        titleAlign: "horizontal",
        role: "Developer",
        //colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Name_On_Bottom.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'titleAlign', 'role', 'profilePic','activeDotTop','activeDotBottom'] } };

const avatars = [
    // Example avatars data
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU',  },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
];
export const Stacking_Avatar_Only: Story = {
    args: {
        size: "large",
        withProfilePic: false,
        avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: true,
        titleAlign: "horizontal",
        maxVisibleAvatars: 3,
        avatars: avatars,
    }
} satisfies Story;
Stacking_Avatar_Only.parameters = { controls: { include: ['size', 'titleAlign','maxVisibleAvatars'] } };