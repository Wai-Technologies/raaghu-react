
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDeveloperMode from './rds-comp-developer-mode';


const meta: Meta = { 
  title: "Components/Developer Mode",
    component: RdsCompDeveloperMode,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDeveloperMode>;

export default meta;
type Story = StoryObj<typeof RdsCompDeveloperMode>;

export const Default: Story = {
    args: {
      grantType
         : [
            {
               option: 'Authorization Code',
               value: 'authorization-code'
            },
            {
               option: 'Hybrid',
               value: 'hybrid'
            },
            {
               option: 'Implicit',
               value: 'implicit'
            },
            {
               option: 'Password',
               value: 'password'
            }
         ],
    }
} satisfies Story;
