import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAccount1 from './rds-comp-account1';



const meta: Meta = { 
    title: "Components/Account1",
    component: RdsCompAccount1,
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
} satisfies Meta<typeof RdsCompAccount1>;

export default meta;
type Story = StoryObj<typeof RdsCompAccount1>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




