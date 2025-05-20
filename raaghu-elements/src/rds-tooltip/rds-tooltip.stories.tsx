import React from "react";
import Tooltip, { TooltipStyle, TooltipTrigger } from "./rds-tooltip";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
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
