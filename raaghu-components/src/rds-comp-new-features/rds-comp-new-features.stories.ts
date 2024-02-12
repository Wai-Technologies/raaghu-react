import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFeatures from './rds-comp-new-features';


const meta: Meta = { 
    title: "Components/Features New",
    component: RdsCompFeatures,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFeatures>;

export default meta;
type Story = StoryObj<typeof RdsCompFeatures>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




