import RdsTag, { ColorVariant, Role, TagType } from "./rds-tag";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Tag',
    component: RdsTag,
    parameters: { 
        layout: 'padded',

        docs: {
            description: {
        component: 
            'The **Tag** component is a versatile and customizable UI element designed for labeling, categorizing, or highlighting content within your application. It supports multiple **types** (`Square`, `Round`) and **roles** (`Basic`, `TagWithScroll`) to adapt to various use cases. The component allows you to choose from a wide range of **color variants** (`Primary`, `Secondary`, `Success`, `Info`, `Warning`, `Danger`, `Dark`, `Light`) to match your design system. Additionally, it supports features like closable tags and dynamic tag arrays for enhanced interactivity. Ideal for dashboards, forms, filters, or any interface requiring compact and visually distinct labels, the Tag component is fully customizable to fit your application’s needs.'
    },
            source : {
                transform: (code: string) => {
                    // Transform colorVariant enum - remove spaces and transform
                    code = code.replace(/colorVariant="([^"]+)"/g, (match, p1) => `colorVariant={ColorVariant.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/colorVariant:\s*"([^"]+)"/g, (match, p1) => `colorVariant: ColorVariant.${p1.replace(/\s+/g, '')}`);
                    // Transform TagType enum - remove spaces and transform
                    code = code.replace(/tagType="([^"]+)"/g, (match, p1) => `tagType={TagType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/tagType:\s*"([^"]+)"/g, (match, p1) => `tagType: TagType.${p1.replace(/\s+/g, '')}`);
                     // Transform Role enum - remove spaces and transform
                     code = code.replace(/role="([^"]+)"/g, (match, p1) => `role={Role.${p1.replace(/\s+/g, '')}}`);
                     code = code.replace(/role:\s*"([^"]+)"/g, (match, p1) => `role: Role.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags:['autodocs'],
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
        tagType:{
            options:["square" , "round"],
            control: { type: "select" },
        },
        role:{
            options:["basic" , "tagWithScroll"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsTag>;

export default meta;
type Story = StoryObj<typeof RdsTag>;


export const Default :Story={
    args:{
        tagType: TagType.Square,
        role:Role.Basic,
        colorVariant:ColorVariant.Primary,
        fillClose:false,
        tagArray:[ "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "dark",
        "light",]
    }
} satisfies Story;

Default.parameters = { controls: { include: ["tagType","role","colorVariant","fillClose","tagArray"] } };