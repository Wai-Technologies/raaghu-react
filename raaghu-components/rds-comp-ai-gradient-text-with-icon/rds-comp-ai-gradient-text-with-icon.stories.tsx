import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import RdsCompAiGradientTextWithIcon from "./rds-comp-ai-gradient-text-with-icon";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
 
const meta: Meta = {
    title: "Components/AI ChatBox/Gradient Text With Icon",
    component: RdsCompAiGradientTextWithIcon,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsCompAiGradientTextWithIcon>;


export default meta;
type Story = StoryObj<typeof RdsCompAiGradientTextWithIcon>;

export const Default: Story = {
    args: {
        logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
        logo: <AutoAwesomeIcon className="pundit-icon" />,
        title: "AI Pundit is creating some magic for you",
        showImage: true,
        showIcon: true,
    },
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
}