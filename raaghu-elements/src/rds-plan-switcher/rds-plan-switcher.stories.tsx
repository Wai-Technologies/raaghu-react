import type { Meta, StoryObj } from '@storybook/react';
import RdsPlanSwitcher from "./rds-plan-switcher";


const meta: Meta = { 
    title: "Components/Plan Switcher",
    component: RdsPlanSwitcher,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    }, 
} satisfies Meta<typeof RdsPlanSwitcher>;

export default meta;
type Story = StoryObj<typeof RdsPlanSwitcher>;

export const Default: Story = {
    args: {
    }
} satisfies Story;