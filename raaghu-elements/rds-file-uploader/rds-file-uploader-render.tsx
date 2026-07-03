import { lazy, Suspense, useState } from 'react';
import { type FileWithProgress, type RdsFileUploaderProps } from './rds-file-uploader-types';

const RdsFileUploader = lazy(() => import('./rds-file-uploader'));

export const RenderFileUploader = (args: RdsFileUploaderProps) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  return (
    <Suspense fallback={null}>
      <RdsFileUploader {...args} onFilesChange={setFiles} />
    </Suspense>
  );
};
