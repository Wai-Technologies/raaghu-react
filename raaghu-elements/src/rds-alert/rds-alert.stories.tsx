import { Alert } from "bootstrap";
import RdsAlert, { AlertStyle, AlertPosition, AlertType } from "./rds-alert";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RdsAlert> = {
  title: "Elements/Alerts",
  component: RdsAlert,
  parameters: {
    // layout: 'centered',
    docs: {
    description: {
 component: `The Alert element is a flexible UI component used to display important messages such as **information**, **warning**, or **error**. It supports various configurations like alert type, size, layout, and **position**. Users can enable or disable elements like titles, descriptions, icons, links, and dismiss buttons to match different contexts. Alerts can also be sticky, timed, or include primary and secondary actions, allowing for clear, interactive communication across the interface.`,

},

      source: {
        transform: (code: string) => {
          code = code.replace(/"(info|success|warning|error)"/g, '{AlertType.$1}');
          code = code.replace(/"(none|single|left border)"/g, '{AlertBorder.$1}');
          code = code.replace(/"(top|bottom)"/g, '{AlertPosition.$1}');
          code = code.replace(/"(singleline|multiline)"/g, '{AlertDisplayType.$1}');
          return code;
        }
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["info", "success", "warning", "error"],
      control: { type: "select" },
    },
    style: {
      options: ["Style 1", "Style 2", "Style 3"],
      control: { type: "select" },
    },
    position: {
      options: ["top", "bottom"],
      control: { type: "radio" },
      //if: { arg: "sticky" },
    },
    linkUrl: {
      control: {type: "text"},
      //if: { arg: "showlink"},
    },
    showPrimary: {
      if: { arg: "showButton"},
    },
    showSecondary: {
      if: { arg: "showButton"},
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    displayType: {
      options: ["singleline", "multiline"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsAlert>;

/*export const SingleLineAlert: Story = {
  args: {
    type: "info",
    icon: "information",
    title: "Heading Title. ",
    message: "This is the description of the message bar.",
    border: "none",
    size: "small",
    dismisable: true,
    linkUrl: "https://example.com",
    iconFill: false,
    delay: 5000,
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
    sticky: false,
    position: "top",
    multiline: false,
    showlink: true,
    showbutton: true,
  },
};
SingleLineAlert.parameters = {
  controls: {
    include: [
      "type",
      "icon",
      "title",
      "message",
      "border",
      "size",
      "dismisable",
      "sticky",
      "position",
      "showlink",
      "showbutton",
      "linkUrl",
      "delay",
      "multiline",
    ],
  },
};*/

export const Standard: Story = {
  args: {
    type: AlertType.info,
    style: AlertStyle.style1,
    multiline: false,
    changeIcon: "information",
    showTitle: true,
    title: "Heading Title.",
    description: "This is the description of the message bar.",
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
    size: "medium",
    showLink: true,
    showButton: true,
    showPrimary: true,
    showSecondary: true,
    showDismiss: true,
    showDescription: true,
    showIcon: true,
    iconFill: false,
    delay: 5000,
    linkUrl: "https://example.com",
  },
};
Standard.parameters = {
  controls: {
    include: [
      "type",
      "changeIcon",
      "showTitle",
      "title",
      "description",
      "style",
      "size",
      "dismisable",
      "showLink",
      "showButton",
      "showPrimary",
      "showSecondary",
      "showDismiss",
      "showDescription",
      "showIcon",
      "multiline",
    ],
  },
};
