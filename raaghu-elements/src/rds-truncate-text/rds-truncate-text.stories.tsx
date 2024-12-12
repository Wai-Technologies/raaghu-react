import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TruncatedText, { RdsTruncateTextProps } from './rds-truncate-text';

const meta: Meta = {
  title: 'Elements/Truncated Text',
  component: TruncatedText,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The content of the text that will be truncated or displayed fully based on the component state.',
    },
    maxLength: {
      control: 'number',
      description: 'The maximum number of characters to display before truncating the text.',
    },
    state: {
      options: ['default', 'hover'],
      control: { type: 'radio' },
      description: 'Choose between "default" (full text) or "hover" (truncated text with hover to expand).',
    },
  },
} satisfies Meta<RdsTruncateTextProps>;

export default meta;
type Story = StoryObj<typeof TruncatedText>;

export const Default: Story = {
  args: {
    text: 'This is a sample text.',
    maxLength: 16,
    state: 'hover',  // The state can be 'default' or 'hover'
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['text', 'maxLength', 'state'] },
};