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
    multiple: true,
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
};

export const SingleFile: Story = {
  args: {
    multiple: false,
    maxFiles: 1,
    showPreview: true,
    dragAndDrop: true,
    disabled: false,
     style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
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
     style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
  },
};

export const NoDragAndDrop: Story = {
  args: {
    dragAndDrop: false,
    multiple: true,
    showPreview: true,
    disabled: false,
     style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
  },
};

export const NoPreview: Story = {
  args: {
    showPreview: false,
    multiple: true,
    dragAndDrop: true,
    disabled: false,
     style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
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
     style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    multiple: true,
    showPreview: true,
    dragAndDrop: true,
     style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
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
   style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
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
   style:'Drop Area - Top Icon',
    showHint: true,
     hintText: 'Maximum 5MB',
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

export const Standard: Story = {
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
    children:(   <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3.80979H13M4.46201 3.75519V3.2968C4.46201 2.68765 4.73087 2.10346 5.20946 1.67273C5.68806 1.242 6.33718 1 7.01401 1C7.69084 1 8.33995 1.242 8.81854 1.67273C9.29714 2.10346 9.566 2.68765 9.566 3.2968V3.75581M5.51067 5.572V10.624M8.51733 5.572V10.624M2.53067 3.814H11.498V12.0814C11.4997 12.2006 11.4752 12.3189 11.4261 12.4296C11.3769 12.5403 11.304 12.6411 11.2115 12.7264C11.119 12.8118 11.0087 12.8798 10.887 12.9268C10.7653 12.9737 10.6344 12.9986 10.502 13H3.53C3.26259 12.997 3.00746 12.8986 2.82069 12.7263C2.63392 12.554 2.5308 12.3221 2.53401 12.0814V3.814H2.53067Z" stroke="#BD0D1D" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>),
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
     

        <RdsFileUploader {...args} onFilesChange={setFiles}>
          
   
    </RdsFileUploader>
    );
  },
};


