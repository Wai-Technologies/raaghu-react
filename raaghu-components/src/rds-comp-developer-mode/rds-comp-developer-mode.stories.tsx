
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDeveloperMode from './rds-comp-developer-mode';


const meta: Meta = { 
  title: "Components/Developer Mode",
    component: RdsCompDeveloperMode,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDeveloperMode>;

export default meta;
type Story = StoryObj<typeof RdsCompDeveloperMode>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
