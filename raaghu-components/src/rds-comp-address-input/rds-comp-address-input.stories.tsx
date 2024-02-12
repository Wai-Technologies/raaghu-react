import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAddressInput from './rds-comp-address-input';

const meta: Meta = { 
    title: "Components/AddressInput",
    component: RdsCompAddressInput,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAddressInput>;

export default meta;
type Story = StoryObj<typeof RdsCompAddressInput>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;