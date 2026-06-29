import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompAiGradientTextWithIcon from "./rds-comp-ai-gradient-text-with-icon";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
 
const meta: Meta = {
    title: "Components/AI ChatBox/Gradient Text With Icon",
    component: RdsCompAiGradientTextWithIcon,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    },
    tags: ['autodocs', 'stable'],
} satisfies Meta<typeof RdsCompAiGradientTextWithIcon>;


export default meta;
type Story = StoryObj<typeof RdsCompAiGradientTextWithIcon>;

export const Default: Story = {
    args: {
        logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu_icon.png",
        logo: <AutoAwesomeIcon className="pundit-icon" />,
        title: "AI Pundit is creating some magic for you",
        showImage: true,
        showIcon: true,
    },

}