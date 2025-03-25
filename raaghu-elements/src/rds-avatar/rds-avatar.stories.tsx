import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsAvatar, { AvatarSize, AvatarStyle, AvatarBorder} from "./rds-avatar";

const colorVariantArgTypes = {

};

const textAlignArgTypes = {
    titleAlign: {
        options: ["horizontal", "vertical"],
        control: { type: "select"},
    }as const,
};

const meta: Meta = {
    title: 'Elements/Avatar',
    component: RdsAvatar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
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
        size: {
            options: ["smallest","small", "medium", "large","largest"],
            control: { type: "select" },
        },
        type: {
            options: ["image", "initials","icon"],
            control: { type: "select" },
        },
        border: {
            options:["NoBorder","solid","dashed","dotted"],
            control: { type: "select" }
        },
        style: {
            options:["withname", "nameonbottom", "stacking"],
            control: { type: "select" }
        },
    },
} satisfies Meta<typeof RdsAvatar>;

export default meta;
type Story = StoryObj<typeof RdsAvatar>;
const avatars = [
    // Example avatars data
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU',  },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
    { profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU', },
];
export const Default: Story = {
    args: {
        size: AvatarSize.medium,
        type: "image",
        //avtarWithName: true,
        //isTitle: true,
        style: AvatarStyle.withname,
        activityRing : false,
        activeDotTop: false,
        activeDotBottom: false,
        showName: false,
        showNameDesignation: false,
        firstName: "Wai",
        lastName: "Technologies",
        role: "Developer",
        colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        maxVisibleAvatars: 3,
        avatars: avatars, 
    }
} satisfies Story;

Default.parameters = { controls: { include: ['size', 'showName', 'showNameDesignation', 'maxVisibleAvatars', 'avatars', 'firstName','style', 'lastName', 'role', /*'isTitle',*/'profilePic','colorVariant','activeDotTop','activeDotBottom','activityRing','type'] } };

/*
export const Default: Story = {
    args: {
        size: "medium",
        border:"NoBorder"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size','border'] } };


export const withInitials: Story = {
    args: {
        //colorVariant: "primary",
        firstName: "Wai",
        avtarOnly: false,
        avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,
        border:"NoBorder",
        lastName: "Technologies",
        size: "medium",
    }
} satisfies Story;
withInitials.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'border'] } };


withInitials.argTypes = colorVariantArgTypes;


export const withIcon: Story = {
    args: {
        size: "small",
        avtarOnly: false,
        avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,
        //colorVariant: "primary",
        border:"NoBorder",
        iconName:"Home",

    }
} satisfies Story;
withIcon.parameters = { controls: { include: ['size', 'iconName', 'border'] } };


export const withLabel: Story = {
    args: {
        //colorVariant: "primary",
        firstName: "Wai",
        lastName: "Technologies",
        avtarOnly: false,
        //avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,
        size: "medium",
        isTitle: true,
        role: "Developer",
        border:"NoBorder"
    }
} satisfies Story;
withLabel.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'isTitle', 'role', 'border'] } };


withLabel.argTypes = colorVariantArgTypes;
withLabel.argTypes = textAlignArgTypes;

export const withProfile: Story = {
    args: {
        size: "small",
        withProfilePic: true,
        avtarOnly: false,
        //avtarWithName: false,
        nameOnBottom: false,
        stackingAvatar: false,
        firstName: "Wai",
        lastName: "Technologies",
        role: "Developer",
        //colorVariant: "primary",
        border:"NoBorder",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
withProfile.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'withProfilePic', 'role','border', 'profilePic'] } };


withProfile.argTypes = textAlignArgTypes;

export const Avatar_Only: Story = {
    args: {
        size: "large",
        avtarOnly: true,
        activeDotTop: true,
        activeDotBottom: true,
        activityChain : true,
        firstName: "Wai",
        lastName: "Technologies",
        role: "Developer",
        colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Avatar_Only.parameters = { controls: { include: ['size', 'profilePic','colorVariant', 'activeDotTop','activeDotBottom','activityChain'] } };

export const Avatar_With_Name: Story = {
    args: {
        size: "large",
        avtarWithName: true,
        activeDotTop: true,
        activeDotBottom: true,
        activityChain : true,
        firstName: "Wai",
        lastName: "Technologies",
        role: "Developer",
        colorVariant: "primary",
        type: "image",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Avatar_With_Name.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'role', 'profilePic','colorVariant','activeDotTop','activeDotBottom','activityChain','type'] } };

export const Name_On_Bottom: Story = {
    args: {
        size: "large",
        activeDotTop: true,
        activeDotBottom: true,
        activityChain : true,
        nameOnBottom: true,
        firstName: "Wai",
        lastName: "Technologies",
        role: "Developer",
        colorVariant: "primary",
        profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    }
} satisfies Story;
Name_On_Bottom.parameters = { controls: { include: ['size', 'firstName', 'lastName', 'role', 'profilePic','colorVariant','activeDotTop','activeDotBottom','activityChain'] } };

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
        stackingAvatar: true,
        maxVisibleAvatars: 3,
        avatars: avatars,
    }
} satisfies Story;
Stacking_Avatar_Only.parameters = { controls: { include: ['size', 'maxVisibleAvatars'] } };*/

