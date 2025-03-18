import React from "react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj, } from "@storybook/react";
import { alert_colors } from "../../libs";
import { badge_colors } from "../../libs/types/colorvariant";

const meta: Meta = {
  title: 'Elements/Badge',
  component: RdsBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    shape: {
      options: ["pill", "rectangle"],
      control: { type: "select" },
    },
    colorVariant: {
      options: [
        "primary",
        "secondary",
        "tertiary",
        "danger",
        "warning",
        "light",
        // "info",
        "success",
      ],
      control: { type: "select" },
    },
    layout: {
      options: ["Text_only", "Icon_only", "Icon+Text", "Text+Icon"],
      control: { type: "select" },
    },
    style: {
      options: ["primary", "outline", "transparent"],
      control: { type: "select" },
    },
    state: {
      options: ["default", "disabled"],
      control: { type: "select" },
    },
    /*iconPosition: {
      options: ["left", "right"],
      control: { type: "select" },
    },*/
    /*isIconshow: {
      control: { type: "boolean" },
    },*/
    iconName: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof RdsBadge>;

export default meta;
type Story = StoryObj<typeof RdsBadge>;

const Positioned = (args: any) => (
  <>
    <RdsButton
      type="button"
      colorVariant={args.colorVariant}
      size={args.size}
      label={args.buttonLabel}
    />
    <span className="position-fixed ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

/*const PositionedIcon = (args: any) => (
  <>
    <span className={`icon-${args.size}`}>
      <RdsIcon
        name={args.iconName}
        width="25px"
        height="25px"
        fill={false}
        stroke={true}
        colorVariant={args.colorVariant}
      /></span>
    <span className="position-absolute ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);*/

export const TextBadge: Story = {
  args: {
    size: "small",
    shape: "rectangle",
    layout: "Text_only",
    style: "primary",
    state: "default",
    colorVariant: "primary",
    label: "Badge",
    isIconshow: true,
    iconName: "notification",
    //iconPosition: "right",
  },
} satisfies Story;
TextBadge.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'shape', 'layout', 'style', 'state', 'iconName'] } };
/*
export const WithLabel: Story = {
  args: {
    size: "small",
    label: "99",
    colorVariant: "danger",
    badgeType: "box",
    textwithlabel: true,
    buttonLabel: "Button1",

  },
  render: Positioned
} satisfies Story;
WithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'buttonLabel'] } };

export const WithIcon: Story = {
  args: {
    size: "small",
    label: "9",
    colorVariant: "danger",
    badgeType: "pill",
    textwithlabel: true,
    iconName: "notification",
  },
  render: PositionedIcon
} satisfies Story;
WithIcon.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'iconName'] } };*/
/*export const TextWithLabel: Story = {
  args: {
    size: "small",
    label: "9",
    colorVariant: "danger",
    badgeType: "pill",
    textwithlabel: true,
  },
} satisfies Story;
TextWithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'borderColor'] } };*/
/*export const BadgeWithIcon: Story = {
  args: {
    size: "small",
    colorVariant: "primary",
    badgeType: "pill",
    iconName: "notification", // Name of the icon
    layout: "Icon_only",
    style: "primary",
    label: "Badge",
  },
  render: (args) => (
    <RdsBadge {...args}>
    </RdsBadge>
  ),
};
BadgeWithIcon.parameters = { controls: { include: ['size', 'colorVariant', 'badgeType', 'iconName', 'layout', 'style'] } };
*/
/*export const BadgeWithIconAndText: Story = {
  args: {
    size: "small",
    label: "Badge",
    colorVariant: "primary",
    badgeType: "pill",
    iconName: "notification", // Adjust based on your available icons
    layout: "Icon+Text",
    style: "primary",

  },
  render: (args) => (
    <RdsBadge {...args}>
      {args.iconPosition === "left" && (
        <RdsIcon name={args.iconName} width="16px" height="16px" classes="me-1" />
      )}
      {args.label}
      {args.iconPosition === "right" && (
        <RdsIcon name={args.iconName} width="16px" height="16px" classes="ms-1" />
      )}
    </RdsBadge>
  ),
};
BadgeWithIconAndText.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'iconName', 'layout', 'style'] } };
*/
/*
export const BadgeWithRightIconAndText: Story = {
  args: {
    size: "small",
    label: "Badge",
    colorVariant: "primary",
    badgeType: "pill",
    iconName: "notification", // Adjust based on your available icons
    layout: "Text+Icon",
    style: "primary",

  },
  render: (args) => (
    <RdsBadge {...args}>
      {args.iconPosition === "left" && (
        <RdsIcon name={args.iconName} width="16px" height="16px" classes="me-1" />
      )}
      {args.label}
      {args.iconPosition === "right" && (
        <RdsIcon name={args.iconName} width="16px" height="16px" classes="ms-1" />
      )}
    </RdsBadge>
  ),
};
BadgeWithRightIconAndText.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'iconName', 'layout', 'style'] } };
*/
