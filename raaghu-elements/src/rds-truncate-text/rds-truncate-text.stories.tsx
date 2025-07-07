import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import TruncatedText, { RdsTruncateTextProps, TruncateTextState } from './rds-truncate-text';

const meta: Meta = {
  title: 'Elements/Truncated Text',
  component: TruncatedText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
  component: `The **Truncated Text** component displays a shortened version of long strings, helping maintain visual clarity and prevent overflow in layouts. It supports two interaction **states**—\`Default\` (shows full text) and \`Hover\` (truncates the text with an ellipsis, revealing the full content on hover). Developers can define a \`maxLength\` prop to control how many characters are visible before truncation occurs. This component is ideal for use in tables, cards, or any interface where space is limited but full content accessibility is required. It enhances usability and ensures content is displayed elegantly while respecting layout constraints.`
}
,
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
} satisfies Meta<RdsTruncateTextProps>;

export default meta;
type Story = StoryObj<typeof TruncatedText>;

export const Standard: Story = {
  args: {
    state: TruncateTextState.Hover,
    text: 'This is a sample text.',
    maxLength: 16,
  },
} satisfies Story;

// export const WithHover: Story = {
//   args: {
//     state: TruncateTextState.Hover,
//     text: 'This is a sample text that will be truncated.',
//     maxLength: 16,
//   },
// } satisfies Story;

// export const WithoutTruncation: Story = {
//   args: {
//     state: TruncateTextState.Default,
//     text: 'This text will be shown in full.',
//     maxLength: 16,
//   },
// } satisfies Story;

Standard.parameters = {
  controls: { include: ['state', 'text', 'maxLength'] },
};