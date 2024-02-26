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
            options: ["small", "medium", "large"],
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
