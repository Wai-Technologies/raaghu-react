
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPollsOption from './rds-comp-polls-option';


const meta: Meta = { 
  title: "Components/Polls-Option",
    component: RdsCompPollsOption,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPollsOption>;

export default meta;
type Story = StoryObj<typeof RdsCompPollsOption>;

export const Default: Story = {
    args: {
  
    }
} satisfies Story;




