import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPage from './rds-comp-page';


const meta: Meta = {
  title: "Components/Page",
  component: RdsCompPage,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Page** component is a foundational UI element designed to structure and display content within your application. It provides a flexible layout for organizing various elements, making it ideal for dashboards, content pages, or any interface requiring a consistent and customizable page structure. Fully customizable, the Page component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPage>;

export default meta;
type Story = StoryObj<typeof RdsCompPage>;

export const Default: Story = {
  args: {
    
  }
} satisfies Story;




