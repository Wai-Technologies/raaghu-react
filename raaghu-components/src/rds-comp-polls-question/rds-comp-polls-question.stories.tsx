import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPollsQuestion from './rds-comp-polls-question';


const meta: Meta = { 
    title: "components/Polls-Question",
    component: RdsCompPollsQuestion,
    parameters: {
        layout: 'padded',
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




