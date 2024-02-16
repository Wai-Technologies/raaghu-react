import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserBasics from "./rds-comp-user-basics";


const meta: Meta = { 
    title: "Components/User Basics",
    component: RdsCompUserBasics,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserBasics>;

export default meta;
type Story = StoryObj<typeof RdsCompUserBasics>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




