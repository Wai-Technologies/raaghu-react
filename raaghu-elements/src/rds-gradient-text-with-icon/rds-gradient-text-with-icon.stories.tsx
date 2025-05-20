import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsGradientTextWithIcon from "./rds-gradient-text-with-icon";
 
const meta: Meta = {
    title: "Components/AI ChatBox/Gradient Text With Icon",
    component: RdsGradientTextWithIcon,
    argTypes: {
       
    },
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsGradientTextWithIcon>;
 
 
export default meta;
type Story = StoryObj<typeof RdsGradientTextWithIcon>;
 
export const Default: Story = {
    args: {
        logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
        logo: "./assets/pundit_loader.gif",
        title: "AI Pundit is creating some magic for you",
    },
}