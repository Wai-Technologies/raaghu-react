import React from "react";
import RdsAppDetail, { IconPosition } from "./rds-app-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Components/App Details",
  component: RdsAppDetail,
  parameters: {
    layout: "padded",
    docs: {
  description: {
  component: `The **App Details** component is a visually structured UI block designed to present detailed information about an application or integration. It accepts an \`appDetailsItem\` object containing key properties such as \`title\`, \`subtitle\`, and \`icon\`, along with routing-related details like \`route\` and \`routeLabel\`. The component supports icon customization through properties like \`iconHeight\`, \`iconWidth\`, \`iconColor\`, \`iconFill\`, and \`iconStroke\`, allowing for consistent iconography across different themes. The \`selected\` flag visually indicates an active or highlighted state for the app. Additionally, the \`iconPosition\` prop lets developers control the icon alignment (\`left\`, \`center\`, or \`right\`), while the \`showUpperBorder\` boolean toggles a top border for visual separation. This component is ideal for dashboards, integration listings, and application summaries, offering clear, configurable presentation of app-related metadata.`
},

      source: {
          transform: (code: string) => {
              code = code.replace(/"(left|center|right)"/g, '{IconPosition.$1}');
              return code;
          },
      },
  },
  },
  tags: ["autodocs"],
  argTypes: {
    iconPosition: {
      options: ["left", "center", "right"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof RdsAppDetail>;

export default meta;
type Story = StoryObj<typeof RdsAppDetail>;

export const Default: Story = {
  args: {
    iconPosition: IconPosition.Left,
    showUpperBorder: true,
    linkUrl: "https://example.com",
    appDetailsItem: {
      title: "Zapier",
      subtitle: "Build custom automation and integration with app",
      icon: "zapier",
      route: "/home",
      selected: true,
      iconHeight: "30px",
      iconWidth: "30px",
      iconFill: true,
      iconColor: "warning",
      iconStroke: true,
      routeLabel: "View integration",
    },
  },
} satisfies Story;
Default.parameters = {
  controls: { include: ["iconPosition", "appDetailsItem", "showUpperBorder"] },
};
