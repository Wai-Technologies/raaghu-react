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
        Style: {
                options: [                                  
                    "subtle",
                    "strong",
                    "primary", 
                ],
                control: { type: "select" },
            },
            size:{
                options:[
                        "small",
                        "medium",
                        "large",
                ],
                control: { type: "select" },
            },
            textalign:{
                options:[
                        "left",
                        "middle",
                        "right",
                ],
                control: { type: "select" },
            },
            layout:{
                options:[
                        "horizontal",
                        "vertical",
                ],
                control: { type: "select" },
            },

    },
} satisfies Meta<typeof RdsDivider>;

export default meta;
type Story = StoryObj<typeof RdsDivider>;

export const Default: Story = {
    args: {
        icon: "information_divider",
        iconShow: true,
        iconFill: false,
        iconStroke: true,
        iconHeight: "20px",
        iconWidth: "20px",
        dividerMessage: "Content",
        Style: "subtle",
        size: "medium",
        textalign: "middle",
        withdashed: false,
        layout: "horizontal",
    }
} satisfies Story;

Default.parameters = { controls: { include: ['icon','iconShow','Style', 'size', 'textalign','withdashed','dividerMessage','layout'] } };