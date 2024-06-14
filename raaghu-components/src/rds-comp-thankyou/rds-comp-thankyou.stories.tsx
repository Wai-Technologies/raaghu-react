import type { Meta, StoryObj } from '@storybook/react';
import RdsCompThankYou from "./rds-comp-thankyou";

const meta: Meta = { 
    title: "Components/Thank You",
    component: RdsCompThankYou,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompThankYou>;

export default meta;
type Story = StoryObj<typeof RdsCompThankYou>;

export const Default: Story = {
    args: {
    }
} satisfies Story;
