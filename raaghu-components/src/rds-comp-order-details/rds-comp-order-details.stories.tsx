import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOrderDetails from "./rds-comp-order-details";


const meta: Meta = { 
  title: "Components/Order Details",
    component: RdsCompOrderDetails,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompOrderDetails>;

export default meta;
type Story = StoryObj<typeof RdsCompOrderDetails>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




