import React from "react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj, } from "@storybook/react";

const meta: Meta = {
  title: 'Elements/Badge',
  component: RdsBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ["small", "smaller", "smallest", "medium"],
      control: { type: "select" },
    },
    badgeType: {
      options: ["rectangle", "pill"],
      control: { type: "select" },
    },
    colorVariant: {
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
} satisfies Meta<typeof RdsBadge>;

export default meta;
type Story = StoryObj<typeof RdsBadge>;

const Positioned = (args: any) => (
  <>
    <RdsButton
      type="button"
      colorVariant="primary"
      size="small"
      label="Button"
    />
    <span className="position-fixed ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

const PositionedIcon = (args: any) => (
  <>
    <RdsIcon
      name="notification"
      width="25px"
      height="25px"
      fill={false}
      stroke={true}
    />
    <span className="position-absolute ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

export const TextBadge: Story = {
  args: {
    size: "small",
    label: "Badge",
    colorVariant: "primary",
    badgeType: "rectangle",
  }
} satisfies Story;
TextBadge.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType'] } };

export const WithLabel: Story = {
  args: {
    size: "smaller",
    label: "99",
    colorVariant: "danger",
    badgeType: "rectangle",
    positioned: true,
  },
  render: Positioned
} satisfies Story;
WithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };

export const WithIcon: Story = {
  args: {
    size: "smallest",
    label: "9",
    colorVariant: "danger",
    badgeType: "pill",
    positioned: true,
  },
  render: PositionedIcon
} satisfies Story;
WithIcon.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };

export const IconBadge: Story = {
  args: {
    iconName: "circle",
    size: "smallest",
    colorVariant: "danger",
    badgeType: "pill",
    iconFill: true,
    iconStroke: true,
    isIconshow: true,
    isIconBorder: true,
    isOutline: true,
  },
} satisfies Story;
IconBadge.parameters = { controls: { include: ['iconName', 'size', 'colorVariant', 'badgeType', 'iconFill', 'iconStroke', 'isOutline'] } };

export const textWithIcon: Story = {
  args: {
    iconName: "circle",
    size: "smallest",
    label: "Badge",
    colorVariant: "danger",
    badgeType: "pill",
    iconFill: true,
    iconStroke: true,
    iconPosition: "left",
    isTextWithIcon: true,
    isOutline: true,
  },
} satisfies Story;
textWithIcon.parameters = { controls: { include: ['iconName','size', 'label', 'colorVariant', 'badgeType', 'iconFill', 'iconStroke', 'iconPosition', 'isOutline'] } };