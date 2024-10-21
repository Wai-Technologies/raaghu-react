import type { Meta, StoryObj } from "@storybook/react";
import RdsCompClaimType from "./rds-comp-claim-type";

const meta: Meta = { 
    title: "Components/Claim Type",
    component: RdsCompClaimType,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompClaimType>;

export default meta;
type Story = StoryObj<typeof RdsCompClaimType>;

export const Default: Story = {
    args: {
       
        valueType: [
            {
                option: "One",
                value: "one"
            },
            {
                option: "two",
                value: "two"
            },
            {
                option: "three",
                value: "three"
            },
            {
                option: "four",
                value: "four"
            }
    
        ]
    }
} satisfies Story;