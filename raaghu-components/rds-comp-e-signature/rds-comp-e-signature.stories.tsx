import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsCompESignature from './rds-comp-e-signature';

const meta: Meta<typeof RdsCompESignature> = {
  title: 'Components/E-Signature',
  component: RdsCompESignature,
  parameters: {
    status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: [
        'mode',
        'onSignatureChange',
        'defaultPenColor',
        'options',
        'width',
        'height',
        'penColor',
        'title',
        'slotProps',
      ],
    },
    docs: {
      description: {
        component:
          'A comprehensive e-signature component supporting draw, upload, and choose signature modes with various states and customization options.',
      },
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { control: 'text', description: 'CSS class applied to the signature component root.' },
    sx: { control: 'object', description: 'MUI system styles applied to the signature component root.' },
    ref: { control: false, description: 'React ref to the signature component root; assign it in code.' },
    type: {
      control: 'select',
      options: ['fullname', 'initials'],
      description: 'Type of signature to display',
      table: {
        defaultValue: { summary: 'fullname' },
      },
    },
    showColorPicker: {
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Draw: Story = {
  args: {
    mode: 'draw',
    type: 'fullname',
    showColorPicker: true,
  },
  parameters: {
    controls: { include: ['type', 'showColorPicker', 'disabled', 'className', 'sx', 'ref'] },
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
  },
  parameters: {
    controls: { include: ['type', 'disabled', 'className', 'sx', 'ref'] },
  },
};

export const Choose: Story = {
  args: {
    mode: 'choose',
    type: 'fullname',
  },
  parameters: {
    controls: { include: ['type', 'disabled', 'className', 'sx', 'ref'] },
  },
};
