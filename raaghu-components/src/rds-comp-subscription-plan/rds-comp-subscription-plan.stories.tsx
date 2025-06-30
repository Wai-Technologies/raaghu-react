import React from "react";
import RdsCompSubscriptionPlan from "./rds-comp-subscription-plan";
import { I18nextProvider } from "react-i18next";
import i18n from 'i18next';
import { StoryObj, Meta } from "@storybook/react";

const meta: Meta = {
  title: "Components/AI ChatBox/Subscription Plan",
  component: RdsCompSubscriptionPlan,
  parameters:{
    docs:{
      description: {
  component: `The **Subscription Plan** component showcases available subscription tiers—such as Free and Premium plans—within the AI ChatBox interface. It clearly communicates pricing, plan descriptions, and included features for each tier, helping users easily understand and compare the benefits. This component supports full customization, including:
  
- Plan labels (\`freePlanText\`, \`premiumPlanText\`)
- Plan prices and descriptions
- Lists of included features for each tier
- Custom branding (logo, background, panel images)

Designed with clarity and marketing intent, it enhances user decision-making with structured layout, highlighting current subscription status (\`currentPlanText\`) and upgrade prompts (\`upgradeText\`). Ideal for SaaS applications aiming to convert users with clear value propositions, visual branding, and responsive layout support.`
}

    }
  },
  tags: ["autodocs"],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompSubscriptionPlan>;

export default meta;

type Story = StoryObj<typeof RdsCompSubscriptionPlan>;

export const Standard: Story = {
  args: {
    freePlanText: "Free",
  premiumPlanText: "Premium",
  upgradeText: "Upgrade to",
  aiPunditChatText: "Components/Automate",
  proText: "Pro",
  currentPlanText: "You’re currently on the free plan",
  freePlanDescription: "Perfect for individuals exploring our platform.",
  premiumPlanDescription: "Take your projects to the next level with pro features.",
  freePlanPrice: "$0",
  premiumPlanPrice: "---",
  freePlanFeatures: [
    "Access to chat.raaghu.ai",
    "Up to 5 credits daily",
    "Share chat URL with anyone"
  ],
  premiumPlanFeatures: [
    "Everything in free",
    "Higher messaging limits",
    "Custom domains on integration option",
    "Unlimited Projects",
    "Import from Figma",
    "Integrate ABP",
    "Integrate ASP.NET Zero"
  ],
  perMonthText: "/month",
  forIndividualsText: "For Individuals:",
  forProUsersText: "For pro users:",
  whatsIncludedText: "What’s included",
  backgroundImageSrc: "./assets/backGif.gif",
  panelImageSrc: "./assets/Panel-0421.png",
  aiPunditLogoSrc: "./assets/AIPunditColored.png"
  },
} satisfies Story;