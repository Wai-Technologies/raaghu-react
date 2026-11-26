import type { Meta, StoryObj } from '@storybook/react-vite';
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
    penColor: {
      control: 'color',
      description: 'Pen colour used for drawing',
    },
    title: {
      control: 'text',
      description: 'Title for the component',
      table: { defaultValue: { summary: 'Draw Signature' } },
    },
    width: {
      control: { type: 'number', min: 200, step: 10 },
      description: 'Width of the upload panel in px (upload mode)',
      table: { defaultValue: { summary: '695 (max width)' } },
    },
    height: {
      control: { type: 'number', min: 100, step: 10 },
      description: 'Minimum height of the upload panel in px (upload mode)',
    },
    disabledFooterMessage: {
      control: 'text',
      description: 'Footer message shown while disabled',
    },
    signatureData: { table: { disable: true } },
    predefinedSignatures: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DRAW_CONTROLS = ['mode', 'type', 'colourSwatch', 'penColor', 'disabled', 'disabledMessage', 'disabledFooterMessage', 'title'];
const UPLOAD_CONTROLS = ['mode', 'type', 'width', 'height', 'disabled', 'disabledFooterMessage', 'title'];
const CHOOSE_CONTROLS = ['mode', 'type', 'disabled', 'title'];

export const Default: Story = {
  args: {
    mode: 'draw',
    type: 'fullname',
    colourSwatch: true,
    title: 'Draw Signature',
  },
  parameters: { controls: { include: DRAW_CONTROLS } },
};

export const Draw: Story = {
  args: {
    mode: 'draw',
    type: 'fullname',
    colourSwatch: true,
    title: 'Draw Signature',
  },
  parameters: { controls: { include: DRAW_CONTROLS } },
};

export const Upload: Story = {
  args: {
    mode: 'upload',
    type: 'fullname',
    title: 'Upload Signature',
  },
  parameters: { controls: { include: UPLOAD_CONTROLS } },
};

export const Choose: Story = {
  args: {
    mode: 'choose',
    type: 'fullname',
    title: 'Choose Signature',
  },
  parameters: { controls: { include: CHOOSE_CONTROLS } },
};
