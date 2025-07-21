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
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    const handleUpload = async (uploadFiles: File[]) => {
      console.log('Uploading files:', uploadFiles);
      // Simulate upload delay
      return new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
    };

    return (
      <Box sx={{ width: 500 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          onUpload={handleUpload}
          multiple
        />
      </Box>
    );
  },
};

export const SingleFile: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    return (
      <Box sx={{ width: 400 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          multiple={false}
          maxFiles={1}
        />
      </Box>
    );
  },
};

export const ImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    const handleUpload = async (uploadFiles: File[]) => {
      console.log('Uploading images:', uploadFiles);
      await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
      <Box sx={{ width: 500 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          onUpload={handleUpload}
          accept="image/*"
          multiple
          maxFiles={3}
          maxSize={5 * 1024 * 1024} // 5MB
        />
      </Box>
    );
  },
};

export const NoDragAndDrop: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    return (
      <Box sx={{ width: 400 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          dragAndDrop={false}
          multiple
        />
      </Box>
    );
  },
};

export const NoPreview: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    return (
      <Box sx={{ width: 400 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          showPreview={false}
          multiple
        />
      </Box>
    );
  },
};

export const DocumentsOnly: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    const handleUpload = async (uploadFiles: File[]) => {
      console.log('Uploading documents:', uploadFiles);
      await new Promise(resolve => setTimeout(resolve, 3000));
    };

    return (
      <Box sx={{ width: 500 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          onUpload={handleUpload}
          accept=".pdf,.doc,.docx,.txt"
          multiple
          maxFiles={10}
          maxSize={20 * 1024 * 1024} // 20MB
        />
      </Box>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    return (
      <Box sx={{ width: 400 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          disabled
          multiple
        />
      </Box>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);

    const handleUpload = async (uploadFiles: File[]) => {
      console.log('Uploading files with validation:', uploadFiles);
      
      // Simulate some files failing
      for (let i = 0; i < uploadFiles.length; i++) {
        if (Math.random() > 0.7) {
          throw new Error(`Upload failed for ${uploadFiles[i].name}`);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
      <Box sx={{ width: 500 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          onUpload={handleUpload}
          multiple
          maxFiles={3}
          maxSize={1 * 1024 * 1024} // 1MB - very small to trigger size errors
        />
      </Box>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);
    const [uploadHistory, setUploadHistory] = useState<string[]>([]);

    const handleUpload = async (uploadFiles: File[]) => {
      const fileNames = uploadFiles.map(f => f.name);
      console.log('Uploading:', fileNames);
      
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadHistory(prev => [...prev, ...fileNames]);
      
      // Clear files after successful upload
      setTimeout(() => {
        setFiles([]);
      }, 500);
    };

    return (
      <Box sx={{ width: 600 }}>
        <RdsFileUploader
          onFilesChange={setFiles}
          onUpload={handleUpload}
          multiple
          maxFiles={5}
          accept="image/*,.pdf,.doc,.docx"
        />
        
        {uploadHistory.length > 0 && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Box sx={{ fontWeight: 'bold', mb: 1 }}>Upload History:</Box>
            {uploadHistory.map((fileName, index) => (
              <Box key={index} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                ✓ {fileName}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  },
};
