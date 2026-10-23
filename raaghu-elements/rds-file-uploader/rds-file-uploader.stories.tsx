import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import RdsFileUploader, { FileWithProgress } from './rds-file-uploader';
import { RenderFileUploader } from './rds-file-uploader-render';

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3.81H13M4.46 3.76V3.3C4.46 2.69 4.73 2.1 5.21 1.67C5.69 1.24 6.34 1 7.01 1C7.69 1 8.34 1.24 8.82 1.67C9.3 2.1 9.57 2.69 9.57 3.3V3.76M5.51 5.57V10.62M8.52 5.57V10.62M2.53 3.81H11.5V12.08C11.5 12.2 11.48 12.32 11.43 12.43C11.38 12.54 11.3 12.64 11.21 12.73C11.12 12.81 11.01 12.88 10.89 12.93C10.77 12.97 10.63 13 10.5 13H3.53C3.26 13 3.01 12.9 2.82 12.73C2.63 12.55 2.53 12.32 2.53 12.08V3.81H2.53Z" stroke="#BD0D1D" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const meta: Meta<typeof RdsFileUploader> = {
  title: 'Elements/File Uploader',
  component: RdsFileUploader,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: [
        'label',
        'mode',
        'variant',
        'accept',
        'multiple',
        'disabled',
        'selected',
        'dragAndDrop',
        'maxFiles',
        'maxSize',
        'showPreview',
        'showTitle',
        'showHint',
        'required',
        'helperText',
        'className',
        'sx',
        'ref',
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(480px, 100%)' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class applied to the uploader root.',
      table: { category: 'Root props' },
    },
    sx: {
      control: 'object',
      description: 'MUI system styles applied to the uploader root.',
      table: { category: 'Root props' },
    },
    ref: {
      control: false,
      description: 'React ref to the uploader root. Assign in code; refs cannot be set through Controls.',
      table: { category: 'Root props' },
    },
    label: {
      control: 'text',
      description: 'Label text for the uploader',
      defaultValue: 'File Upload',
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
      description: 'Applies the selected appearance to the uploader',
    },
    showPreview: {
      control: 'boolean',
    },
    dragAndDrop: {
      control: 'boolean',
    },
    maxFiles: {
      control: 'number',
    },
    maxSize: {
      control: 'number',
    },
    showTitle: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    showHint: {
      control: 'boolean',
    },
    helperText: {
      control: 'text',
    },
    mode: {
      control: 'select',
      options: ['default', 'standard'],
    },
    variant: {
      control: 'select',
      options: [
        'Drop Area - Top Icon',
        'Drop Area - Side Icon',
        'Drop Area - With Upload Button'
      ]
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload your files',
    mode:'default',
    multiple: true,
    showTitle: true,
    required: true,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    accept: ".png,.jpg,.jpeg,.doc,.pdf,.ppt",
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    selected: false,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Upload your files')).toBeInTheDocument();
    await expect(canvasElement.querySelector('input[type="file"]')).toBeInTheDocument();
  },
};

export const SingleFile: Story = {
  args: {
    label: 'Upload a single file',
    mode:'default',
    showTitle: true,
    required: true,
    multiple: false,
    maxFiles: 1,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
};

export const ImagesOnly: Story = {
  args: {
    label: 'Upload images only',
    showTitle: true,
    mode:'default',
    required: true,
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
};

export const NoDragAndDrop: Story = {
  args: {
    label: 'No drag and drop',
    showTitle: true,
    mode:'default',
    required: true,
    dragAndDrop: false,
    multiple: true,
    showPreview: true,
    disabled: false,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
};

export const NoPreview: Story = {
  args: {
    label: 'No preview',
    mode:'default',
    showTitle: true,
    required: true,
    showPreview: false,
    multiple: true,
    dragAndDrop: true,
    disabled: false,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
};

export const DocumentsOnly: Story = {
  args: {
    label: 'Documents only',
    mode:'default',
    showTitle: true,
    required: true,
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
    maxFiles: 10,
    maxSize: 20 * 1024 * 1024,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled uploader',
    showTitle: true,
    mode:'default',
    required: true,
    disabled: true,
    multiple: true,
    showPreview: true,
    dragAndDrop: true,
    variant:'Drop Area - Top Icon',
    showHint: true,
    helperText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return RenderFileUploader(updatedArgs);
  },
};

export const SelectedFile: Story = {
  args: {
    label: 'Selected file',
    mode: 'default',
    multiple: false,
    showTitle: true,
    showPreview: true,
    dragAndDrop: true,
    variant: 'Drop Area - Top Icon',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    if (!input) throw new Error('File uploader input was not rendered');
    await userEvent.upload(input, new File(['Example file'], 'example.pdf', { type: 'application/pdf' }));
    await expect(await within(canvasElement).findByText('example.pdf')).toBeInTheDocument();
  },
};

export const WithValidation: Story = {
args: {
  label: 'With validation',
  showTitle: true,
  mode:'default',
  required: true,
  multiple: true,
  maxFiles: 3,
  maxSize: 1 * 1024 * 1024,
  showPreview: true,
  dragAndDrop: true,
  disabled: false,
  variant:'Drop Area - Top Icon',
  showHint: true,
  helperText: 'Maximum 5MB',
},
render: (args) => {
  const updatedArgs = {...args};
  if (args.mode === 'standard') {
    updatedArgs.children = <DeleteIcon />;
  }
  return RenderFileUploader(updatedArgs);
},
};

export const Interactive: Story = {
args: {
  label: 'Interactive uploader',
  showTitle: true,
  mode:'default',
  required: true,
  multiple: true,
  maxFiles: 5,
  accept: "image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  showPreview: true,
  dragAndDrop: true,
  disabled: false,
  variant:'Drop Area - Top Icon',
  showHint: true,
  helperText: 'Maximum 5MB',
},
render: (args) => {
  const updatedArgs = {...args};
  if (args.mode === 'standard') {
    updatedArgs.children = <DeleteIcon />;
  }
  return RenderFileUploader(updatedArgs);
},
};

export const Standard: Story = {
  args: {
    label: 'Standard uploader',
    showTitle: true,
    required: true,
    showHint: true,
    helperText: 'Maximum 5MB',
    mode: 'standard',
    maxFiles: 1,
    multiple: false,
    maxSize: 2 * 1024 * 1024,
    accept: '.pdf,.doc,.docx',
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
  },
  render: (args) => {
    const [files, setFiles] = React.useState<FileWithProgress[]>([
      {
        file: new File([''], 'example.pdf', { type: 'application/pdf' }),
        progress: 0,
      },
    ]);
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    
    return <RdsFileUploader {...updatedArgs} onChange={(_, nextFiles) => setFiles(nextFiles)} />;
  },
};
