import React from "react";
import Tooltip, { TooltipStyle, TooltipTrigger } from "./rds-tooltip";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Elements/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
  component: `The **Tooltip** component provides contextual information or guidance when users hover over, focus on, or click an element. It supports multiple arrow **styles** such as \`NoArrow\`, \`MiddleTopArrow\`, \`MiddleBottomArrow\`, \`LeftArrow\`, \`RightArrow\`, and their positional variations to visually indicate the tooltip's anchor point relative to the target element. The tooltip content is customizable via the \`label\` prop, allowing clear and concise messaging. It enhances user experience by offering non-intrusive hints and explanations within interfaces, helping users understand functionality without cluttering the UI. This component integrates seamlessly with buttons, icons, and other interactive elements, aligning with the design system's accessibility and usability standards.`
}
,
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(NoArrow|MiddleBottomArrow|MiddleTopArrow|LeftArrow|RightArrow|LeftTopArrow|RightTopArrow|LeftBottomArrow|RightBottomArrow)"/g, '{TooltipStyle.$1}');
                    code = code.replace(/"(hover|click|focus|manual)"/g, '{TooltipTrigger.$1}');
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: ["NoArrow", "MiddleTopArrow", "MiddleBottomArrow", "LeftArrow", "LeftTopArrow", "LeftBottomArrow", "RightArrow", "RightTopArrow", "RightBottomArrow"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        label: "This is tooltip",
        style: TooltipStyle.RightArrow,
        children: <button className="btn btn-primary">Button</button>
    }
} satisfies Story;
Default.parameters = { controls: { include: ['label', 'style'] } };
