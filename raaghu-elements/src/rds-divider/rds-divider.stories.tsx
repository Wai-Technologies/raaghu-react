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
                control: { type: "select" },
            },
            textalign:{
                options:[
                        "left",
                        "middle",
                        "right"
                ],
                control: { type: "select" },
            }
    },
} satisfies Meta<typeof RdsDivider>;

export default meta;
type Story = StoryObj<typeof RdsDivider>;

export const Default: Story = {
    args: {
        icon: "information",
        iconShow: true,
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

Default.parameters = { controls: { include: ['icon','iconShow','colorVariant', 'size', 'textalign','withdashed','dividerMessage'] } };
