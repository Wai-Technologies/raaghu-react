import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import RdsFileUploader, { FileWithProgress } from './rds-file-uploader';
import { renderFileUploader } from './RdsFileUploaderComponents';

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3.80979H13M4.46201 3.75519V3.2968C4.46201 2.68765 4.73087 2.10346 5.20946 1.67273C5.68806 1.242 6.33718 1 7.01401 1C7.69084 1 8.33995 1.242 8.81854 1.67273C9.29714 2.10346 9.566 2.68765 9.566 3.2968V3.75581M5.51067 5.572V10.624M8.51733 5.572V10.624M2.53067 3.814H11.498V12.0814C11.4997 12.2006 11.4752 12.3189 11.4261 12.4296C11.3769 12.5403 11.304 12.6411 11.2115 12.7264C11.119 12.8118 11.0087 12.8798 10.887 12.9268C10.7653 12.9737 10.6344 12.9986 10.502 13H3.53C3.26259 12.997 3.00746 12.8986 2.82069 12.7263C2.63392 12.554 2.5308 12.3221 2.53401 12.0814V3.814H2.53067Z" stroke="#BD0D1D" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const meta: Meta<typeof RdsFileUploader> = {
  title: 'Elements/File Uploader',
  component: RdsFileUploader,
  parameters: {
    layout: 'centered',
    controls: {
    exclude: ['onFilesChange', 'onUpload'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text for the uploader',
      defaultValue: 'File Upload',
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
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
    isMandatory: {
      control: 'boolean',
    },
    showHint: {
      control: 'boolean',
    },
    hintText: {
      control: 'text',
    },
    mode: {
      control: 'select',
      options: ['default', 'standard'],
    },
    state: {
      control: 'select',
      options: ['default', 'selected']
    },
    style: {
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
    title: 'Upload your files',
    mode:'default',
    multiple: true,
    showTitle: true,
    isMandatory: true,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    accept: ".png,.jpg,.jpeg,.doc,.pdf,.ppt",
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const SingleFile: Story = {
  args: {
    title: 'Upload a single file',
    mode:'default',
    showTitle: true,
    isMandatory: true,
    multiple: false,
    maxFiles: 1,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const ImagesOnly: Story = {
  args: {
    title: 'Upload images only',
    showTitle: true,
    mode:'default',
    isMandatory: true,
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const NoDragAndDrop: Story = {
  args: {
    title: 'No drag and drop',
    showTitle: true,
    mode:'default',
    isMandatory: true,
    dragAndDrop: false,
    multiple: true,
    showPreview: true,
    disabled: false,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const NoPreview: Story = {
  args: {
    title: 'No preview',
    mode:'default',
    showTitle: true,
    isMandatory: true,
    showPreview: false,
    multiple: true,
    dragAndDrop: true,
    disabled: false,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const DocumentsOnly: Story = {
  args: {
    title: 'Documents only',
    mode:'default',
    showTitle: true,
    isMandatory: true,
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
    maxFiles: 10,
    maxSize: 20 * 1024 * 1024,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled uploader',
    showTitle: true,
    mode:'default',
    isMandatory: true,
    disabled: true,
    multiple: true,
    showPreview: true,
    dragAndDrop: true,
    style:'Drop Area - Top Icon',
    showHint: true,
    hintText: 'Maximum 5MB',
  },
  render: (args) => {
    const updatedArgs = {...args};
    if (args.mode === 'standard') {
      updatedArgs.children = <DeleteIcon />;
    }
    return renderFileUploader(updatedArgs);
  },
};

export const WithValidation: Story = {
args: {
  title: 'With validation',
  showTitle: true,
  mode:'default',
  isMandatory: true,
  multiple: true,
  maxFiles: 3,
  maxSize: 1 * 1024 * 1024,
  showPreview: true,
  dragAndDrop: true,
  disabled: false,
  style:'Drop Area - Top Icon',
  showHint: true,
  hintText: 'Maximum 5MB',
},
render: (args) => {
  const updatedArgs = {...args};
  if (args.mode === 'standard') {
    updatedArgs.children = <DeleteIcon />;
  }
  return renderFileUploader(updatedArgs);
},
};

export const Interactive: Story = {
args: {
  title: 'Interactive uploader',
  showTitle: true,
  mode:'default',
  isMandatory: true,
  multiple: true,
  maxFiles: 5,
  accept: "image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  showPreview: true,
  dragAndDrop: true,
  disabled: false,
  style:'Drop Area - Top Icon',
  showHint: true,
  hintText: 'Maximum 5MB',
},
render: (args) => {
  const updatedArgs = {...args};
  if (args.mode === 'standard') {
    updatedArgs.children = <DeleteIcon />;
  }
  return renderFileUploader(updatedArgs);
},
};

export const Standard: Story = {
  args: {
    title: 'Standard uploader',
    showTitle: true,
    isMandatory: true,
    showHint: true,
    hintText: 'Maximum 5MB',
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
    
    return <RdsFileUploader {...updatedArgs} onFilesChange={setFiles} />;
  },
};


