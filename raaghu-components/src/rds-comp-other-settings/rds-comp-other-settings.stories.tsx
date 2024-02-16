
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOtherSettings from "./rds-comp-other-settings";


const meta: Meta = { 
  title: "Components/Other Settings",
    component: RdsCompOtherSettings,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompOtherSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompOtherSettings>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




