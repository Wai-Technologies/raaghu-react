import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsFileUploader, { FileWithProgress } from './rds-file-uploader';

const meta: Meta<typeof RdsFileUploader> = {
  title: 'Elements/File Uploader',
  component: RdsFileUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    accept: ".png,.jpg,.jpeg,.doc,.pdf,.ppt",
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
  },
};

export const SingleFile: Story = {
  args: {
    multiple: false,
    maxFiles: 1,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
  },
};

export const ImagesOnly: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
  },
};

export const NoDragAndDrop: Story = {
  args: {
    dragAndDrop: false,
    multiple: true,
    showPreview: true,
    disabled: false,
  },
};

export const NoPreview: Story = {
  args: {
    showPreview: false,
    multiple: true,
    dragAndDrop: true,
    disabled: false,
  },
};

export const DocumentsOnly: Story = {
  args: {
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
    maxFiles: 10,
    maxSize: 20 * 1024 * 1024,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    multiple: true,
    showPreview: true,
    dragAndDrop: true,
  },
};

export const WithValidation: Story = {
args: {
  multiple: true,
  maxFiles: 3,
  maxSize: 1 * 1024 * 1024,
  showPreview: true,
  dragAndDrop: true,
  disabled: false,
},
// render: (args) => {
//   const [files, setFiles] = useState<FileWithProgress[]>([]);
//   const handleUpload = async (uploadFiles: File[]) => {
//     console.log('Uploading files with validation:', uploadFiles);
//     // Simulate some files failing
//     for (let i = 0; i < uploadFiles.length; i++) {
//       if (Math.random() > 0.7) {
//         throw new Error(`Upload failed for ${uploadFiles[i].name}`);
//       }
//     }
//     await new Promise(resolve => setTimeout(resolve, 2000));
//   };
//   return (
//     <Box sx={{ width: 500 }}>
//       <RdsFileUploader
//         {...args}
//         onFilesChange={setFiles}
//         onUpload={handleUpload}
//       />
//     </Box>
//   );
// },
};

export const Interactive: Story = {
args: {
  multiple: true,
  maxFiles: 5,
  accept: "image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  showPreview: true,
  dragAndDrop: true,
  disabled: false,
},
// render: (args) => {
//   const [files, setFiles] = useState<FileWithProgress[]>([]);
//   const [uploadHistory, setUploadHistory] = useState<string[]>([]);
//   const handleUpload = async (uploadFiles: File[]) => {
//     const fileNames = uploadFiles.map(f => f.name);
//     console.log('Uploading:', fileNames);
//     // Simulate upload
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setUploadHistory(prev => [...prev, ...fileNames]);
//     // Clear files after successful upload
//     setTimeout(() => {
//       setFiles([]);
//     }, 500);
//   };
//   return (
//     <Box sx={{ width: 600 }}>
//       <RdsFileUploader
//         {...args}
//         onFilesChange={setFiles}
//         onUpload={handleUpload}
//       />
//       {uploadHistory.length > 0 && (
//         <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
//           <Box sx={{ fontWeight: 'bold', mb: 1 }}>Upload History:</Box>
//           {uploadHistory.map((fileName, index) => (
//             <Box key={index} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
//               ✓ {fileName}
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// },



};

export const standard: Story = {
  args: {
    showTitle: true,
    isMandatory: true,
    showHint: true,
    hintText: 'Maximum 5MB',
    mode: 'standard',
    maxFiles: 1,
    multiple: false, // Only one file can be selected
    maxSize: 2 * 1024 * 1024,
    accept: '.pdf,.doc,.docx',
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
  },
  render: (args) => {
    // Show one file selected by default
    const [files, setFiles] = React.useState<FileWithProgress[]>([
      {
        file: new File([''], 'example.pdf', { type: 'application/pdf' }),
        progress: 0,
      },
    ]);
    return (
      <RdsFileUploader
        {...args}
        onFilesChange={setFiles}
        // Pass the default file to the component
        // If you want to show preview, ensure showPreview is true
      />
    );
  },
};


