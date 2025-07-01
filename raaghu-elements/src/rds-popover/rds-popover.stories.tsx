import React from "react";
import RdsPopover, { PopoverState } from "./rds-popover";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Elements/Popover',
    component: RdsPopover,
    parameters: {
        layout: 'centered',
        docs: { 
            description: {
        component:
            'The **Popover** element is a customizable overlay component used to display additional information, content, or actions in a floating panel anchored to a target element. It supports multiple placement options (`No Arrow`, `Top Left`, `Top Centre`, `Top Right`, `Bottom Left`, `Bottom Centre`, `Bottom Right`, `Left Top`, `Left Centre`, `Left Bottom`, `Right Top`, `Right Centre`, `Right Bottom`) to control where the popover appears relative to the trigger. This element is ideal for tooltips, contextual menus, and interactive content, and can be tailored to fit your design system needs.'
    },
            source:{
                transform: (code: string) => {
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={PopoverState.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: PopoverState.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            options: [
                "No Arrow", "Top Left", "Top Centre", "Top Right",
                "Bottom Left", "Bottom Centre", "Bottom Right",
                "Left Top", "Left Centre", "Left Bottom",
                "Right Bottom", "Right Centre", "Right Top"
            ],
            mapping: {
                "No Arrow": PopoverState.NoArrow,
                "Top Left": PopoverState.TopLeft,
                "Top Centre": PopoverState.TopCentre,
                "Top Right": PopoverState.TopRight,
                "Bottom Left": PopoverState.BottomLeft,
                "Bottom Centre": PopoverState.BottomCentre,
                "Bottom Right": PopoverState.BottomRight,
                "Left Top": PopoverState.LeftTop,
                "Left Centre": PopoverState.LeftCentre,
                "Left Bottom": PopoverState.LeftBottom,
                "Right Bottom": PopoverState.RightBottom,
                "Right Centre": PopoverState.RightCentre,
                "Right Top": PopoverState.RightTop,
            },
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsPopover>;

export default meta;
type Story = StoryObj<typeof RdsPopover>;

export const PopoverWithDirection: Story = {
    args: {
        state: PopoverState.TopLeft,
        children: <p>Replace with your content component </p>,
    }
} satisfies Story;
PopoverWithDirection.parameters = { controls: { include: ['state'] } };