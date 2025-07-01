import React from "react";
import RdsCompBanner, { ColorVariant, Position, TextAlign } from "./rds-comp-banner";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsCompBanner> = {
  title: "Components/Banner",
  component: RdsCompBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
  component: `The **Banner** component is a versatile UI element designed to deliver key messages or announcements prominently within an application interface. It supports customization of content, alignment, position, and styling, making it suitable for notifications, alerts, and promotional banners. The \`bannerText\` prop displays the main message, while the \`textAlign\` and \`position\` props control the text alignment (start, center, end) and vertical positioning (top or bottom) on the page.

In its basic form (Stories Banner), it can include an icon with customizable dimensions and styling through props like \`icon\`, \`iconHeight\`, \`iconWidth\`, \`iconStroke\`, and \`iconFill\`. The \`sticky\` flag ensures the banner remains fixed as users scroll, enhancing visibility for critical alerts.

The extended version (Actionable Banner) is ideal for promotional use cases. It supports a more engaging layout with headings, subtext, background imagery, and interactive buttons. Props like \`headingText\`, \`titleText\`, \`subTitleText\`, \`imageUrl\`, and multiple configurable buttons allow it to function as a mini landing section. Hyperlink support with optional icons further enables redirection to external or internal resources. This makes the component highly adaptable for both informative and actionable content in dashboards, marketing pages, or onboarding flows.`
}
,
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
type Story = StoryObj<typeof RdsCompBanner>;

export const Standard: Story = {
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
Standard.parameters = {
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

