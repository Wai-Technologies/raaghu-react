import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompGradientTextWithIcon from "./rds-comp-gradient-text-with-icon";
 
const meta: Meta = {
    title: "Components/AI ChatBox/Gradient Text With Icon",
    component: RdsCompGradientTextWithIcon,
    argTypes: {
       
    },
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Gradient Text With Icon** component combines dynamic gradient-styled text with an accompanying icon or logo to create visually engaging headers or status indicators within the AI ChatBox interface. It accepts a \`logoUrl\` prop for specifying a remote image URL, and a \`logo\` prop to provide a local image source, allowing flexibility in icon usage. The \`title\` prop defines the primary text displayed alongside the icon, supporting customizable messaging. This component is ideal for highlighting processes, status updates, or branding elements, offering a modern and vibrant presentation that enhances user engagement through animated or static visuals paired with gradient typography.`
}

        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsCompGradientTextWithIcon>;
 
 
export default meta;
type Story = StoryObj<typeof RdsCompGradientTextWithIcon>;
 
export const Standard: Story = {
    args: {
        logoUrl: "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
        logo: "./assets/pundit_loader.gif",
        title: "AI Pundit is creating some magic for you",
    },
}