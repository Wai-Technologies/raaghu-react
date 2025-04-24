import React from "react";
import RdsBanner, { ColorVariant, Position, TextAlign } from "./rds-banner";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsBanner> = {
  title: "Components/Banner",
  component: RdsBanner,
  parameters: {
    layout: "padded",
    docs: {
      source : {
          transform: (code: string) => {
              // Transform colorVariant enum - remove spaces and transform
              code = code.replace(/colorVariant="([^"]+)"/g, (match, p1) => `colorVariant={ColorVariant.${p1.replace(/\s+/g, '')}}`);
              code = code.replace(/colorVariant:\s*"([^"]+)"/g, (match, p1) => `colorVariant: ColorVariant.${p1.replace(/\s+/g, '')}`);
              // Transform Position enum - remove spaces and transform
              code = code.replace(/position="([^"]+)"/g, (match, p1) => `position={Position.${p1.replace(/\s+/g, '')}}`);
              code = code.replace(/position:\s*"([^"]+)"/g, (match, p1) => `position: Position.${p1.replace(/\s+/g, '')}`);
               // Transform textAlign enum - remove spaces and transform
               code = code.replace(/textAlign="([^"]+)"/g, (match, p1) => `textAlign={TextAlign.${p1.replace(/\s+/g, '')}}`);
               code = code.replace(/textAlign:\s*"([^"]+)"/g, (match, p1) => `textAlign: TextAlign.${p1.replace(/\s+/g, '')}`);
              return code;
          }
      }
  }
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
    textAlign: TextAlign.Start,
    bannerText: "Big news ! We are excited to announce a brand new product.",
    sticky: false,
    position: Position.Top,
    colorVariant: ColorVariant.Info,
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
        colorVariant: ColorVariant.Light,
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

