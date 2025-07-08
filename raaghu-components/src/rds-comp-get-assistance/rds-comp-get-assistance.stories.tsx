import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompGetAssistance from "./rds-comp-get-assistance";

const meta: Meta = { 
  title: "Components/Get Assistance",
  component: RdsCompGetAssistance,
  parameters: {
      layout: 'padded',
      docs: {
    description: {
        component: 
            'The **Get Assistance** component is a flexible UI element designed to help users access support or guidance within your application. It offers a structured and user-friendly interface, making it ideal for help centers, support pages, or any application requiring assistance features. Fully customizable, this component ensures consistency with your design system and enhances the user experience.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompGetAssistance>;

export default meta;
type Story = StoryObj<typeof RdsCompGetAssistance>;

export const Standard: Story = {
  args: {

  }
} satisfies Story;