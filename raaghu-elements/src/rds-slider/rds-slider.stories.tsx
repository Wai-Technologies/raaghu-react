import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsSlider, { ColorVariant, SliderLevel, SliderSize, SliderStyle, SliderType } from "./rds-slider";
 
 
const meta: Meta = {
    title: "Elements/Slider",
    component: RdsSlider,
    parameters: {
        layout: 'padded',
        docs:{
            source: {
                transform:(code: string) => {
                   // Transform size enum - remove spaces and transform
                    code = code.replace(/size="([^"]+)"/g, (match, p1) => `size={SliderSize.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/size:\s*"([^"]+)"/g, (match, p1) => `size: SliderSize.${p1.replace(/\s+/g, "")}`);
                    // Transform type enum - remove spaces and transform
                    code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={SliderType.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/type:\s*"([^"]+)"/g, (match, p1) => `type: SliderType.${p1.replace(/\s+/g, "")}`);
                    // Transform level enum - remove spaces and transform
                    code = code.replace(/level="([^"]+)"/g, (match, p1) => `level={SliderLevel.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/level:\s*"([^"]+)"/g, (match, p1) => `level: SliderLevel.${p1.replace(/\s+/g, "")}`);
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={SliderStyle.${p1.replace(/\s+/g, "")}}`);
                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: SliderStyle.${p1.replace(/\s+/g, "")}`);
                    return code;
                }
            }
        }
      },
      tags: ['autodocs'],
      argTypes: {
        // colorVariant: {
        //   options: [
        //     "primary",
        //     "secondary",
        //     "success",
        //     "info",
        //     "warning",
        //     "danger",
        //     "dark",
        //     "light",
        //   ],
        //   control: { type: "select" },
        // },
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
  Default.parameters = { controls: { include: ['type', 'leftLabel', 'rightLabel', 'showLabels', 'level', 'style'] } };