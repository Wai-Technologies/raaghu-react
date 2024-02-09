import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsIllustration from "./rds-illustration";

const meta: Meta = {
    title: 'Elements/Illustration',
    component: RdsIllustration,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<typeof RdsIllustration>;

export default meta;
type Story = StoryObj<typeof RdsIllustration>;


export const Illustration: Story = {
    args: {
        label: "Currently you don't have any data",
        subLabel: "Click on the button above to add data",
        iconHeight: '250px',
        iconWidth: '250px',
        iconPath: "/assets/lottie-files/outlined/dual-color/illustration-light.json",
        isContinueAnimate: true
    }
} satisfies Story;

