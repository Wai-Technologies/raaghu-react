import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEdition from "./rds-comp-edition";


const meta: Meta = {
    title: "Components/Edition",
    component: RdsCompEdition,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompEdition>;

export default meta;
type Story = StoryObj<typeof RdsCompEdition>;

export const Default: Story = {
    args: {
        displayType: "basic",
        EditionItems: {
            EditionName: "Corporate",
            EditionTitle: "Strong Application for large team",
            Price: "45",
            Plan: "Per month",
        },
        features: [
            "Maximum User Count",
            "Test Check feature",
            "Test check feature count 2",
        ],
    }
} satisfies Story;

export const Advanced: Story = {
    args: {
        displayType: "advanced",
        planListLabel : "Plan",
        planList: [    
            {
                "isFree": true,
                "value": "standard",
                "option": "Standard",
                "isSelected": false
            },
            {
                "isFree": false,
                "value": "advanced",
                "option": "Advanced",
                "isSelected": false
            }
        ],
    }
} satisfies Story;