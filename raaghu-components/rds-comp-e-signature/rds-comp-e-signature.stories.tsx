import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect} from 'storybook/test';
import RdsCompESignature from './rds-comp-e-signature';

const meta: Meta<typeof RdsCompESignature> = {
  title: 'Components/E-Signature',
  component: RdsCompESignature,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive e-signature component supporting draw, upload, and choose signature modes with various states and customization options.',
      },
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['draw', 'upload', 'choose'],
      description: 'The signature input mode',
      table: {
        defaultValue: { summary: 'draw' },
      },
    },
    type: {
      control: 'select',
      options: ['fullname', 'initials'],
      description: 'Type of signature to display in choose mode',
      table: {
        defaultValue: { summary: 'fullname' },
      },
    },
    colourSwatch: {
      control: 'boolean',
      description: 'Show color palette for drawing',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interaction',
      table: { defaultValue: { summary: 'false' } },
    },
    disabledMessage: {
      control: 'text',
      description: 'Message shown while disabled',
  table: { defaultValue: { summary: 'Draw option is currently disabled.\\nClear uploaded signature to enable drawing.' } },
    },
    title: {
      control: 'text',
      description: 'Title for the component',
      table: { defaultValue: { summary: 'Draw Signature' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Draw: Story = {
  args: {
    mode: 'draw',
    type: 'fullname',
    colourSwatch: true,
    title: 'Draw Signature',
  },
  play: async ({ canvasElement }) => {
    const c = canvasElement.querySelector('canvas');
    expect(c).toBeTruthy();
  },
};

export const Upload: Story = {
  args: {
    mode: 'upload',
    type: 'fullname',
    colourSwatch: true,
    title: 'Upload Signature',
  },
};

export const Choose: Story = {
  args: {
    mode: 'choose',
    type: 'fullname',
    colourSwatch: true,
    title: 'Choose Signature',
  },
};

export const Default: Story = { ...Draw };

