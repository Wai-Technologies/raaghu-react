import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCopyText from "./rds-comp-copy-text";

const meta: Meta = { 
  title: "Components/Copy Text",
  component: RdsCompCopyText,
  parameters: {
      layout: 'padded',
      docs: {
    description: {
        component: 
            'The **Copy Text** component is a simple and customizable UI element designed to allow users to copy text to their clipboard with ease. It provides a seamless way to display text and includes functionality for copying it with a single click. This component is ideal for use cases such as sharing links, copying codes, or any scenario where quick and efficient text copying is required. Fully customizable, the Copy Text component can be tailored to align with your design system and functional requirements, ensuring a smooth and user-friendly experience.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompCopyText>;

export default meta;
type Story = StoryObj<typeof RdsCompCopyText>;

export const Standard: Story = {
  args: {
  }
} satisfies Story;