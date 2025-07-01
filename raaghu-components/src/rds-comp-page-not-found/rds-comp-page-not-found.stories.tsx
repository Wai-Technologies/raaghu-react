
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPageNotFound from "./rds-comp-page-not-found";


const meta: Meta = {
  title: "Components/Page Not Found",
  component: RdsCompPageNotFound,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Page Not Found** component is a customizable UI element designed to display a user-friendly message when a requested page cannot be found within your application. It provides a structured interface to inform users about the error and can include options for navigation back to the homepage or other relevant sections. This component is ideal for handling 404 errors or similar scenarios, ensuring a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPageNotFound>;

export default meta;
type Story = StoryObj<typeof RdsCompPageNotFound>;

export const Standard: Story = {
  args: {

  }
} satisfies Story;




