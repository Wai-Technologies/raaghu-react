import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsCompDialog from "./rds-comp-dialog";

//Whatever code is commented in this file is needed in fututre reference - enhancement as per figma design

const meta: Meta = {
  title: "Elements/Dialog",
  component: RdsCompDialog,
  parameters: {
    layout: "padded",
    docs:{
      description: {
  component: `The **Dialog** component is a versatile modal dialog interface designed for clear and accessible user interactions such as confirmations, alerts, or information prompts. It supports customizable properties including \`Size\` (Large or Small) to adapt to different content needs, \`Style\` options (Default, Outlined, Filled) for flexible visual presentation, and \`ColorVariant\` to match your application's theme. The dialog can optionally display a \`Title\`, primary and secondary action buttons, and a dismiss (close) control, allowing developers to create focused user workflows like account deletion confirmations or warnings. Content positioning and an optional icon enhance the clarity and emphasis of messages, making this component ideal for critical user decisions and informative pop-ups. Fully reusable and design-consistent, it seamlessly integrates into diverse UI scenarios.`
}

    }
  },
  tags: ["autodocs"],
  argTypes: {
    Size: {
      options: ["Large", "Small"],
      control: { type: "select" },
    },
    Style: {
      options: ["Default", "Outlined", "Filled"],
      control: { type: "select" },
    },
    ContentPosition: {
      options: ["Bottom", "Left"],
      control: { type: "select" },
    },
    ColorVariant: {
      options: [
          "primary",
          "success",
          "danger",
          "warning",
          "light",
          "info",
          "secondary",
          "dark",
      ],
      control: { type: "select" },
  },
  },
} satisfies Meta<typeof RdsCompDialog>;

export default meta;
type Story = StoryObj<typeof RdsCompDialog>;

export const Default: Story = {
  args: {
    Size: "Large",
    Style: "Default",
    ShowDissmiss: true,
    ShowPrimary: true,
    ShowSecondary: true,
    ShowTitle: true,
    Title: "Delete Account",
    ColorVariant: "primary",
    Content: "Deleting this data will remove your account and you will no longer login to the application! Are you sure you want to proceed?",
    Icon: "dialog_icon", 
    ContentPosition: "Bottom",
  },
} satisfies Story;
Default.parameters = {
  controls: {
    include: [
      "Size",
      "Style",
      // "ColorVariant",
      "Title",
      // "Content",
      "ShowTitle",
      "ShowDissmiss",
      "ShowPrimary",
      "ShowSecondary",
        // "Icon",
        // "ContentPosition",
    ],
  },
};
