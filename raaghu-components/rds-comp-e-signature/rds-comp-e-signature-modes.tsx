import React, { useRef, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

export interface PredefinedSignatureItem {
  id: string;
  name: string;
  style: string;
  fullName: string;
  initials: string;
}

export interface RdsESignatureUploadProps {
  type: 'fullname' | 'initials';
  disabled: boolean;
  disabledFooterMessage?: string;
  width?: number;
  onSignatureChange?: (signature: string | File | null) => void;
}

const MAX_FILE_BYTES = 5 * 1024 * 1024; 

export const RdsESignatureUpload: React.FC<RdsESignatureUploadProps> = ({
  type,
  disabled,
  disabledFooterMessage,
  width,
  onSignatureChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_BYTES) {
        setUploadError('File too large. Max size is 2MB'); 
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onSignatureChange?.(null);
        return;
      }
      setUploadError(null);
      setSelectedFile(file);
      onSignatureChange?.(file);
    }
  }, [onSignatureChange]);

  const handleClearFile = useCallback(() => {
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onSignatureChange?.(null);
  }, [onSignatureChange]);

  return (
    <Box className="rds-e-signature__upload-container" style={{ maxWidth: width ? `${width}px` : '100%' }}>
      <Typography variant="h6" className="rds-e-signature__title">
        {type === 'initials' ? 'Upload Initial' : 'Upload Signature'}
        <span className="rds-e-signature__required">*</span>
      </Typography>
      <Box
        className={`rds-e-signature__upload-panel ${!disabled && isUploadHovered ? 'rds-e-signature__upload-panel--hover' : ''} ${uploadError ? 'rds-e-signature__upload-panel--error' : ''}`}
        onMouseEnter={() => !disabled && setIsUploadHovered(true)}
        onMouseLeave={() => !disabled && setIsUploadHovered(false)}
      >
        <Box className="rds-e-signature__upload-standard">
          <Typography className="rds-e-signature__upload-label">
            Title <span className="rds-e-signature__required">*</span>
          </Typography>
          <Box className={`rds-e-signature__file-row ${selectedFile ? 'rds-e-signature__file-row--has-file' : ''}`}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="rds-e-signature__file-input"
              disabled={disabled}
            />
            <button
              className="rds-e-signature__file-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              type="button"
            >
              Choose File
            </button>
            <span className={`rds-e-signature__file-text ${!selectedFile ? 'rds-e-signature__file-text--placeholder' : ''}`}>
              {selectedFile ? selectedFile.name : 'No File Choosen'}
            </span>
            {selectedFile && (
              <button
                type="button"
                className="rds-e-signature__file-delete"
                onClick={handleClearFile}
                aria-label="Remove file"
                disabled={disabled}
              >
                <Delete fontSize="inherit" />
              </button>
            )}
          </Box>
          <Box className="rds-e-signature__file-hint-row">
            <Typography className="rds-e-signature__file-limit">Maximum 5MB</Typography>
          </Box>
        </Box>
      </Box>
      {uploadError && (
        <Box className="rds-e-signature__upload-error">
          <span className="rds-e-signature__error-icon" aria-hidden>!</span>
          <Typography className="rds-e-signature__error-text">{uploadError}</Typography>
        </Box>
      )}
      {disabled && disabledFooterMessage && (
        <Typography className="rds-e-signature__disabled-footer">{disabledFooterMessage}</Typography>
      )}
    </Box>
  );
};

export interface RdsESignatureChooseProps {
  type: 'fullname' | 'initials';
  disabled: boolean;
  predefinedSignatures: PredefinedSignatureItem[];
  onSignatureChange?: (signature: string | File | null) => void;
}

export const RdsESignatureChoose: React.FC<RdsESignatureChooseProps> = ({
  type,
  disabled,
  predefinedSignatures,
  onSignatureChange,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const multipleChooseError = selectedStyles.length > 1;

  const handleStyleSelect = useCallback((styleId: string) => {
    setSelectedStyles(prev => {
      let next: string[];
      if (prev.includes(styleId)) {
        next = prev.filter(id => id !== styleId);
      } else {
        next = [...prev, styleId];
      }
      if (next.length === 1) {
        const onlyId = next[0];
        const signature = predefinedSignatures.find(sig => sig.id === onlyId);
        if (signature) {
          onSignatureChange?.(type === 'fullname' ? signature.fullName : signature.initials);
        }
      } else if (next.length === 0) {
        onSignatureChange?.(null);
      } else {
        onSignatureChange?.(null);
      }
      return next;
    });
  }, [onSignatureChange, predefinedSignatures, type]);

  return (
    <Box className="rds-e-signature__choose-container">
      <Typography variant="h6" className="rds-e-signature__title">
        Choose Signature
        <span className="rds-e-signature__required">*</span>
      </Typography>
      <Box className={`rds-e-signature__choose-panel ${multipleChooseError ? 'rds-e-signature__choose-panel--error' : ''}`}>
        <Box className="rds-e-signature__mini-grid">
          {predefinedSignatures.map(sig => (
            <Box key={sig.id} className="rds-e-signature__mini-group">
              <span className="rds-e-signature__mini-label">{sig.name}</span>
              <button
                type="button"
                className={`rds-e-signature__mini-card ${selectedStyles.includes(sig.id) ? 'rds-e-signature__mini-card--selected' : ''}`}
                onClick={() => !disabled && handleStyleSelect(sig.id)}
                disabled={disabled}
                aria-pressed={selectedStyles.includes(sig.id)}
              >
                <span className="rds-e-signature__mini-full-wrapper">
                  <span className="rds-e-signature__mini-full">{sig.fullName}</span>
                </span>
                <span className="rds-e-signature__mini-initials-wrapper">
                  <span className="rds-e-signature__mini-initials">{sig.initials}</span>
                </span>
              </button>
            </Box>
          ))}
        </Box>
      </Box>
      {multipleChooseError && (
        <Typography className="rds-e-signature__choose-error" role="alert">
          <span className="rds-e-signature__error-icon" aria-hidden>!</span>
          Select only one signature style.
        </Typography>
      )}
      {!multipleChooseError && (
        <Box className="rds-e-signature__create-custom rds-e-signature__create-custom--outside">
          <Typography className="rds-e-signature__create-link">
            ⊕ Create your own signature
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default {
  RdsESignatureUpload,
  RdsESignatureChoose,
};

RdsESignatureUpload.displayName = 'RdsESignatureUpload';
RdsESignatureChoose.displayName = 'RdsESignatureChoose';
