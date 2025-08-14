import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompESignature from './rds-comp-e-signature';

const meta: Meta<typeof RdsCompESignature> = {
  title: 'Components/E-Signature',
  component: RdsCompESignature,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive e-signature component supporting draw, upload, and choose signature modes with various states and customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['draw', 'upload', 'choose'],
      description: 'The signature input mode',
      table: {
        defaultValue: { summary: 'draw' },
      },
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description: 'The visual state of the component',
      table: {
        defaultValue: { summary: 'default' },
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
    errorText: {
      control: 'text',
      description: 'Error message text',
      table: {
        defaultValue: { summary: 'Signature not clear. Please draw again.' },
      },
    },
    disableText: {
      control: 'text',
      description: 'Disable message text',
      table: {
        defaultValue: { summary: 'Another method already selected' },
      },
    },
    disableMessage: {
      control: 'boolean',
      description: 'Show disable message',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    errorMessage: {
      control: 'boolean',
      description: 'Show error message',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Draw Mode - Error State
export const DrawError: Story = {
  args: {
    mode: 'draw',
    state: 'error',
    type: 'fullname',
    colourSwatch: true,
    errorText: 'Signature not clear. Please draw again.',
    errorMessage: true,
    title: 'Draw Signature',
  },
  parameters: {
    docs: {
      description: {
        story: 'Draw signature mode showing error state with error message.',
      },
    },
  },
};

// Upload Mode - Default State
export const UploadDefault: Story = {
  args: {
    mode: 'upload',
    state: 'default',
    type: 'fullname',
    colourSwatch: true,
    errorText: 'Signature not clear. Please draw again.',
    disableText: 'Another method already selected',
    disableMessage: true,
    errorMessage: true,
    title: 'Upload Signature',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload signature mode with file input for uploading signature images.',
      },
    },
  },
};

// Choose Mode - Default State
export const ChooseDefault: Story = {
  args: {
    mode: 'choose',
    state: 'default',
    type: 'fullname',
    colourSwatch: true,
    errorText: 'Signature not clear. Please draw again.',
    disableText: 'Another method already selected',
    disableMessage: true,
    errorMessage: true,
    title: 'Choose Signature',
  },
  parameters: {
    docs: {
      description: {
        story: 'Choose signature mode with predefined signature styles.',
      },
    },
  },
};

// Interactive Playground
// export const Playground: Story = {
//   args: {
//     mode: 'draw',
//     state: 'default',
//     type: 'fullname',
//     colourSwatch: true,
//     errorText: 'Signature not clear. Please draw again.',
//     disableText: 'Another method already selected',
//     disableMessage: true,
//     errorMessage: true,
//     title: 'E-Signature Component',
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Interactive playground to test all component features and states.',
//       },
//     },
//   },
// };
