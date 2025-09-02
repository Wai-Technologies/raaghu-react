import { Meta, StoryObj } from '@storybook/react';
import RdsCompTruncatedText, { TruncateTextState } from './rds-comp-truncate-text';

const meta: Meta = {
  title: 'Components/Truncated Text',
  component: RdsCompTruncatedText,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          // Transform state enum
          code = code.replace(/state="([^"]+)"/g, 'state={TruncateTextState.$1}');
          code = code.replace(/state:\s*"([^"]+)"/g, 'state: TruncateTextState.$1');
          return code;
        }
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      options: Object.values(TruncateTextState),
      control: { type: 'select' },
      description: 'Choose between "default" (full text) or "hover" (truncated text with hover to expand).',
    },
    text: {
      control: 'text',
      description: 'The content of the text that will be truncated or displayed fully based on the component state.',
    },
    maxLength: {
      control: 'number',
      description: 'The maximum number of characters to display before truncating the text.',
    },
  },
} satisfies Meta<typeof RdsCompTruncatedText>;

export default meta;
type Story = StoryObj<typeof RdsCompTruncatedText>;

export const Default: Story = {
  args: {
    state: TruncateTextState.Hover,
    text: 'This is a sample text',
    maxLength: 16,
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['state', 'text', 'maxLength'] },
};