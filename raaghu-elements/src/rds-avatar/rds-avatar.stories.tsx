import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsAvatar from "./rds-avatar";

const colorVariantArgTypes = {
   
};

const textAlignArgTypes = {
    titleAlign: {
        options: ["horizontal", "vertical"],
        control: { type: "select" },
    },
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Elements/Avatar",
    component: RdsAvatar,
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
} as ComponentMeta<typeof RdsAvatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RdsAvatar> = (args: any) => (
    <RdsAvatar {...args}  />
);

export const Default = Template.bind({});
Default.args = {
    size: "medium",
};

export const withInitials = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
withInitials.args = {
    //colorVariant: "primary",
    firstName: "Wai",
    lastName: "Technologies",
    size: "medium",
};

withInitials.argTypes = colorVariantArgTypes;

export const withLabel = Template.bind({});
withLabel.args = {
    //colorVariant: "primary",
    firstName: "Wai",
    lastName: "Technologies",
    size: "medium",
    isTitle: true,
    titleAlign: "horizontal",
    role: "Developer",
};

withLabel.argTypes = colorVariantArgTypes;
withLabel.argTypes = textAlignArgTypes;

export const withProfile = Template.bind({});
withProfile.args = {
    size: "small",
    withProfilePic: true,
    firstName: "Wai",
    lastName: "Technologies",
    titleAlign: "horizontal",
    role: "Developer",
    //colorVariant: "primary",
    profilePic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
};

withProfile.argTypes = textAlignArgTypes;
