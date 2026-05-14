import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RdsCompButtonGroup, { RdsCompButtonGroupProps, RdsCompButtonGroupOption } from './rds-comp-button-group';
import {
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const meta: Meta<typeof RdsCompButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: RdsCompButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The ButtonGroup component groups a series of buttons together on a single line. Supports both exclusive (single selection) and multiple selection modes with multiple size, variant, and color options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
      description: 'The variant to use',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component',
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the component',
    },
    exclusive: {
      control: 'boolean',
      description: 'If true, only one button can be selected at a time',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the button group',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the button group will fill the available width',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, all buttons will be disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompButtonGroup>;

// Basic options used across stories
const alignOptions: RdsCompButtonGroupOption[] = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const formatOptions: RdsCompButtonGroupOption[] = [
  { value: 'bold', label: 'Bold', icon: <FormatBoldIcon /> },
  { value: 'italic', label: 'Italic', icon: <FormatItalicIcon /> },
  { value: 'underline', label: 'Underline', icon: <FormatUnderlinedIcon /> },
];

const statusOptions: RdsCompButtonGroupOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved', icon: <CheckIcon /> },
  { value: 'rejected', label: 'Rejected', icon: <CloseIcon /> },
];

// ──────────────────────────────────────────────────────────────────────────────
// BASIC STORIES
// ──────────────────────────────────────────────────────────────────────────────

/**
 * ## Default ButtonGroup
 * The default button group with basic options and exclusive mode enabled.
 */
export const Default: Story = {
  args: {
    options: alignOptions,
    defaultValue: 'left',
    variant: 'outlined',
    size: 'medium',
    color: 'primary',
    exclusive: true,
  },
};
