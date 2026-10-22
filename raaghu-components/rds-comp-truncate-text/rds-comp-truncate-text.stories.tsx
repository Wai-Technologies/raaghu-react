import { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsCompTruncatedText from './rds-comp-truncate-text';

const meta: Meta = {
  title: 'Components/Truncated Text',
  component: RdsCompTruncatedText,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the text that will be truncated or displayed fully based on the component state.',
    },
    maxLength: {
      control: 'number',
      description: 'The maximum number of characters to display before truncating the text.',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show the full text in a tooltip on hover or focus.',
    },
  },
} satisfies Meta<typeof RdsCompTruncatedText>;

export default meta;
type Story = StoryObj<typeof RdsCompTruncatedText>;

export const Default: Story = {
  args: {
    showTooltip: true,
    children: 'This is a sample text',
    maxLength: 16,
  },
  play: async ({ canvas }) => {
    const text = await canvas.findByText(/This is a sample/);
    await expect(text).toBeInTheDocument();
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['children', 'maxLength', 'showTooltip'] },
};
