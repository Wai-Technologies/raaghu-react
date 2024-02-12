import type { Meta, StoryObj } from '@storybook/react';
import RdsCompNewClaimType from "./rds-comp-new-claim-type";

const meta: Meta = { 
    title: "Components/New Claim Type",
    component: RdsCompNewClaimType,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompNewClaimType>;

export default meta;
type Story = StoryObj<typeof RdsCompNewClaimType>;

export const Default: Story = {
    args: {
        name: "",
        regex: "",
        value: "",
        regexDesc: "",
        desc: "",
        onSubmit: { undefined },
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