
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPollsOption from './rds-comp-polls-option';


const meta: Meta = { 
  title: "Components/Polls-Option",
    component: RdsCompPollsOption,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Polls Option** component is a customizable UI element designed to create and manage poll options within your application. It provides a structured interface for adding, editing, and displaying poll options, making it ideal for surveys, feedback forms, voting systems, or any application requiring interactive polling functionality. Fully customizable, the Polls Option component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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




