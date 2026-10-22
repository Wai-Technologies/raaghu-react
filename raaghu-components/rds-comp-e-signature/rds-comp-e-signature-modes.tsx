import { useRef, useState, useCallback, type ChangeEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import clsx from 'clsx';
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
  disabledFooterMessage?: ReactNode;
  width?: number;
  /** Shows the required asterisks. Defaults to `true`. */
  required?: boolean;
  onSignatureChange?: (signature: string | File | null) => void;
}

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_FILE_MB = MAX_FILE_BYTES / (1024 * 1024);

export const RdsESignatureUpload = ({
  type,
  disabled,
  disabledFooterMessage,
  width,
  required = true,
  onSignatureChange,
}: RdsESignatureUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_BYTES) {
        setUploadError(`File too large. Max size is ${MAX_FILE_MB}MB`);
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

  const handleFileButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUploadMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsUploadHovered(true);
    }
  }, [disabled]);

  const handleUploadMouseLeave = useCallback(() => {
    if (!disabled) {
      setIsUploadHovered(false);
    }
  }, [disabled]);

  return (
    <Box className="rds-e-signature__upload-container" style={{ maxWidth: width ? `${width}px` : '100%' }}>
      <Typography variant="h6" className="rds-e-signature__title">
        {type === 'initials' ? 'Upload Initial' : 'Upload Signature'}
        {required && <span className="rds-e-signature__required">*</span>}
      </Typography>
      <Box
        className={clsx("rds-e-signature__upload-panel", !disabled && isUploadHovered && "rds-e-signature__upload-panel--hover", uploadError && "rds-e-signature__upload-panel--error")}
        onMouseEnter={handleUploadMouseEnter}
        onMouseLeave={handleUploadMouseLeave}
      >
        <Box className="rds-e-signature__upload-standard">
          <Typography className="rds-e-signature__upload-label">
            Title {required && <span className="rds-e-signature__required">*</span>}
          </Typography>
          <Box className={clsx("rds-e-signature__file-row", selectedFile && "rds-e-signature__file-row--has-file")}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="rds-e-signature__file-input"
              disabled={disabled}
              aria-label={type === 'initials' ? 'Upload initial file' : 'Upload signature file'}
            />
            <button
              className="rds-e-signature__file-button"
              onClick={handleFileButtonClick}
              disabled={disabled}
              type="button"
            >
              Choose File
            </button>
            <span className={clsx("rds-e-signature__file-text", !selectedFile && "rds-e-signature__file-text--placeholder")}>
              {selectedFile ? selectedFile.name : 'No File Chosen'}
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
            <Typography className="rds-e-signature__file-limit">Maximum {MAX_FILE_MB}MB</Typography>
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
  /** Shows the required asterisk. Defaults to `true`. */
  required?: boolean;
  onSignatureChange?: (signature: string | File | null) => void;
  /** Called when "Create your own signature" is activated. Without it the text is not interactive. */
  onCreateCustom?: () => void;
}

export const RdsESignatureChoose = ({
  type,
  disabled,
  predefinedSignatures,
  required = true,
  onSignatureChange,
  onCreateCustom,
}: RdsESignatureChooseProps) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const multipleChooseError = selectedStyles.length > 1;

  const handleStyleSelect = useCallback((styleId: string) => {
    const next = selectedStyles.includes(styleId)
      ? selectedStyles.filter(id => id !== styleId)
      : [...selectedStyles, styleId];
    setSelectedStyles(next);
    if (next.length === 1) {
      const signature = predefinedSignatures.find(sig => sig.id === next[0]);
      if (signature) {
        onSignatureChange?.(type === 'fullname' ? signature.fullName : signature.initials);
      }
    } else {
      onSignatureChange?.(null);
    }
  }, [onSignatureChange, predefinedSignatures, selectedStyles, type]);

  const handleCreateCustomKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCreateCustom?.();
    }
  };

  return (
    <Box className="rds-e-signature__choose-container">
      <Typography variant="h6" className="rds-e-signature__title">
        Choose Signature
        {required && <span className="rds-e-signature__required">*</span>}
      </Typography>
      <Box className={clsx("rds-e-signature__choose-panel", multipleChooseError && "rds-e-signature__choose-panel--error")}>
        <Box className="rds-e-signature__mini-grid">
          {predefinedSignatures.map(sig => (
            <Box key={sig.id} className="rds-e-signature__mini-group">
              <span className="rds-e-signature__mini-label">{sig.name}</span>
              <button
                type="button"
                className={clsx("rds-e-signature__mini-card", selectedStyles.includes(sig.id) && "rds-e-signature__mini-card--selected")}
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
          <Typography
            className="rds-e-signature__create-link"
            {...(onCreateCustom && {
              onClick: onCreateCustom,
              onKeyDown: handleCreateCustomKeyDown,
              role: 'button',
              tabIndex: 0,
            })}
          >
            ⊕ Create your own signature
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const RdsESignatureModes = {
  RdsESignatureUpload,
  RdsESignatureChoose,
};

export default RdsESignatureModes;

RdsESignatureUpload.displayName = 'RdsESignatureUpload';
RdsESignatureChoose.displayName = 'RdsESignatureChoose';
