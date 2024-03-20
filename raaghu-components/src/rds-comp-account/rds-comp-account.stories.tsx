import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAccount from './rds-comp-account';



const meta: Meta = { 
    title: "Components/Account",
    component: RdsCompAccount,
    decorators: [
        (Story) => (
          <div>
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
          </div>
        ),
      ],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAccount>;

export default meta;
type Story = StoryObj<typeof RdsCompAccount>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




