import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEditionNewBasic from "./rds-comp-edition-new-basic";


const meta: Meta = {
    title: "Components/Edition New Basic",
    component: RdsCompEditionNewBasic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditionNewBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompEditionNewBasic>;

export const Default: Story = {
    args: {
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




