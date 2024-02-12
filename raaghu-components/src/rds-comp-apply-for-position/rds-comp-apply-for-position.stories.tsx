import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplyForPosition from "./rds-comp-apply-for-position";


const meta: Meta = { 
    title: "Component/Apply For Position",
    component: RdsCompApplyForPosition,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplyForPosition>;

export default meta;
type Story = StoryObj<typeof RdsCompApplyForPosition>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;