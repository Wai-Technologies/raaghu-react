import RdsDivider from "./rds-divider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Divider',
    component: RdsDivider,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component:
            'The **Divider** element is a customizable visual separator for organizing and grouping content within your application. It supports multiple styles (`subtle`, `strong`, `primary`), sizes (`small`, `medium`, `large`), and layouts (`horizontal`, `vertical`). The divider can display optional text and icons, with adjustable alignment (`left`, `middle`, `right`), and can be rendered as dashed or solid. Flexible props allow you to tailor its appearance and behavior, making it ideal for creating clear visual breaks between sections in forms, cards, pages, or any part of your design system.'
    }
}
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