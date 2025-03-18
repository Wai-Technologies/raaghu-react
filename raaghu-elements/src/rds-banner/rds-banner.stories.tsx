import React from "react";
import RdsBanner from "./rds-banner";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsBanner> = {
  title: "Components/Banner",
  component: RdsBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      options: ["top", "bottom"],
      control: { type: "radio" },
      if: { arg: "sticky" },
    },
    colorVariant: {
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
      control: { type: "select" },
    },
    textAlign: {
      options: ["start", "end", "center"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsBanner>;

export const Banner: Story = {
  args: {
    textAlign: "start",
    bannerText: "Big news ! We are excited to announce a brand new product.",
    sticky: false,
    position: "top",
    colorVariant: "info",
    icon: "information",
    iconHeight: "20px",
    iconWidth: "20px",
    iconStroke: true,
    iconFill: false,
  },
};
Banner.parameters = {
  controls: {
    include: [
      "textAlign",
      "bannerText",
      "sticky",
      "position",
      "colorVariant",
      "icon",
      "iconHeight",
      "iconWidth",
      "iconStroke",
      "iconFill",
    ],
  },
};

export const ActionableBanner: Story = {
    args: {
        colorVariant: "light",
        headingText: "Discover",
        titleText: "15 days challenge",
        subTitleText: " We will deliver an MVP in a record time of 15 days",
        imageUrl: "../../../stories/assets/raaghubannerimage.png",
        firstButtonText: "About Us",
        secondButtonText: "Contact Us",
        firstButtonIcon: "learn_more",
        secondButtonIcon: "phone",
        showFirstButton: true,
        showSecondButton: true,
        raaghuBanner: true,
        showHyperlink: true,
        hyperlink: "https://www.raaghu.com",
        hyperlinkText: "Learn More",
        hyperlinkIcon: "learn_more"
     
    }
} satisfies Story;
ActionableBanner.parameters = { controls: { include: ['headingText', 'titleText', 'subTitleText', 'colorVariant', 'imageUrl','showFirstButton','showSecondButton','firstButtonText','secondButtonText','firstButtonIcon','secondButtonIcon','showHyperlink','hyperlink','hyperlinkText','hyperlinkIcon'] } };

