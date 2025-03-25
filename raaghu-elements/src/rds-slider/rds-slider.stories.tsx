import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsSlider, { ColorVariant, SliderLevel, SliderSize, SliderStyle, SliderType } from "./rds-slider";
 
 
const meta: Meta = {
    title: "Elements/Slider",
    component: RdsSlider,
    parameters: {
        layout: 'padded',
      },
      tags: ['autodocs'],
      argTypes: {
        colorVariant: {
          options: [
            "primary",
            "secondary",
            "success",
            "info",
            "warning",
            "danger",
            "dark",
            "light",
          ],
          control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        type: {
            options: ["One Way", "Two Way"],
            control: { type: "select" },
        },
        leftLabel: { control: { type: "text" } },
        rightLabel: { control: { type: "text" } },
        showLabels: { control: { type: "boolean" } },
        level: {
            options: [1, 2, 3, 4, 5],
            control: { type: "select" },
        },
        style: {
          options: ["default", "show tooltip"],
          control: { type: "select" },
      },
    },
} satisfies Meta<typeof RdsSlider>;
 
export default meta;
type Story = StoryObj<typeof RdsSlider>;
 
export const Default: Story = {
    args: {
        colorVariant: ColorVariant.Primary,
        type: SliderType.OneWay,
        size: SliderSize.Small,
        leftLabel: "0",
        rightLabel: "100",
        showLabels: true,
        level: SliderLevel.Level1,
        style: SliderStyle.Default
    },
  } satisfies Story;
  Default.parameters = { controls: { include: ['colorVariant', 'type', 'leftLabel', 'rightLabel', 'showLabels', 'level', 'style'] } };