import { Meta, StoryObj } from '@storybook/react';
import RdsCompCodeSnippet from './rds-comp-code-snippet';

const meta: Meta<typeof RdsCompCodeSnippet> = {
  title: 'Components/Code Snippet',
  component: RdsCompCodeSnippet,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: { type: 'text' },
      description: 'The code content to display',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme variant',
    },
    type: {
      control: { type: 'select' },
      options: ['singleLine', 'multiLine'],
      description: 'Snippet type',
    },
    numberLine: {
      control: { type: 'boolean' },
      description: 'Whether to show line numbers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snippet Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML snippet.</p>
</body>
</html>`,
    language: true,
    theme: "light",
    type: "multiLine",
    numberLine: false,
  },
};
