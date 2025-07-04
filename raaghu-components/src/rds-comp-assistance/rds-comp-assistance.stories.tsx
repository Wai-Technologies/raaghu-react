import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAssistance from "./rds-comp-assistance";

const meta: Meta = { 
  title: "Components/Assistance",
  component: RdsCompAssistance,
  parameters: {
      layout: 'padded',
      docs: {
    description: {
        component: 
            'The **Assistance** component is a flexible and customizable UI element designed to provide users with helpful information, guidance, or support within your application. It supports features such as `assistanceData` to define the content and structure of the assistance provided, making it ideal for onboarding flows, help sections, or interactive tutorials. Fully customizable, the Assistance component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompAssistance>;

export default meta;
type Story = StoryObj<typeof RdsCompAssistance>;

export const Standard: Story = {
    args: {
      assistanceData: {
        
      }
  },
  // argTypes: {
  //   assistanceData: { table: { disable: true } }, // Hide 'children' from the controls
  // },
} satisfies Story;