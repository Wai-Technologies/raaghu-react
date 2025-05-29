import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsAiPromptBox from "./rds-ai-prompt-box";

const meta: Meta = {
  title: "Components/AI Prompt Box",
  component: RdsAiPromptBox,
  parameters: {
    layout: "padded",
    docs:{
      description: {
  component: `The **AI Prompt Box** component is an interactive UI element designed to collect, display, and manage AI prompts in a user-friendly format. It supports a \`prefilledprompt\` array, allowing developers to provide default prompt suggestions that guide user input. The \`showVariations\` boolean prop enables toggling of prompt variations, offering users additional context or inspiration. The \`outputtype\` prop controls the response format, supporting values like \`Raaghu_reply_with_design\` and \`Ai_reply_with_output\`, which define how the AI's response should be formatted. The \`colorVariant\` prop allows customization of the component's theme (e.g., primary, secondary). The \`generateButtonText\` prop defines the label on the action button that triggers prompt submission. The component also supports branding with \`aiPunditLogoImage\`, displaying a logo alongside the input. Lastly, \`placeholderText\` helps guide users on what to enter by displaying hint text in the input field. This component is ideal for AI-powered applications, chat interfaces, or creative tools where user-generated prompts are central to functionality.`
},

    }
  },
  tags: ["autodocs"],
  argTypes: {
    outputtype: {
      options: ["Raaghu_reply_with_design", "Ai_reply_with_output"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsAiPromptBox>;

export default meta;

type Story = StoryObj<typeof RdsAiPromptBox>;

export const Default: Story = {
  args: {
    prefilledprompt: [
      { question: "Prefilled Prompt 1" },
      { question: "Prefilled Prompt 2" },
      { question: "Prefilled Prompt 3" },
      { question: "Prefilled Prompt 4" },
    ],
    showVariations: true,
    outputtype: "Raaghu_reply_with_design",
    colorVariant: "primary",
    generateButtonText: "Generate",
    aiPunditLogoImage:
      "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/pundit-color-logo.png",
    placeholderText: "Type your prompt here...",
  },
} satisfies Story;
Default.parameters = {
  controls: {
    include: [
      "prefilledprompt",
      "showVariations",
      "outputtype",
      "colorVariant",
      "generateButtonText",
      "aiPunditLogoImage",
      "placeholderText",
    ],
  },
};
