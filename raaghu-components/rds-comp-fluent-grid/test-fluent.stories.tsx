import type { Meta, StoryObj } from '@storybook/react';
import TestFluent from './test-fluent';

const meta: Meta<typeof TestFluent> = {
  title: 'Test/FluentUI',
  component: TestFluent,
};

export default meta;
type Story = StoryObj<typeof TestFluent>;

export const Default: Story = {};
