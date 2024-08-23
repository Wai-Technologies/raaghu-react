import RdsDivider from "./rds-divider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Divider',
    component: RdsDivider,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
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
            size:{
                options:[
                        "small",
                        "medium",
                        "large"
                ],
                control: { type: "radio" },
            },
            textalign:{
                options:[
                        "left",
                        "middle",
                        "right"
                ],
                control: { type: "radio" },
            }
    },
} satisfies Meta<typeof RdsDivider>;

export default meta;
type Story = StoryObj<typeof RdsDivider>;

export const Default: Story = {
    args: {
        icon: "information",
        iconFill: false,
        iconStroke: true,
        iconHeight: "20px",
        iconWidth: "20px",
        dividerMessage: "Content",
        colorVariant: "primary",
        size: "medium",
        textalign: "middle",
        withdashed: false,

    }
} satisfies Story;

Default.parameters = { controls: { include: ['icon','colorVariant', 'size', 'textalign','withdashed','dividerMessage'] } };
