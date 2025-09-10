import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTypography from './rds-typography';

const meta: Meta<typeof RdsTypography> = {
  title: 'Elements/Typography',
  component: RdsTypography,
  parameters: {
    layout: 'padded',
     controls: {
      include: ['text', 'variant', 'color', 'align', 'gutterBottom', 'noWrap'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content to display',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'Add margin bottom',
    },
    noWrap: {
      control: 'boolean',
      description: 'Prevent text wrapping',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    text: 'Heading 1',
    variant: 'h1',
  },
};

export const Heading2: Story = {
  args: {
    text: 'Heading 2',
    variant: 'h2',
  },
};

export const Heading3: Story = {
  args: {
    text: 'Heading 3',
    variant: 'h3',
  },
};

export const Subtitle1: Story = {
  args: {
    text: 'Subtitle 1',
    variant: 'subtitle1',
  },
};

export const Subtitle2: Story = {
  args: {
    text: 'Subtitle 2',
    variant: 'subtitle2',
  },
};

export const Body1: Story = {
  args: {
    text: 'Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    variant: 'body1',
  },
};

export const Body2: Story = {
  args: {
    text: 'Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    variant: 'body2',
  },
};

export const Caption: Story = {
  args: {
    text: 'Caption text',
    variant: 'caption',
  },
};

export const Button: Story = {
  args: {
    text: 'Button text',
    variant: 'button',
  },
};

export const Overline: Story = {
  args: {
    text: 'Overline text',
    variant: 'overline',
  },
};

export const PrimaryColor: Story = {
  args: {
    text: 'Primary color text',
    color: 'primary',
    variant: 'h4',
  },
};

export const SecondaryColor: Story = {
  args: {
    text: 'Secondary color text',
    color: 'secondary',
    variant: 'h4',
  },
};

export const CenterAligned: Story = {
  args: {
    text: 'Center aligned text',
    align: 'center',
    variant: 'h5',
  },
};

export const NoWrap: Story = {
  args: {
    text: 'This is a very long text that should not wrap to the next line when noWrap is enabled',
    noWrap: true,
    variant: 'body1',
  },
};
