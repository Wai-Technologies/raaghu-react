import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Brush, Save, Delete, Undo } from '@mui/icons-material';
import './rds-comp-e-signature.scss';

export interface RdsCompESignatureProps {
  mode?: 'draw' | 'upload' | 'choose';
  type?: 'fullname' | 'initials';
  colourSwatch?: boolean;
  disabled?: boolean;               // NEW: simple disabled flag
  disabledMessage?: string;         // message displayed when disabled
  disabledFooterMessage?: string;   // secondary footer note when disabled
  onSignatureChange?: (signature: string | File | null) => void;
  onModeChange?: (mode: 'draw' | 'upload' | 'choose') => void;
  signatureData?: string | File | null; // external controlled value (future use)
  predefinedSignatures?: Array<{ id: string; name: string; style: string; fullName: string; initials: string; }>;
  width?: number;
  height?: number;
  penColor?: string;
  title?: string;
}

const RdsCompESignature: React.FC<RdsCompESignatureProps> = ({
  mode = 'draw',
  type = 'fullname',
  colourSwatch = true,
  disabled = false,
  disabledMessage = 'Draw option is currently disabled.\nClear uploaded signature to enable drawing.',
  disabledFooterMessage = 'Another method already selected',
  onSignatureChange,
  onModeChange,
  signatureData,
  predefinedSignatures = [
    { id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' },
    { id: '2', name: 'Style 2', style: 'print', fullName: 'John Doe', initials: 'J.D' },
    { id: '3', name: 'Style 3', style: 'script', fullName: 'John Doe', initials: 'J.D' },
    { id: '4', name: 'Style 4', style: 'bold', fullName: 'John Doe', initials: 'J.D' },
    { id: '5', name: 'Style 5', style: 'elegant', fullName: 'John Doe', initials: 'J.D' },
    { id: '6', name: 'Style 6', style: 'modern', fullName: 'John Doe', initials: 'J.D' },
  ],
  width = 695,
  height = 237,
  penColor = '#000000',
  title = 'Draw Signature',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(penColor);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Multiple selection support for choose mode
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const multipleChooseError = selectedStyles.length > 1; // show error when more than one selected
  const [isHovered, setIsHovered] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Track strokes for validation (array of point arrays)
  const strokesRef = useRef<{x:number;y:number;}[][]>([]);
  // Signature length validation: show error until it looks like at least 2 letters
  const [showLengthError, setShowLengthError] = useState(false);
  // Track if any drawing has occurred (controls placeholder visibility)
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = ['#000000', '#0066ff', '#ff0000'];

  // Ensure canvas matches display size & device pixel ratio for accurate coordinates
  useEffect(() => {
    if (!canvasRef.current || mode !== 'draw') return;
    const canvas = canvasRef.current;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      // Set actual pixel size accounting for DPR
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 2; // line width in CSS pixels
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [mode, selectedColor, type]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    setIsDrawing(true);
  if (!hasDrawn) setHasDrawn(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // account for DPR & CSS scaling
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x / scaleX, y / scaleY); // convert back to CSS pixel space after scaling ctx
      }
  // Start new stroke (store CSS pixel coordinates)
  strokesRef.current.push([{ x: x / scaleX, y: y / scaleY }]);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(x / scaleX, y / scaleY);
        ctx.stroke();
      }
  // Append to current stroke
  const currentStroke = strokesRef.current[strokesRef.current.length - 1];
  if (currentStroke) currentStroke.push({ x: x / scaleX, y: y / scaleY });
    }
  };


  const evaluateSignatureLength = () => {
    const strokes = strokesRef.current;
    const totalPoints = strokes.reduce((a,s)=>a+s.length,0);
    if (totalPoints === 0) { setShowLengthError(false); return; }
    // Compute bounding box
    let minX=Infinity,maxX=-Infinity; strokes.forEach(s=>s.forEach(p=>{ if(p.x<minX) minX=p.x; if(p.x>maxX) maxX=p.x; }));
    const boxW = maxX - minX;
  // Heuristic: assume one letter ~40px wide; require >=4 letters => width >= 160px and enough points
  const hasFourLetters = boxW >= 160 && totalPoints >= 40; // tuned for ~4 chars
  setShowLengthError(!hasFourLetters);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current && onSignatureChange) {
      const dataURL = canvasRef.current.toDataURL();
      onSignatureChange(dataURL);
    }
    // After finishing stroke, evaluate length
    evaluateSignatureLength();
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onSignatureChange?.(null);
      }
    }
    strokesRef.current = [];
    setHasDrawn(false);
  setShowLengthError(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
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
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onSignatureChange?.(null);
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyles(prev => {
      let next: string[];
      if (prev.includes(styleId)) {
        // toggle off
        next = prev.filter(id => id !== styleId);
      } else {
        // add
        next = [...prev, styleId];
      }
      // Emit last clicked signature (still single value contract) if resulting selection count == 1
      if (next.length === 1) {
        const onlyId = next[0];
        const signature = predefinedSignatures.find(sig => sig.id === onlyId);
        if (signature) {
          onSignatureChange?.(type === 'fullname' ? signature.fullName : signature.initials);
        }
      } else if (next.length === 0) {
        onSignatureChange?.(null);
      } else {
        // multiple selected: emit null to signal invalid selection state
        onSignatureChange?.(null);
      }
      return next;
    });
  };

  // Validation removed

  const handleSave = () => {
    // On save: clear input and hide error
  clearCanvas();
  setShowLengthError(false);
  };

  const getStateClassName = () => {
    let className = `rds-e-signature rds-e-signature--${mode} rds-e-signature--type-${type}`;
    if (disabled) className += ' rds-e-signature--disabled';
    if (isHovered && !disabled) className += ' rds-e-signature--hover';
  if (showLengthError && !disabled && mode==='draw') className += ' rds-e-signature--error';
    return className;
  };

  const renderDrawMode = () => (
    <Box className="rds-e-signature__draw-container">
      <Typography variant="h6" className="rds-e-signature__title">
        {title}
        <span className="rds-e-signature__required">*</span>
      </Typography>
      
      <Paper className="rds-e-signature__canvas-container" elevation={0}>
        {(disabled || !hasDrawn) && (
          <Box className="rds-e-signature__canvas-header" aria-hidden={hasDrawn && !disabled}>
            {disabled ? (
              <Typography className="rds-e-signature__disabled-text">
                {disabledMessage}
              </Typography>
            ) : (
              <Typography className="rds-e-signature__canvas-title">
                <Brush className="rds-e-signature__canvas-icon" />
                {type === 'initials' ? 'Draw Initial' : 'Draw Signature'}
              </Typography>
            )}
          </Box>
        )}
        <canvas
          ref={canvasRef}
          className="rds-e-signature__canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ width: '100%', height: '100%' }}
        />
        
        <Box className="rds-e-signature__controls">
          {colourSwatch && (
            <Box className="rds-e-signature__color-palette">
              {colors.map((color, index) => (
                <Box
                  key={color}
                  className={`rds-e-signature__color-button ${selectedColor === color ? 'rds-e-signature__color-button--selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && index === 0 && <span className="rds-e-signature__checkmark">✓</span>}
                </Box>
              ))}
            </Box>
          )}
          <Box className="rds-e-signature__actions">
            <IconButton className="rds-e-signature__action-button" onClick={clearCanvas} disabled={disabled} aria-label="undo">
              <Undo fontSize="small" />
            </IconButton>
    <IconButton className="rds-e-signature__action-button" disabled={disabled} aria-label="save" onClick={handleSave}>
              <Save fontSize="small" />
            </IconButton>
            <IconButton className="rds-e-signature__action-button rds-e-signature__action-button--delete" disabled={disabled} aria-label="delete">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      
    {showLengthError && (
        <Typography className="rds-e-signature__error" role="alert">
          <span className="rds-e-signature__error-icon" aria-hidden>!</span>
          Signature not clear. Please draw again.
        </Typography>
      )}
  {disabled && disabledFooterMessage && (
        <Typography className="rds-e-signature__disabled-footer">{disabledFooterMessage}</Typography>
      )}
    </Box>
  );

  const renderUploadMode = () => (
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

  const renderChooseMode = () => (
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

  return (
    <Box
      className={getStateClassName()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mode === 'draw' && renderDrawMode()}
      {mode === 'upload' && renderUploadMode()}
      {mode === 'choose' && renderChooseMode()}
      
    </Box>
  );
};

export default RdsCompESignature;
