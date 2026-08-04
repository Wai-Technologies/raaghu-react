import { useState } from 'react';
import { type FileWithProgress, type RdsFileUploaderProps } from './rds-file-uploader-types';
import RdsFileUploader from './rds-file-uploader';

export const RenderFileUploader = (args: RdsFileUploaderProps) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  return <RdsFileUploader {...args} onFilesChange={setFiles} />;
};
