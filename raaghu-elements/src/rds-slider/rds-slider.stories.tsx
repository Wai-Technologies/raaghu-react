import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsSlider, { ColorVariant, SliderLevel, SliderSize, SliderStyle, SliderType } from "./rds-slider";
 
 
const meta: Meta = {
    title: "Elements/Slider",
    component: RdsSlider,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Slider** element is a dynamic and customizable input control for selecting numeric values or ranges within a defined scale. It supports **single-direction (One Way)** and **bi-directional (Two Way)** slider types through the \`SliderType\` enum. You can configure its **size** (\`small\`, \`medium\`, \`large\` via \`SliderSize\`), **visual style** (\`default\`, \`show tooltip\` via \`SliderStyle\`), and **level** (1 to 5 via \`SliderLevel\`) to indicate data or importance tier visually. Labels can be shown on either side of the slider with \`leftLabel\` and \`rightLabel\`, and their visibility can be toggled using \`showLabels\`. 

This component is ideal for dashboards, settings panels, user preference forms, and any interface requiring smooth and intuitive numeric input. The Slider element aligns with the design system's customizable principles and ensures consistency in user interaction patterns across applications.`,
}
,
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
 
export const Standard: Story = {
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
  Standard.parameters = { controls: { include: ['type', 'leftLabel', 'rightLabel', 'showLabels', 'level', 'style'] } };