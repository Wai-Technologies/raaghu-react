import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEdition from "./rds-comp-edition";


const meta: Meta = {
    title: "Components/Edition",
    component: RdsCompEdition,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Edition** component is a versatile and customizable UI element designed to display and manage subscription plans or editions within your application. It supports two display types: `basic` and `advanced`. The `basic` display type allows you to showcase edition details such as `EditionName`, `EditionTitle`, `Price`, `Plan`, and a list of `features`. The `advanced` display type supports a `planList` array to define multiple plans with properties like `isFree`, `value`, `option`, and `isSelected`. This component is ideal for subscription management systems, pricing pages, or any interface requiring structured and interactive edition or plan selection. Fully customizable, the Edition component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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