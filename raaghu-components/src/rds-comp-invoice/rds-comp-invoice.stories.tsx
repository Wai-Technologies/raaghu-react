import type { Meta, StoryObj } from '@storybook/react';
import RdsCompInvoice from './rds-comp-invoice';


const meta: Meta = { 
    title: "Components/Invoice",
    component: RdsCompInvoice,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompInvoice>;

export default meta;
type Story = StoryObj<typeof RdsCompInvoice>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
Default.parameters = { controls: { include: [] } };



