import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPollsQuestion from './rds-comp-polls-question';


const meta: Meta = { 
    title: "components/Polls-Question",
    component: RdsCompPollsQuestion,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Polls Question** component is a customizable UI element designed to create and manage poll questions within your application. It supports features such as defining a list of options through the `widgetList` array, allowing users to select or interact with poll questions. This component is ideal for surveys, feedback forms, voting systems, or any application requiring dynamic and interactive polling functionality. Fully customizable, the Polls Question component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPollsQuestion>;

export default meta;
type Story = StoryObj<typeof RdsCompPollsQuestion>;

export const Default: Story = {
    args: {
      name: 'default', 
  widgetList: [
    {
      option: "One",
      value: "one"
    },
    {
      option: "two",
      value: "two"
    },
    {
      option: "three",
      value: "three"
    },
    {
      option: "four",
      value: "four"
    }
  ]
    }
} satisfies Story;
Default.parameters = { controls: { include: [] } };




